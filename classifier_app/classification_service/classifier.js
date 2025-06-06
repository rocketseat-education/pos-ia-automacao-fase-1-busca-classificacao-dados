import { classify as llmClassify } from "./llm/api.js";
import { classify as knnClassify, init as knnInit } from "./knn/api.js";

// const dogExample = "https://images.theconversation.com/files/625049/original/file-20241010-15-95v3ha.jpg?ixlib=rb-4.1.0&rect=12%2C96%2C2671%2C1335&q=45&auto=format&w=668&h=324&fit=crop";
// 
// console.log(await classify(dogExample, 5));

import express from "express";

const app = express();
const port = 3000;

await knnInit();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/classify", async (req, res) =>{
    const method = req.body["method"];
    const imgPath = req.body["imgPath"];

    console.log(`New classification request using ${method}`);

    let result = null
    if (method == 'llm') {
        result = await llmClassify(imgPath);
    } else if (method == "knn"){
        result = await knnClassify(imgPath, 5);
    }else {
        res.send({"error": "no method found"});
    }

    res.send({category: result});
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});