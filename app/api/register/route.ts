import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server';
import prisma  from '@/lib/prismadb';

export async function POST(request: Request){

  try{
    const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data:{
      email,
      name,
      hashedPassword
    }
  });

  return new NextResponse(JSON.stringify({message: "User is created", user: user}), {status:200})

  }catch (error: any) {
    // Send error message as JSON
    return new NextResponse(
      JSON.stringify({
        message: 'This email has already been used.',
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
  
  
