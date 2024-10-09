"use client"

import React, { useCallback, useMemo, useState } from 'react'
import { openSearchModal, closeSearchModal } from '@/lib/features/searchModal/searchModalSlice'
import Modal from './Modal'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import { CountrySelectValue } from '../inputs/CountrySelect'

enum STEPS{
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}


const SearchModal = () => {

  const searchOpen = useAppSelector((state)=> state.searchModal.isOpen)
  const dispatch = useAppDispatch()

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

  return (
    <Modal 
      isOpen={searchOpen}
      onClose={()=>dispatch(closeSearchModal())}
      onSubmit={openSearchModal}
      title='Filters'
      actionLabel='Search'
    />
  )
}

export default SearchModal