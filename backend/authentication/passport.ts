import passport from "passport"
import prisma from "../prisma/prisma";
import type { User } from "../src/generated/graphql"

passport.serializeUser((user: unknown, done) => {
    console.log("serialize user");
    let x = user as User;
    done(null, x.id)
})

passport.deserializeUser(async (id: number, done) => {
    console.log("deserialize user");
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
})

export default passport