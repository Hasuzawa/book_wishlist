import prisma from "../prisma/prisma"
import { Resolvers } from "src/generated/graphql"
import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"


interface GqlContext {
    prisma: PrismaClient
}

// resolvers: Resolvers<GqlContext>
const resolvers = {
    Query: {
        getUserById: async (parent: any, args: any, context: any, info: any) => {
            //context.prisma
            let id: number = parseInt(args.id);
            let password: string = args.password;
            if (isNaN(id)) {
                //BAD_USER_INPUT
            }

            try {
                const user = await prisma.user.findUnique({
                    select: {
                        username: true,
                        password: true,
                    },
                    where: {
                        id: id
                    }
                })
                console.log(user)
                if (!user) {
                    console.log("User does not exist")
                } else {
                    if (password === user.password && password === user.password) {
                        console.log("successful login")
                    }
                }
            } catch (e) {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    if (e.code === "P2002") {
                        console.log(
                          'There is a unique constraint violation, a new user cannot be created with this email'
                        )
                    }
                }
            }
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