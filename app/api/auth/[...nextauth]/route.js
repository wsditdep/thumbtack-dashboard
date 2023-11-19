import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "@/model/User";
import { connectDB } from "@/utils/database";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { username, password } = credentials;

        try {
          await connectDB();
          const user = await User.findOne({ username });

          if (!user) {
            return null;
          }

          if (user.role === "user" || user.role === "practice") {
            return null;
          }

          if(user.accountStatus === "block") {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      const user = token.user
      session.user = user
      return session
    }
  }
  // debug: process.env.NODE_ENV === "development"
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
