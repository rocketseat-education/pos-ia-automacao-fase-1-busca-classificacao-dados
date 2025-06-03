import TSNE from "tsne-js";
import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";

let embeddings = JSON.parse(fs.readFileSync("../nearest_neighbors/embeddings.json"));

let tsneInput = [];

for (let embedding of embeddings){
    if(embedding["number"] >= 500 && embedding["number"] <= 1000){
        tsneInput.push(embedding);
    }
}

let model = new TSNE({
    dim: 2,
    perplexity: 30.0,
    earlyExaggeration: 4.0,
    learningRate: 100.0,
    nIter: 1000,
    metric: "euclidean"
});

model.init({
    data: tsneInput.map(i => i["embedding"]),
    type: "dense"
});

model.run();

let output = model.getOutput();
let csvOutput = [];

for (let i=0; i<tsneInput.length; i++){
    csvOutput.push({
        class: tsneInput[i]["class"],
        x: output[i][0],
        y: output[i][1]
    })
}

const csvWriter = createObjectCsvWriter({
    path: "tsne_output.csv",
    header: [
        {id: "class", title: "color"},
        {id: "x", title: "x"},
        {id: "y", title: "y"},
    ]
})

await csvWriter.writeRecords(csvOutput);