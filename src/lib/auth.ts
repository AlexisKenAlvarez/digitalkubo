import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { z } from "zod";


const credentialSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20)
})

export const authOptions: NextAuthOptions = {

    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            id: 'credential-login',
            name: 'credential-login',
            credentials: {
                email: {
                    type: 'text'

                },
                password: {
                    type: 'password'
                }
            },
            async authorize(credentials) {
                const { email, password } = credentialSchema.parse(credentials)

                const { data } = await axios.post(`${process.env.NEXTAUTH_URL}/api/login`, {
                    email,
                    password
                })

                console.log(data)

                if (data.success) {
                    const user = {
                        email
                    }

                    return user as any
                } else {
                    return null
                }

            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {


            if (account && account.provider === 'google') {

                // CHECKS IF THE EMAIL DOES EXIST ON DATABASE
                const data = await axios.post(`${process.env.NEXTAUTH_URL}/api/checkEmail`, {
                    email: user.email
                })

                console.log(data.data)


                // IF THE DATA IS NOT EXISTING, THEN REGISTER THE NEW USER
                if (!data.data.found) {
                    const data = await axios.post(`${process.env.NEXTAUTH_URL}/api/addUser`, {
                        email: user.email,
                        password: null,
                        accountType: 2
                    })
                    return true
                }


                // IF IT IS EXISTING BUT GOOGLE ACCOUNT, THEN CONTINUE
                if (data.data.accountType === 2) {
                    return true
                } else if (data.data.data.accountType === 1) { // IF IT EXIST BUT NOT GOOGLE ACCOUNT, THEN ACCESS DENY, MUST USE PASSWORD INSTEAD
                    throw new Error(`Login denied! &email=${user.email} &errorType=google-signin-denied`)
                }



            }
            return true
        },

        async jwt({ token, account, user }) {
            if (account) {
                token.email = user.email
                token.accessToken = account.access_token
                token.id = user.id
            }
            return token
        },
        async session({ session, token, user }) {
            session.user.id = token.id
            return session
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/authError',

    },
    secret: process.env.NEXTAUTH_SECRET
};