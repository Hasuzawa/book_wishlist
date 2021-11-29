import express from "express";
import session from "express-session";
import {v4 as uuidv4} from "uuid"

import passport from "./authentication/passport"
import apolloServer from "./apollo/apolloServer"

//import { Loader } from "@graphql-tools/utils/loaders"
//import { makeExecutableSchema } from "@graphql-tools/schema/makeExecutableSchema"
//const GraphqlFile

import graphqlHttpMiddleware from "./graphql/graphqlHttp"

const PORT = process.env.PORT ?? 7000;      // better than ||
const SESSION_SECRET = "ajhweoi89df7fv938u489tvofawhvr89syzair3kjfo831op10djgnabw4";


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

    await apolloServer.start()
    apolloServer.applyMiddleware({ app })


    app.get("/", (req, res) => {
        res.status(200).send("<h1>backend started</h1>")
    })
    //app.use("/graphql", graphqlHttpMiddleware)
    app.listen(PORT, () => {
        console.log(`server started at ${PORT}`)
    })

}

startApolloServer();