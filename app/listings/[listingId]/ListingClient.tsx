"use client"

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import Categories from '@/app/components/navbar/Categories';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { categories } from '@/lib/data';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { openModalLogin } from '@/lib/features/loginModal/loginModalSlice';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from 'date-fns';
import { useAppDispatch } from '@/lib/hooks';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { Range } from 'react-date-range';

const initialDateChange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingClientProps{
  reservations?: SafeReservation[];
  //we using and cause we returned listing and user in the getListing server action
  listing: SafeListing & {
    user: SafeUser
  };
  currentUser?: SafeUser | null

}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [] //make sure you set reservation to an empty array to avoid errors.
}) => {

  const router = useRouter();

  const disabledDates = useMemo(()=>{
    let dates: Date[] = [];

    reservations.forEach((reservation)=>{
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range]
    });

    return dates;
  },[reservations]);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateChange)

  const onCreateReservation = useCallback(()=>{
    if(!currentUser){
      return dispatch(openModalLogin())
    }

    setIsLoading(true);

    axios.post('/api/reservations',{
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    }).then(()=>{
      toast.success('listing reserved');
      setDateRange(initialDateChange);

      //redirect to trips
      router.push('/trips');
      router.refresh()
    }).catch(()=>{
      toast.error('error creating reservation');
    }).finally(()=>setIsLoading(false));
  }, [totalPrice, dateRange, listing?.id ,router, currentUser,dispatch]);


  useEffect(()=>{
    if(dateRange.startDate && dateRange.endDate){
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if(dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      }else{
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price]);
  
  const category = useMemo(()=>{
    return categories.find((item)=> item.label === listing.category)
  }, [listing.category]);

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead 
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo 
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              guestCount={listing.guestCount}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation 
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value)=> setDateRange(value)}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
                dateRange={dateRange}
              />
            </div>
          </div>

        </div>
      </div>
    </Container>
  )
}

export default ListingClient