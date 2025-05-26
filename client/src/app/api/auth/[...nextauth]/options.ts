import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export interface CustomnSession {
    user?:CustomUser;
    expires:ISODateString
}

export interface CustomUser {
    id?: string|null;
    name?: string|null;
    email?: string|null;
    image?: string|null;
    provider?: string|null;
    token?: string|null;
    createdAt?: string|null;
    updatedAt?: string|null;
}

export const authOption:AuthOptions = {
    pages: {
        signIn: "/"
    },
    callbacks: {
        async signIn({user, account}) {
            console.log("The user data is ", user);
            console.log("The account data is ", account);

            return true
        },

        async session({session, user, token}: {session: CustomnSession, user: CustomUser, token: JWT}) {
            session.user = token.user as CustomUser
            return session
        },
        async jwt({token, user, account, profile, isNewUser}) {
            if(user){
                token.user = user
            }
            return token
        }
    },
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
            params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
            }
        }
        })
    ]
}