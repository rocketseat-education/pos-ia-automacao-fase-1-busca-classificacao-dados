import { GoogleGenAI } from "@google/genai";

export default async function query(collection, queryText) {
  let res;

  switch (collection.name) {
    case "moviesgemini":
      res = await queryWithGeminiEmbedding(collection, queryText);
      break;
    default:
      res = await queryWithDefaultEmbedding(collection, queryText);
      break;
  }

  const movies = [];

  const distances = res.distances[0].map(d => ((1 - d) + 1) / 2);

  for (let i = 0; i < res.ids[0].length; i++) {
    movies.push({
      id: res.ids[0][i],
      distance: distances[i],
      title: res.metadatas[0][i].title,
      tags: res.metadatas[0][i].tags.split(", "),
      synopsis: res.metadatas[0][i].synopsis,
    });
  }

  return movies;
}

async function queryWithGeminiEmbedding(collection, queryText) {
  const genai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GEN_AI_API_KEY });

  const response = await genai.models.embedContent({
            model: "models/text-embedding-004",
            contents: queryText,
            config: {"task_type": "retrieval_document"}
        });

  const queryEmbeddings = response.embeddings[0].values;

  return collection.query({ queryEmbeddings: queryEmbeddings});
}

function queryWithDefaultEmbedding(collection, queryText) {
  return collection.query({ queryTexts: queryText });
}