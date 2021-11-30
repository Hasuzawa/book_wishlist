import prisma from "../prisma/prisma"
import { Resolvers } from "src/generated/graphql"
import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"
import { AuthenticationError, UserInputError, ValidationError  } from "apollo-server-express"


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
            if (isNaN(id)) {
                throw new UserInputError("Input is not a number")
            }
            const user = await context.prisma.user.findUnique({
                select: {
                    username: true,
                    password: true,
                    books: true
                },
                where: {
                    id: id
                }
            })
            if (!user) {
                throw new ValidationError("User does not exists.")
            }
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
        getBookEntryById: async (parent: any, args: any, context: any, info: any) => {
            const { id } = args;
            const bookEntry = await context.prisma.bookEntry.findUnique({
                where: {
                    id: id
                }
            })
            if (!bookEntry) {
                throw new ValidationError("Book does not exists.")
            }
            return bookEntry
        },
    },

    Mutation: {
        login: async (parent: any, args: any, context: any) => {
            const { username, password } = args;
            const user = await context.prisma.user.findUnique({
                select: {
                    username,
                    password
                },
                where: {
                    username: username
                }
            })
            if (!user) {
                throw new ValidationError("User does not exists.")
            }
            if (username === user.username && password === user.password) {
                console.log("login success")
                return true
            } else {
                throw new AuthenticationError("Incorrect password.")
            }
        },

        logout: (parent: any, context: any) => {
            context.logout()
        },

        createUser: async (parent: any , args: any, context: any, info: any) => {
            console.log("createUser mutation args: ", args)
            const { username, password } = args;
            try {
                const user = await context.prisma.user.create({
                    data: {
                        username: username,
                        password: password,
                    }
                })
                return user;
            } catch (e) {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    switch(e.code) {
                        case "P2002": throw new ValidationError("Username is already registered.");
                        default: throw new Error("Unknown prisma error");
                    }
                }
                throw new Error("Unknown error")
            }
        },

        createBookEntry: async (parent: any, args: any, context: any, info: any) => {
            let { name, author, description, read } = args;
            author ??= "";
            description ??= "";
            const userId = context.getUser().id;
            try {
                const bookEntry = await context.prisma.bookEntry.create({
                    data: {
                        userId: userId,
                        name: name,
                        author: author,
                        description: description,
                        read: read
                    }
                })
                return bookEntry
            } catch (e) {

            }

        },
        
        updateBookEntry: () => {

        }
    }
}


export default resolvers