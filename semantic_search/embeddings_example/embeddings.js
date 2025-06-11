import { pipeline, cos_sim } from "@huggingface/transformers";

const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", { dtype: "q8" })

console.log(await embedder("oi tudo bem?"))
