import { ChromaClient } from "chromadb";

const chromaClient = new ChromaClient();
const collection = await chromaClient.getOrCreateCollection({ name: "movies" });

console.log(await collection.query({queryTexts: "A movie about animals"}));
