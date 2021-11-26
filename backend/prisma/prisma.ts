import { PrismaClient } from "@prisma/client"


let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {
    // see https://www.prisma.io/blog/fullstack-nextjs-graphql-prisma-2-fwpc6ds155
    
    // if (!global.prisma) {
    //   global.prisma = new PrismaClient()
    // }
    // prisma = global.prisma

    prisma = new PrismaClient()
}
  
export default prisma