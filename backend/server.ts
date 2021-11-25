import express from "express";


const port = 4000;

const app = express();

app.get("/", () => {
    return "Hello World";
})






app.listen(port, () => {
    console.log(`server started at ${port}`)
})
