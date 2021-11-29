import express from "express";
import session from "express-session";
import {v4 as uuidv4} from "uuid"
import passport from "passport"
import prisma from "./prisma/prisma";
import { ApolloServer } from "apollo-server-express"

import { schema } from "./graphql/graphqlHttp"
import resolvers from "./graphql/resolvers"

//import { Loader } from "@graphql-tools/utils/loaders"
import { makeExecutableSchema } from "@graphql-tools/schema/makeExecutableSchema"
//const GraphqlFile

import graphqlHttpMiddleware from "./graphql/graphqlHttp"


const PORT = process.env.PORT ?? 7000;      // better than ||
const SESSION_SECRET = "ajhweoi89df7fv938u489tvofawhvr89syzair3kjfo831op10djgnabw4";

passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: number, done) => {
    const user = await prisma.user.findUnique({
        // select: {
        //     username: true,
        //     password: true,
        // },
        where: {
            id: id
        }
    })
    done(null, user);

    // return await prisma.user.findUnique({
    //     include: {
    //         id: true
    //     }
    //     select: {

    //     },
    //     where {
    //         id: id
    //     }
    // })
})


// ~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!! //
async function startApolloServer() {

const app = express();

app.use(session({
    genid: req => uuidv4(),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     secure: true,
    //     httpOnly: true,
    //     sameSite: "strict",
    //     maxAge: 1000*60*30,     // 30 minutes  
    // }
}));
app.use(passport.initialize())
app.use(passport.session())




const server = new ApolloServer({
    schema: schema,
    resolvers: resolvers,
    context: ({req}) => {
        console.info("req in context is:", req);
        return {
            getUser: () => req.user,
            logout: () => req.logout()
        }}
})


await server.start()
server.applyMiddleware({ app })



app.get("/", (req, res) => {
    res.status(200).send("<h1>backend started</h1>")
})
//app.use("/graphql", graphqlHttpMiddleware)


app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})

//}
}

startApolloServer();