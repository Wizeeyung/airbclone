"use client"
import { BiSearch } from "react-icons/bi"
import { openSearchModal } from "@/lib/features/searchModal/searchModalSlice"
import { useAppDispatch } from "@/lib/hooks"
import { useSearchParams } from "next/navigation"
import useCountries from "@/lib/useCountries"
import { useMemo } from "react"
import { differenceInDays } from "date-fns"

const Search = () => {

  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const {getByValue} = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(()=>{
    if(locationValue){
      return getByValue(locationValue as string)?.label;
    }

    return 'Anywhere'
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(()=>{
    if(startDate && endDate){
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      let diff = differenceInDays(end, start);

      if(diff === 0){
        diff = 1
      }

      return `${diff} Days`
    }

    return 'Any Week'
  } ,[startDate, endDate]);

  const guestLabel = useMemo(()=>{
    if(guestCount){
      return `${guestCount} Guests`
    }
  }, [guestCount])



  return (
    <div onClick={()=>dispatch(openSearchModal())} className="border-[1px] w-50% md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className=" flex items-center justify-between">
        <div className="text-sm font-semibold px-6">
            {locationLabel}
        </div>
        <div className="hidden lg:block text-sm font-semibold px-6 border-x-[1px] flex-1">
          {durationLabel}

        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block"> {guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white"><BiSearch size={18}/></div>
        </div>

      </div>
    </div>
  )
}

export default Search