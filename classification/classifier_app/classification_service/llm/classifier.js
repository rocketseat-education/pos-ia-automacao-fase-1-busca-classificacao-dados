import { prompt, outputConfig } from "./config.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import { type } from "os";
dotenv.config();

let genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


async function readImg(path){
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const imgBase64 = Buffer.from(arrayBuffer).toString("base64");
    
    return imgBase64;
}

function toInlineData(imgBase64){
    return {
        inlineData: {
            mimeType: "image/jpeg",
            data: imgBase64
        }
    }
}

async function geminiRequest(contents){
    const response = await genai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: contents,
        config: outputConfig
});

    return response;
}

export default async function llmClassifier(path){
    const imgBase64 = await readImg(path);
    const imgInlineData = toInlineData(imgBase64);
    const contents = [imgInlineData, {text: prompt}];
    const response = await geminiRequest(contents);

    return JSON.parse(response.text)[0]["category"];
}