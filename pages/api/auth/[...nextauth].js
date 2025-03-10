import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages:{
      signIn: "/auth/signin",

  },
  callbacks: {
      async session({ session, token }){
          session.user.username = session.user.name.split(' ').join("").toLocaleLowerCase();
          session.user.uid = token.sub;
          return session;
      },
      async jwt({token}){
        return token
      }
  },
  secret: "VALIPS_SECRET",
})
