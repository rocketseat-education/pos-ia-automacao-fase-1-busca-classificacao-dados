import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';
import { type } from "os";
dotenv.config();

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const embeddings = JSON.parse(fs.readFileSync("../nearest_neighbors/embeddings.json"));

const testInstances = embeddings.filter(e => e["split"] == "test").map(e => {
    return {
        trueClass: e["class"],
        path:  "../nearest_neighbors" + e["path"].slice(1)
    }
});

function readImg(path){
    return fs.readFileSync(path, { encoding: "base64" });
}

function toInlineData(imgBase64){
    return {
        inlineData: {
            mimeType: "image/jpeg",
            data: imgBase64
        }
    }
}

const prompt = `
Identifique se a imagem contém gatos ou cachorros.
Retorne uma das seguintes categorias de acordo com o conteúdo da imagem:
'cat' caso a imagem contenha um ou mais gatos ou
'dog' caso a imagem contenha um ou mais cachorro
`

const outputConfig = {
        responseMimeType: "application/json",
        responseSchema: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    category: {
                        type: "string",
                        enum: ["dog", "cat"]
                    }
                }
            }
        }
    };

async function geminiRequest(contents){
    const response = await genai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: contents,
        config: outputConfig
});

    return response;
}

async function llmClassifier(path){
    const imgBase64 = readImg(path);
    const imgInlineData = toInlineData(imgBase64);
    const contents = [imgInlineData, {text: prompt}];
    const response = await geminiRequest(contents);

    return JSON.parse(response.text)[0]["category"];
}

function calculateAccuracy(results){
    let nCorrect = 0;

    for (let result of results){
        if(result["predictedClass"] == result["trueClass"]){
            nCorrect++;
        } 
    }

    return nCorrect / results.length;
}

const requests = testInstances.map(i => llmClassifier(i["path"]));

await Promise.all(requests);

console.log(requests);

for(let i=0; i<testInstances.length; i++){
    testInstances[i]["predictedClass"] = await requests[i];
}

console.log(calculateAccuracy(testInstances));