import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github'
import  CredentialsProvider  from "next-auth/providers/credentials";
import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials:  {},
      async authorize(credentials , req) {
        console.log(req.body);
        const {email , password} = await req.body
        const client = await clientPromise
        const db = await client.db('users')
        const user = await db.collection('users').findOne({email: email})
        if(!user) {
          return null
        }
        const matchPass = await bcrypt.compare(password , user.password)
        if(!matchPass) {
          return null
        }
        return user
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "./dashoard",
  },
  session : {
    strategy : 'jwt'
  },
});

export {handler as GET , handler as POST}