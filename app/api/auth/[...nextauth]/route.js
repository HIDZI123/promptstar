import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import Users from "@models/users";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await Users.findOne({
          email: session?.user?.email,
        });

        session.user.id = sessionUser._id.toString();
        return session;
        
      } catch (error) {
        console.log("Error Occured in Session: ", error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        //Check if user exists
        const userExists = await Users.findOne({
          email: profile.email,
        });

        //If not Create a new user
        if (!userExists) {
          await Users.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error Occured: ", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
