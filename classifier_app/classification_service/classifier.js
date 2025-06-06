import { classify } from "./llm/api.js";

console.log(await classify("https://images.theconversation.com/files/625049/original/file-20241010-15-95v3ha.jpg?ixlib=rb-4.1.0&rect=12%2C96%2C2671%2C1335&q=45&auto=format&w=668&h=324&fit=crop", 5));