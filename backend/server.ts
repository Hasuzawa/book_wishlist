import express from "express";

//import { Loader } from "@graphql-tools/utils/loaders"
import { makeExecutableSchema } from "@graphql-tools/schema/makeExecutableSchema"
//const GraphqlFile

import graphqlHttpMiddleware from "./graphql/graphqlHttp"


const port = process.env.PORT ?? 7000;      // better than ||

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("<h1>backend started</h1>")
})



app.use("/graphql", graphqlHttpMiddleware)



app.listen(port, () => {
    console.log(`server started at ${port}`)
})
