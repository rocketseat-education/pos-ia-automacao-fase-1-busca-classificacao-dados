import { pipeline, cos_sim } from "@huggingface/transformers"

const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", { dtype: "q8" })

async function embedText(text) {
  return embedder(text, { pooling: "mean", normalize: true }).then(t => t.tolist()[0]);
}

console.log(cos_sim(await embedText("king"), await embedText("queen")))
console.log(cos_sim(await embedText("king"), await embedText("woman")))
console.log(cos_sim(await embedText("king"), await embedText("man")))
console.log(cos_sim(await embedText("i drove my car to work"), await embedText("i walked home from work")))
console.log(cos_sim(await embedText("i drove my car to work"), await embedText("i ate pizza at home for dinner")))
console.log(cos_sim(await embedText("i drank juice for lunch"), await embedText("i ate pizza at home for dinner")))

console.log(cos_sim(await embedText("France"), await embedText("Italy")))
console.log(cos_sim(await embedText("France"), await embedText("China")))

console.log(cos_sim(await embedText("France"), await embedText("Pizza")))
console.log(cos_sim(await embedText("Italy"), await embedText("Pizza")))

