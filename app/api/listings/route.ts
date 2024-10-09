import prisma from '@/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';


export async function POST(
  request: Request
){
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return NextResponse.error()
  }

  const body = await request.json();

  const {
    title,
    description,
    imageSrc,
    price,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
  } = body;
  

  //optional
  Object.keys(body).forEach((value:any) => {
    if(!body[value]){
      return NextResponse.error()
    }
  })

  const listing = await prisma.listing.create({
    data:{
      title,
      description,
      imageSrc,
      price: parseInt(price, 10),
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      userId: currentUser.id
    }
  });

  return new NextResponse(JSON.stringify({message: "Listing is created", listing: listing}), {status:200})
}