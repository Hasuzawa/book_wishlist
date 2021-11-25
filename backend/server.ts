import express from "express";



const port = 8000;

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("<h1>backend started</h1>")
})






app.listen(port, () => {
    console.log(`server started at ${port}`)
})
