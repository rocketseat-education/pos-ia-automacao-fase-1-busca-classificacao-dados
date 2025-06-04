import { cos_sim } from "@huggingface/transformers";
import fs from "fs";

const embeddings = JSON.parse(fs.readFileSync("./embeddings.json"));

const trainEmbeddings = embeddings.filter(e => e["split"] === "train");
const testEmbeddings = embeddings.filter(e => e["split"] === "test");

function compare(testEmbedding){
     let distances = [];

    for(let trainEmbedding of trainEmbeddings){
        const distance = cos_sim(testEmbedding["embedding"], trainEmbedding["embedding"]);
        
        distances.push({
            distance: distance,
            class: trainEmbedding["class"]
        });
    }

    return distances;
}

function getKNearestNeighbors(testEmbedding, k){
    const distances = compare(testEmbedding);
    const sortedDistances = distances.sort((a,b) => {
        if(a["distance"] > b["distance"]){
            return -1;
        }else{
            return 1;
        }
    })

    return sortedDistances.slice(0, k);
}

console.log(getKNearestNeighbors(testEmbeddings[0], 5));