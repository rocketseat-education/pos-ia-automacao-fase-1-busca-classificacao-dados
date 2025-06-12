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
    let startIdx = 0;

    while(startIdx < ids.length) {
        let endIdx = startIdx + 500; // ajustar essa quantidade de acordo com o seu hardware, quanto maior o valor, maior o processamento necessário
        console.log(`Adding documents from ${startIdx} to ${endIdx}`)

        await collection.add({
            ids: ids.slice(startIdx, endIdx),
            documents: documents.slice(startIdx, endIdx),
            metadatas: metadatas.slice(startIdx, endIdx),
        });

        startIdx = endIdx;
    }

    console.log("Done!")
})

