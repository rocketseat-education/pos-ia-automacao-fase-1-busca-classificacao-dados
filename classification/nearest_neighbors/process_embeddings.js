import fs from "fs"

const files = fs.readdirSync("./embeddings").map(f => "./embeddings/" + f);

let embeddings = []

for (let file of files){
    const fileJSON = JSON.parse(fs.readFileSync(file));
    embeddings = embeddings.concat(fileJSON);
}

for (let embedding of embeddings) {
    embedding["number"] = parseInt(/\d+/.exec(embedding["path"]));
    embedding["split"] = embedding["number"] < 500 ? "test" : "train";
    embedding["class"] = embedding["path"].includes("cat") ? "cat" : "dog";
}

fs.writeFileSync("./embeddings.json", JSON.stringify())