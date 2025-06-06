import { pipeline } from "@huggingface/transformers";

export default class ImageEmbedder{
    static task = "image-feature-extraction";
    static modelName = "Xenova/clip-vit-base-patch32";
    static dtype = "fp32";
    static pooling = "cls";
    static normalize = true;

    static pipeline = null;

    static async loadInstance(){
        if(this.pipeline === null){
            this.pipeline = await pipeline(this.task, this.modelName, { dtype: this.dtype });
        }

        return this.pipeline;
    }

    static async embedImg(imgPath){
    const config = { pooling: this.pooling, normalize: this.normalize };
    return this.pipeline(imgPath, config).then(t => t.tolist());
    }
}