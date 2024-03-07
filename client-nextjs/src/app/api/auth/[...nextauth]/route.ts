import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signIn, signOut, useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { profile } from "console";

const URI: string = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          callbackURL: "http://localhost:3000/interfaces/tasks",
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        console.log(user);

        if (user.error) throw user;

        return user;
      },
    }),
  ],
  //secret:"gatos",
  callbacks: {
    async signIn({ user, account, profile }) {

      return true;
    },

    async jwt({ token, user, account,trigger,session }) {
      if (account?.provider === "google") {
        const secret = "*******";
        const payload = {
          email: user.email, 
          username: user.name, 
        };

        const tokenUser = jwt.sign(payload, secret, { expiresIn: "1m" });


        let instance = axios.create({
          baseURL: "http://localhost:3001/",
          headers: {
            Authorization: `Bearer ${tokenUser}`,
            "Content-Type": "application/json",
          },
        });

        try {
          const newUser = await instance
            .post("/auth/google/verify")
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              return error;
            });

          token.accessToken = newUser.accessToken;
          token.refreshToken = newUser.refreshToken;
          token.role = newUser.role;
          console.log("--------------------------------*-------------------------------")
          console.log(token)

        } catch (error) {
          console.log(error)
        }
      }

      
      if(trigger==="update"){
        return { ...token, ...session.user};
      }
      

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
