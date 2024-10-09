import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb';

interface IParams {
  reservationId?: string;
}

export async function DELETE (
  request: Request,
  {params} : {params: IParams}
){
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return NextResponse.error();
  }

  const {reservationId} = params;

  if(!reservationId || typeof reservationId !== 'string') {
    throw new Error("Invalid ID");
  }

  //we want to ensure the only people who are able to delete reservation is the logged in user or the user that posted the listing
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        {userId: currentUser.id},
        {listing: {userId: currentUser.id}}
      ]

    }
  });

  return NextResponse.json(reservation);
}