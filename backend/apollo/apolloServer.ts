import { ApolloServer, ExpressContext } from "apollo-server-express"
import prisma from "../prisma/prisma"
import schema from "../graphql/graphqlHttp"
import resolvers from "../graphql/resolvers"
import { addResolversToSchema } from "@graphql-tools/schema"
import { GraphQLSchema } from "graphql"



const schemaWithResolvers: GraphQLSchema = addResolversToSchema(schema, resolvers)

//: ApolloServer<ExpressContext>
const apolloServer = new ApolloServer({
    schema: schemaWithResolvers,
    //resolvers: resolvers,
    context: ({req}) => {               // remember these are available for every resolver
        //console.info("req in context is:", req);
        return {
            prisma: prisma,                 // for database abstraction
            getUser: () => req.user,
            logout: () => req.logout()
        }}
})

export default apolloServer