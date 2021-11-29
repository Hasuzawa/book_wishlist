import { graphqlHTTP } from "express-graphql"
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLSchema } from "graphql"
import { makeExecutableSchema, addResolversToSchema } from "@graphql-tools/schema"
import prisma from "../prisma/prisma"
import path from "path"
import resolvers from "./resolvers"

// https://stackoverflow.com/questions/62916075/im-unable-to-import-schema-graphql-file-in-typedefs-unable-to-find-any-graphq
// the path resolve is needed, otherwise the string will not point to the schema

const schema: GraphQLSchema = loadSchemaSync(path.resolve(__dirname, "./schema.graphql"), {
    loaders: [new GraphQLFileLoader]
})

const schemaWithResolvers: GraphQLSchema = addResolversToSchema(schema, resolvers)


const root = {
    hello: () => {
      return 'Hello world!';
    },
  };

const context = {
    prisma: prisma
}

const graphqlHttpMiddleware = graphqlHTTP({
    schema: schemaWithResolvers,
    context: context,
    rootValue: root,
    graphiql: true,
})

export default graphqlHttpMiddleware
export { schema }