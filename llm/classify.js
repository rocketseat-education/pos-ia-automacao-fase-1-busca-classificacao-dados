import fs from "fs";
import { createPartFromUri, createUserContent, GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import { type } from "os";
dotenv.config();

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const embeddings = JSON.parse(fs.readFileSync("../nearest_neighbors/embeddings.json"));

const testEmbeddings = embeddings.filter(e => e["split"] == "test").map(e => "../nearest_neighbors" + e["path"].slice(1));

const image = await genai.files.upload({
    file: testEmbeddings[50],
    config: { mimeType: "image/jpeg" }
});

const response = await genai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: createUserContent([
        createPartFromUri(image.uri, image.mimeType),
        `
        Identifique se a imagem contém gatos ou cachorros.
        Retorne uma das seguintes categorias de acordo com o conteúdo da imagem:
        'cat' caso a imagem contenha um ou mais gatos ou
        'dog' caso a imagem contenha um ou mais cachorros

        também retorne a cor do animal identificado.
        `
    ]),
    config: {
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
    }
});

console.log(response.text);