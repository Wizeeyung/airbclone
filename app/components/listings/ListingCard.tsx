"use client"

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import useCountries from '@/lib/useCountries';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import {format} from 'date-fns'
import Image from 'next/image';
import HeartButton from './HeartButton';
import Button from '../Button';

interface ListingCardProps{
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  //made current user to also be null so as to fix any server error
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser
}) => {

  const router = useRouter();
  const { getByValue} = useCountries();
  const location = getByValue(data.locationValue)
  
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>)=>{
      e.stopPropagation();

      if(disabled){
        return;
      }

      onAction?.(actionId);
    },[disabled,actionId,onAction]);


  const price = useMemo(()=> {
    if(reservation){
      return reservation.totalPrice;
    }

    return data.price;
  },[reservation, data.price]);

  const reservationDate = useMemo(()=>{
    if(!reservation){
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, "PP")}`
  },[reservation]);

  return (
    <div onClick={()=> router.push(`/listings/${data.id}`)}
      className='col-span-1 cursor-pointer group '
    >
      <div className='flex flex-col gap-2 w-full border-black/20 border rounded-xl'>
        <div className='aspect-square w-full relative
          overflow-hidden rounded-xl 
        '>
          {/* Image and favorite button section */}
          <Image 
            alt='Listing'
            src={data.imageSrc}
            className='
              object-cover
              h-[50%]
              w-full
              group-hover:scale-110
              transition
            '
            width={100}
            height={50}
          />

          <div className='absolute top-3 right-3'>
            <HeartButton 
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>

          {/* body content of the listing card */}
          <div className='pl-2 pt-2 flex flex-col gap-1'>
            <div className='font-bold text-lg'>
              {location?.region}, {location?.label}
            </div>
            <div className='font-light text-neutral-500'>
              {reservationDate || data.category}
            </div>
            <div className='flex items-center gap-1'>
              <div className='font-semibold'>
                ${price}
              </div>
              {!reservation && (
                <div className='font-light'>
                  / night
                </div>
              )}
            </div>

            
          </div>
          
        </div>
        

      </div>
      {onAction && actionLabel && (
              <Button 
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
                className='w-full mt-2'
              />
            )}
      
    </div>
  )
}

export default ListingCard