import embedImg from "./embedder.js";
import { cos_sim } from "@huggingface/transformers";

function compare(testEmbedding, knowledgeBase){
     let distances = [];

    for(let embedding of knowledgeBase){
        const distance = cos_sim(testEmbedding, embedding["embedding"]);
        
        distances.push({
            distance: distance,
            class: embedding["class"]
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

export default async function knnClassifier(path, k, knowledgeBase){
    const embedding = await embedImg(path);
    const distances = compare(embedding, knowledgeBase);
    const knn = getKNearestNeighbors(distances, k);
    const classCount = countClasses(knn);
    const predictedClass = getMaxClass(classCount);

    return predictedClass;
}