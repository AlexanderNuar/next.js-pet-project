import NextAuth from 'next-auth'
// import GitHub from 'next-auth/providers/github'
import Google from '@auth/core/providers/google'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import prisma from '@/prisma/client'

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //   authorization: {
      //     params: {
      //       prompt: 'consent',
      //       access_type: 'offline',
      //       response_type: 'code',
      //     },
      //   },
    }),
  ],
})
