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

function getKNearestNeighbors(distances, k){
    const sortedDistances = distances.sort((a,b) => {
        if(a["distance"] > b["distance"]){
            return -1;
        }else{
            return 1;
        }
    })

    return sortedDistances.slice(0, k);
}

function countClasses(knn){
    const classCount = {};

    for(let n of knn){
        classCount[n["class"]] = classCount[n["class"]] ? classCount[n["class"]] + 1 : 1;
    }

    return classCount;
}

function getMaxClass(classCount){
    let maxClass = null;
    let maxClassCount = 0;

    for(let cls in classCount){
        if(classCount[cls] > maxClassCount){
            maxClassCount = classCount[cls];
            maxClass = cls;
        }
    }

    return maxClass;
}

function knnClassifier(testEmbedding, k){
    const distances = compare(testEmbedding);
    const knn = getKNearestNeighbors(distances, k);
    const classCount = countClasses(knn);
    const predictedClass = getMaxClass(classCount);

    return predictedClass;
}

console.log(knnClassifier(testEmbeddings[0], 5));