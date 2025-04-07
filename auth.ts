import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import md5 from "md5"; // Use md5 library

const prisma = new PrismaClient();

// Helper function to generate Gravatar URL
const getGravatarUrl = (email: string) => {
  const hash = md5(email.trim().toLowerCase()); // Use md5 to generate hash
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Resend({
      apiKey: process.env.NEXT_PUBLIC_RESEND_API_KEY!,
      from: "noreply@daffodilhmosolutions.co.uk",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile, email }) {
      if (account?.provider === "google") {
        // Handle Google OAuth sign-in
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          // Always update the user's image with the Google profile picture
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { image: profile?.picture }, // Use Google profile picture
          });

          // Check if the user already has a Google account linked
          const existingAccount = await prisma.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: "google",
            },
          });

          if (!existingAccount) {
            // Link the Google account to the existing user
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: "oauth",
                provider: "google",
                providerAccountId: account.providerAccountId,
              },
            });
          }

          return true; // Allow sign-in
        }

        // Create a new user if they don't exist
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image: profile?.picture, // Use Google profile picture
            role: "user",
            accounts: {
              create: {
                type: "oauth",
                provider: "google",
                providerAccountId: account.providerAccountId,
              },
            },
          },
        });

        return true;
      }

      if (account?.provider === "resend") {
        // Handle Magic Link sign-in
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        const gravatarUrl = getGravatarUrl(user.email!); // Generate Gravatar URL

        if (existingUser) {
          // Update the user's image only if it's not set
          if (!existingUser.image) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { image: gravatarUrl },
            });
          }
          return true;
        }

        // Create a new user if they don't exist
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.email, // Use email as the default name
            image: gravatarUrl, // Set Gravatar as the default image
            role: "user",
          },
        });

        return true;
      }

      return false; // Deny sign-in for other providers
    },
  },
});