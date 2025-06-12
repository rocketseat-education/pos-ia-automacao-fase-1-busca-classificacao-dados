import { ChromaClient } from "chromadb";
import csv from "csv-parser";
import fs from "fs";

const chromaClient = new ChromaClient();
const collection = await chromaClient.getOrCreateCollection({ name: "movies" });

const ids = [];
const documents = [];
const metadatas = [];

fs.createReadStream("mpst_full_data.csv")
.pipe(csv())
.on('data', (row) => {
    const document = {"title": row["title"], "tags": row["tags"], "synopsis": row["plot_synopsis"]};

    ids.push(row["imdb_id"]);
    documents.push(JSON.stringify(document));
    metadatas.push(document);
})
.on('end', async () => {
    await collection.add({
    ids: ids,
    documents: documents,
    metadatas: metadatas,
    });
})

