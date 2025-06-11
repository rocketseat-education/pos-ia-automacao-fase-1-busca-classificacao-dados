import { pipeline, cos_sim } from "@huggingface/transformers"

const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", { dtype: "q8" })
const imgEmbedder = await pipeline("image-feature-extraction", "Xenova/clip-vit-base-patch32", { dtype: "q8" })

async function embedText(text) {
  return embedder(text, { pooling: "mean", normalize: true }).then(t => t.tolist()[0]);
}

async function embedImg(img) {
  return imgEmbedder(img, { pooling: "cls", normalize: true }).then(t => t.tolist()[0]);
}

const babyHippo = "https://i.ytimg.com/vi/96xC5JIkIpQ/maxresdefault.jpg"
const babyHippo2 = "https://i.natgeofe.com/n/74c229e3-4ff7-49d5-bcfd-75e0033816f0/NationalGeographic_1148167.jpg"

const cat = "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200"
const cat2 = "https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"

const train = "https://www.explore.com/img/gallery/the-oldest-vintage-trains-around-the-world-you-can-still-ride-today/intro-1725233481.jpg"
const car = "https://www.topgear.com/sites/default/files/2024/11/Original-25901-aw609563.jpg"

console.log(cos_sim(await embedImg(babyHippo), await embedImg(babyHippo2)));
console.log(cos_sim(await embedImg(cat), await embedImg(cat2)));
console.log(cos_sim(await embedImg(babyHippo), await embedImg(train)));
console.log(cos_sim(await embedImg(car), await embedImg(train)));


