import { cos_sim, pipeline } from "@huggingface/transformers";
import fs from "fs";

const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", { dtype: "q8" });

async function getEmbedding(texts) {
    return embedder(texts, { pooling: "mean", normalize: true }).then(t => t.tolist());
}

const movies = JSON.parse(fs.readFileSync("./movies.json"));

const movieTexts = [];

for(let movie of movies) {
    movieTexts.push(JSON.stringify(movie));
}

const embeddings = await getEmbedding(movieTexts);

for(let i = 0; i < movies.length; i++) {
    movies[i]["embedding"] = embeddings[i];
}

const query = "Cars and desert";
const queryEmbedding = (await getEmbedding(query))[0];

for (let movie of movies) {
    movie["similarity"] = cos_sim(queryEmbedding, movie["embedding"]);
}

movies.sort((a, b) => {
    if (a.similarity > b.similarity) {
        return 1;
    } else {
        return -1;
    }
})

console.log(movies);


