import React, { lazy, Suspense } from 'react'
import getListingById from '@/app/actions/getListingByIds';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';
import { ListingClientSkeleton } from '@/app/components/loading';

const ListingClient = lazy(()=> import('./ListingClient'));

interface Iparams{
  listingId?: string;
}

const ListingPage = async ({params}: {params: Iparams}) => {
  
  const listing = await getListingById(params)
  console.log(listing, 'list')
  const currentUser= await getCurrentUser();
  const reservations = await getReservations(params);

  if(!listing){
    return(
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Suspense fallback={<ListingClientSkeleton />}>
      <ListingClient 
      listing={listing}
      reservations={reservations}
        currentUser={currentUser}
      />
      </Suspense>
     
    </ClientOnly>
    
  )
}

export default ListingPage