import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from "@graphql-tools/load"
import path from "path"
import { GraphQLSchema } from "graphql"


const schema: GraphQLSchema = loadSchemaSync(path.resolve(__dirname, "./schema.graphql"), {
    loaders: [new GraphQLFileLoader]
})


export default schema