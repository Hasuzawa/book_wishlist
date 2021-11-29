import { graphqlHTTP } from "express-graphql"
import { GraphQLSchema } from "graphql"
import { makeExecutableSchema, addResolversToSchema } from "@graphql-tools/schema"
import prisma from "../prisma/prisma"
import resolvers from "./resolvers"

// https://stackoverflow.com/questions/62916075/im-unable-to-import-schema-graphql-file-in-typedefs-unable-to-find-any-graphq
// the path resolve is needed, otherwise the string will not point to the schema

import schema from "./schema"

const schemaWithResolvers: GraphQLSchema = addResolversToSchema(schema, resolvers)


const root = {
    hello: () => {
      return 'Hello world!';
    },
  };

// const context = {
//     prisma: prisma
// }

// const graphqlHttpMiddleware = graphqlHTTP({
//     schema: schemaWithResolvers,
//     context: context,
//     rootValue: root,
//     graphiql: true,
// })

//export default graphqlHttpMiddleware
export default schema