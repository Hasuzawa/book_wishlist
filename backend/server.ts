import express from "express";
import { graphqlHTTP } from "express-graphql"
import { buildSchema, GraphQLSchema } from "graphql"

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from "@graphql-tools/load"
//import { Loader } from "@graphql-tools/utils/loaders"
import { makeExecutableSchema } from "@graphql-tools/schema/makeExecutableSchema"
//const GraphqlFile


//ad-hoc schema and resolver
// const schema: GraphQLSchema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

const schema: GraphQLSchema = loadSchemaSync("./graphql/schema.graphql", {
    loaders: [new GraphQLFileLoader]
})


const root = {
    hello: () => {
      return 'Hello world!';
    },
  };
//

const port = process.env.PORT ?? 7000;      // better than ||

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("<h1>backend started</h1>")
})



app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))



app.listen(port, () => {
    console.log(`server started at ${port}`)
})
