//import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "enter user name",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "enter ur password",
        },
      },
      async authorize(credentials) {
        // retrieve data from DB and validate user credentials
        // hardcoding user for now
        console.log({ credentials });
        const user = { id: 1, name: "ashish", password: "ashish" };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
