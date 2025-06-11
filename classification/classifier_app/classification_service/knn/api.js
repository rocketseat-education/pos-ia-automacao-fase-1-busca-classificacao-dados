import fs from "fs";
import knnClassifier from "./classifier.js";
import ImageEmbedder from "./embedder.js";

let knowledgeBase = null;

async function init(){
    const embeddings = JSON.parse(fs.readFileSync("./knn/embeddings.json"));
    knowledgeBase = embeddings.filter(e => e["split"] === "train");

    await ImageEmbedder.loadInstance();
}

async function classify(path, k){
   return knnClassifier(path, k, knowledgeBase);
}


export { classify, init };