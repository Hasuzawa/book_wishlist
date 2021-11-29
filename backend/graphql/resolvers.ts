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
            //console.log("GraphQL context is: ", context)
            //context.prisma
            let id: number = parseInt(args.id);
            const user = await context.prisma.user.findUnique({
                select: {
                    username: true,
                    password: true
                },
                where: {
                    id: id
                }
            })
            console.log(user)
            return user;







            // let password: string = args.password;
            // if (isNaN(id)) {
            //     //BAD_USER_INPUT
            // }

            // try {
            //     const user = await context.prisma.user.findUnique({
            //         select: {
            //             username: true,
            //             password: true,
            //         },
            //         where: {
            //             id: id
            //         }
            //     })
            //     console.log(user)
            //     if (!user) {
            //         console.log("User does not exist")
            //     } else {
            //         if (password === user.password && password === user.password) {
            //             console.log("successful login")
            //         }
            //     }
            // } catch (e) {
            //     if (e instanceof Prisma.PrismaClientKnownRequestError) {
            //         if (e.code === "P2002") {
            //             console.log(
            //               'There is a unique constraint violation, a new user cannot be created with this email'
            //             )
            //         }
            //     }
            // }
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
    },
    Mutation: {
        login: () => {

        },
        logout: (parent: any, context: any) => {
            context.logout()
        },

        createUser: async (parent: any , args: any, context: any, info: any) => {
            console.log("createUser mutation args: ", args)
            const { username, password } = args;
            //try {
                const user = await context.prisma.user.create({
                    data: {
                        username: username,
                        password: password,
                    }
                })
                return user;
            // } catch (e) {
            //     return "error happened"
            // }
        },

        createBookEntry: () => {

        },
        
        updateBookEntry: () => {

        }
    }
}


export default resolvers