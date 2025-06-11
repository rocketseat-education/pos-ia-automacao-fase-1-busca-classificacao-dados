import llmClassifier from "./classifier.js";

async function classify(path){
    return llmClassifier(path);
}

export { classify };