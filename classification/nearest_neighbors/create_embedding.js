import fs from "fs";

import { pipeline } from "@huggingface/transformers";
const imgEmbedder = await pipeline("image-feature-extraction", "Xenova/clip-vit-base-patch32", { dtype: "fp32" });

async function embedImg(imgs){
    return imgEmbedder(imgs, { pooling: "cls", normalize: true }).then(t => t.tolist());
}

const images = fs.readdirSync("./train").map(f => "./train/" + f);

let startIdx = 0;

while (startIdx < images.length) {
    let endIdx = startIdx + 500;

    console.log(`Embedding images from ${startIdx} to ${endIdx}`);
    
    let imgsToEmbed = images.slice(startIdx, endIdx);

    const embeddings = await embedImg(imgsToEmbed);
    const output = []

    for (let i=0; i< embeddings.length; i++) {
        output.push({
            path: images[i + startIdx],
            embedding: embeddings[i]
        })
        
    }

    fs.writeFileSync(`embeddings/embedding_${startIdx}.json`, JSON.stringify(output));

    startIdx = endIdx;
}