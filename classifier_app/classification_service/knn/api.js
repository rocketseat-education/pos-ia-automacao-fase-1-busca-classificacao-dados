import fs from "fs";
import knnClassifier from "./classifier.js";

let knowledgeBase = null;

function init(){
    const embeddings = JSON.parse(fs.readFileSync("./knn/embeddings.json"));
    knowledgeBase = embeddings.filter(e => e["split"] === "train");
}

async function classify(path, k){
   return knnClassifier(path, k, knowledgeBase);
}


export { classify, init };