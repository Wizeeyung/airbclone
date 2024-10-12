import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {PuffLoader} from 'react-spinners'

export const Loading = () => {
  return (
    <div  className={
      `flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition
      cursor-pointer 
      
      `
    }>
      <Skeleton className="w-6 h-6 rounded-full" />
      <Skeleton className="w-16 h-4 mt-2" />
      

    </div>
  )
}

export const LoaderCategoryInput = ()=>{
  return(
    <div 
    className={
      `rounded-xl border-2 p-4 flex flex-col gap-3 
      transition cursor-pointer bg-neutral-100  
        border-neutral-300
     
      `
    }>
      <Skeleton className="w-6 h-6 rounded-full" />
      <Skeleton className="w-16 h-4 mt-2" />

    </div>
  )

}


export const ListingSkeleton = () => {
  return (
    <div className="col-span-1 cursor-pointer group">
      {/* Container for the entire listing card */}
      <Skeleton className="flex flex-col gap-2 w-full border-black/20 border rounded-xl" />
        {/* Image and favorite button section */}
        <Skeleton className="aspect-square w-full relative overflow-hidden rounded-xl" />
          <Skeleton
            className="
              object-cover
              h-[50%]
              w-full
              group-hover:scale-110
              transition
            "
          /> 
          {/* Favorite button */}
          <Skeleton className="absolute top-3 right-3 h-3 w-3" />
        

        {/* Body content of the listing card */}
        <Skeleton className="pl-2 pt-2 flex flex-col gap-1">
          <Skeleton className="font-bold text-lg h-2 w-[50%]" /> {/* Title */}
          <Skeleton className="font-light text-neutral-500 h-2 w-[60%]" /> {/* Subtitle */}
          
          {/* Price section */}
          <Skeleton className="flex items-center gap-1">
            <Skeleton className="font-semibold h-2 w-[70%]" /> {/* Price */}
            <Skeleton className="font-light w-[80%] h-2" /> {/* Price details */}
          </Skeleton>
        </Skeleton>
      
    </div>
  );
};



export const ListingClientSkeleton = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-6">
        {/* Skeleton for the ListingHead */}
        <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
        <Skeleton className="h-10 w-[60%]" />
        <Skeleton className="h-5 w-[30%]" />

        {/* Skeleton for the grid */}
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          {/* Skeleton for ListingInfo */}
          <div className="col-span-4">
            <Skeleton className="h-7 w-[80%]" />
            <Skeleton className="h-5 w-[90%]" />
            <Skeleton className="h-5 w-[70%]" />
            <Skeleton className="h-5 w-[60%]" />
            <Skeleton className="h-5 w-[50%]" />
          </div>

          {/* Skeleton for ListingReservation */}
          <div className="order-first mb-10 md:order-last md:col-span-3">
            <Skeleton className="h-10 w-[80%]" />
            <Skeleton className="h-10 w-[60%]" />
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-10 w-[70%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Loader = () =>{
  return(
    <div className='h-[70vh] flex flex-col justify-center items-center'>
        <PuffLoader
        color="red"
        loading
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="mr-2"
      />
    </div>
  )
}



