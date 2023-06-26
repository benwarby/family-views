import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";



let getUserProvider = function () {
  // type UserCredentials = Record<keyof C, string> | undefined
  return CredentialsProvider({
    id: "user-credentials",
    name: "User Credentials",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      //TODO: Do a good check.  This is not a good check.
      if (credentials) {
        if (credentials.password === "LoganUtah11") {
          return {
            id: credentials.username,
            name: credentials.username,
          };
        }
      }

      // const res = await fetch("/your/endpoint", {
      //   method: 'POST',
      //   body: JSON.stringify(credentials),
      //   headers: { "Content-Type": "application/json" }
      // })
      // const user = await res.json()

      // if (res.ok && user) {
      //   return user
      // }
      return null;
    },
  });
};

let getViewsProvider = function () {
  return CredentialsProvider({
    id: "view-credentials",
    name: "View Credentials",
    credentials: {
      // username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      //TODO: Do a good check.  This is not a good check.
      if (credentials) {
        if (credentials.password === "LoganUtah11") {
          return {
            id: "view",
            name: "view",
          };
        }
      }
      //     const res = await fetch("/your/endpoint", {
      //       method: 'POST',
      //       body: JSON.stringify(credentials),
      //       headers: { "Content-Type": "application/json" }
      //     })
      //     const user = await res.json()

      //     if (res.ok && user) {
      //       return user
      //     }
      return null;
    },
  });
};

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    getUserProvider(), getViewsProvider()
  ],
  callbacks: {
    async jwt({ token }) {
      if (token.name !== "view") {
        token.userRole = "admin"
      } else {
        token.userRole = "view"
      }
      
      return token
    },
  },
}


export default NextAuth(authOptions)
