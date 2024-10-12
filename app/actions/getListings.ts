import prisma from '@/lib/prismadb';

export interface IListingParams{
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingParams){
  
  
  try{
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category
    } = params;

    let query: any = {}

    if(userId){
      query.userId = userId;
    }

    if(category){
      query.category = category;
    }

    if(roomCount){
      query.roomCount = {
        //the gte and plus makes the room count a definite number
        gte: +roomCount
      }
    }

    if(guestCount){
      query.guestCount = {
        //the gte means greater than or equal to the actual and plus makes the room count a definite number
        gte: +guestCount
      }
    }

    if(bathroomCount){
      query.bathroomCount = {
        //the gte and plus makes the room count a definite number
        gte: +bathroomCount
      }
    }

    if(locationValue){
      query.locationValue = locationValue;
    }

    if(startDate && endDate){
      query.NOT = {
        reservations:{
          some:{
            OR: [
              {
                endDate: {gte: startDate},
                startDate: {lte: startDate}
              },
              {
                startDate: {lte: endDate},
                endDate: {gte: endDate}
              }
            ]
          }
        }
      }
    }

    
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy:{
        createdAt: 'desc'
      }
    })

    const safeListings = listings.map((listing)=>({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }))

    return safeListings

    // return listings;

  } catch (error: any){
    throw new Error(error);
  }
}