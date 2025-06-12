import { ChromaClient } from "chromadb";

const chromaClient = new ChromaClient();
const collection = await chromaClient.getOrCreateCollection({ name: "test" });

await collection.add({
    ids: ["1", "2", "3"],
    documents: ["olá", "oi", "tudo bom"],
    metadatas: [{"title": "meu filme"}, {"nome": "arthur"}, {}]
});

