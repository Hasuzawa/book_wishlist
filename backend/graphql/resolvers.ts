import prisma from "../prisma/prisma"
import { Resolvers } from "src/generated/graphql"
import { PrismaClient } from "@prisma/client"


interface GqlContext {
    prisma: PrismaClient
}

// resolvers: Resolvers<GqlContext>
const resolvers = {
    Query: {
        getUserById: (parent: any, args: any, context: any, info: any) => {
            //context.prisma
            const id = args.id;
            const user =  prisma.user.findUnique({
                where: {
                    id: id
                }
            })
            console.log(user)
            return user
        },
        getBookEntryById: (parent: any, args: any, context: any, info: any) => {
            const { id } = args;
            const bookEntry = prisma.bookEntry.findUnique({
                where: {
                    id: id
                }
            })
            return bookEntry
        },
        login: () => {
            //testing
            return 1;
        }
    },
    Mutation: {
        createUser: () => {

        },
        createBookEntry: () => {

        },
        updateBookEntry: () => {

        }
    }
}

export default resolvers