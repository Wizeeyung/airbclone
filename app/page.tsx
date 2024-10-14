export const dynamic = 'force-dynamic'

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings, { IListingParams } from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";
import { lazy, Suspense } from "react";
import { ListingSkeleton } from "./components/loading";

const ListingCard = lazy(()=> import('./components/listings/ListingCard'))

interface HomeProps{
  searchParams: IListingParams
}

//since home is a server component by default, we can call the database directly without an api call, and also add async to the home function
const Home = async ({searchParams} : HomeProps) => {

  const listings = await getListings(searchParams);
  //dont forget to use await
  const currentUser  = await getCurrentUser();
  

  if(listings.length === 0){
    return(
      //using client only so it doesnt mess with hydration error
      <ClientOnly>
        <EmptyState showReset/>

      </ClientOnly>
    )
  }


  return (
    <ClientOnly>
      <Container>
        <div className="pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        ">
          {listings.map((listing)=>(
            <Suspense key={listing.id}  fallback={<ListingSkeleton />}>
            <ListingCard 
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
            </Suspense>
          ))}
        </div>
        
        
      </Container>
    </ClientOnly>
  );
}

export default Home
