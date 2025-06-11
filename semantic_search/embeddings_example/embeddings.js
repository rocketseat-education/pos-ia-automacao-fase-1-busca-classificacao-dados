import { pipeline, cos_sim } from "@huggingface/transformers";
import { GoogleGenAI } from "@google/genai";

const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", { dtype: "q8" })
const imgEmbedder = await pipeline("image-feature-extraction", "Xenova/clip-vit-base-patch32", { dtype: "q8" })

async function embedText(text) {
  return embedder(text, { pooling: "mean", normalize: true }).then(t => t.tolist()[0]);
}

async function embedImg(img) {
  return imgEmbedder(img, { pooling: "cls", normalize: true }).then(t => t.tolist()[0]);
}


const genai = new GoogleGenAI({apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

async function embedWithGoogle(text) {
    return genai.models.embedContent({
    model: "models/text-embedding-004",
    contents: [text]
    }).then(r => r.embeddings[0].values)
}

console.log(cos_sim((await embedWithGoogle("olá, tudo bem?")), await embedWithGoogle("oi, meu nome é arthur")))
console.log(cos_sim((await embedWithGoogle("olá, tudo bem?")), await embedWithGoogle("eu gosto de pizza")))