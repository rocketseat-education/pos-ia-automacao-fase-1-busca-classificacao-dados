import { classify as llmClassify } from "./llm/api.js";
import { classify as knnClassify, init as knnInit } from "./knn/api.js";

import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

await knnInit();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

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
        const k = req.body["k"] ? req.body["k"] : 5;

        result = await knnClassify(imgPath, k);
    }else {
        res.status(400).send({"error": "no method found"});
    }

    res.send({category: result});
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});