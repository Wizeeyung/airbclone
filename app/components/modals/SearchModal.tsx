"use client"

import React, { useCallback, useMemo, useState } from 'react'
import { openSearchModal, closeSearchModal } from '@/lib/features/searchModal/searchModalSlice'
import Modal from './Modal'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import qs from 'query-string';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {formatISO} from 'date-fns'
import Heading from '../Heading'
import Calendar from '../inputs/Calendar'

enum STEPS{
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}


const SearchModal = () => {

  const searchOpen = useAppSelector((state)=> state.searchModal.isOpen)
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(()=> dynamic(()=> import('../Map'), {
    ssr: false
  }), [location]);

  const onBack = useCallback(()=> {
    setStep((value) => value - 1)
  }, [])

  const onNext = useCallback(()=>{
    setStep((value)=> value + 1)
  }, []);

  const onSubmit = useCallback(async()=>{
    if(step !== STEPS.INFO){
      return onNext();
    }

    let currentQuery = {};

    if(params){
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    }

    if(dateRange.startDate){
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if(dateRange.endDate){
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, {skipNull: true});

    setStep(STEPS.LOCATION);
    dispatch(closeSearchModal());
    router.push(url);
  }, [location, router,dispatch,guestCount, roomCount, bathroomCount, params, step, dateRange, onNext]);

  const actionLabel = useMemo(()=>{
    if(step === STEPS.INFO){
      return 'Search'
    }

    return 'Next'
  },[step]);

  const secondaryActionLabel = useMemo(()=>{
    if(step === STEPS.LOCATION){
      return undefined;
    }

    return 'Back'
  },[step])

  
  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading 
        title='Where do you want to go?'
        subtitle='Find the perfect location!'
      />

      <CountrySelect 
        value={location}
        onChange={(value)=> setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng}/>

    </div>
  )
  

  if(step === STEPS.DATE){
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />

        <Calendar 
          value={dateRange}
          onChange={(value)=> setDateRange(value.selection)}
        />

      </div>
    )
  }

  return (
    <Modal 
      isOpen={searchOpen}
      onClose={()=>dispatch(closeSearchModal())}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  )
}

export default SearchModal