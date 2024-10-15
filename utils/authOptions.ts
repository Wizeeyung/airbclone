import prisma from '@/lib/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions} from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
// import NextAuth from 'next-auth/next';
import  CredentialsProvider  from 'next-auth/providers/credentials';


export const authOptions: NextAuthOptions ={
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization:{
        params:{
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials){
        if(!credentials?.email || !credentials?.password){
          throw new Error("Invalid Credentials")
        }

        const user = await prisma.user.findUnique({
          where:{
            email: credentials.email
          }
        });

        if(!user || !user?.hashedPassword){
          throw new Error("Invalid Credentials");
        }


        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        
        if(!isCorrectPassword){
          throw new Error("Invalid Credentials");
        }

        return user
      }
    })

  ],
  // Specify URLs to be used if you want to create custom sign in, sign out and error pages. Pages specified will override the corresponding built-in page.
  pages: {
    signIn: '/',
    
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions