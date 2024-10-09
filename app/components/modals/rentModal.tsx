"use client"

import React, { lazy, Suspense,useEffect,useMemo, useState } from 'react'
import Modal from './Modal'
import { closeModalRent } from '@/lib/features/rentModal/rentModalSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Heading from '../Heading'
import { categories } from '@/lib/data'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../inputs/CountrySelect'
import { LoaderCategoryInput } from '../Loading'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { registerValidation } from '@/lib/validation/formValidationSchema'
import { RentFormState, setFieldValue,resetForm } from '@/lib/features/rentForm/rentFormSlice'


const CategoryInput = lazy(()=> import('../inputs/CategoryInput'))


enum STEPS {
  CATEGORY =0,
  LOCATION = 1,
  INFO=2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}


const RentModal = () => {

  const router = useRouter();
  const dispatch = useAppDispatch()
  const openRent = useAppSelector((state)=> state.rentModal.isOpen)
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [error, setError] =useState(false);
  const formData = useAppSelector((state)=> state.rentForm)
  const [isLoading, setIsLoading] = useState(false);

  const {
    register, handleSubmit, setValue,watch,
    formState:{
      errors
    },
    reset
  } = useForm<FieldValues>({
    defaultValues:{
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });

  //trying to use the category details to get data from the form
  // const category = watch('category');
  // Watch form values (updates UI)
  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
  const price = watch('price');
  const title = watch('title');
  const description = watch('description');
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { id, value } = e.target;

  // Apply lowercase transformation only for the email field
  const updatedValue = id === "email" ? value.toLowerCase() : value;
  // Set the updated value in Redux and form state
  setCustomValue(id as keyof RentFormState, updatedValue);
};


  //cause react-leaflet might not support fully we have to import map in some kind of ways to make it work
  const Map = useMemo(()=> dynamic(()=>import('../Map'),{
    ssr: false
  }),[location]);
  
  // Sync form with Redux state on mount
  useEffect(() => {
    reset(formData); // Reset form with Redux state values
  }, [formData, reset]);

  const setCustomValue = (id: keyof RentFormState, value: any) =>{
    setError(false);
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })

    dispatch(setFieldValue({ field: id, value }));
  }

  const previous = () =>{
    setStep((prevStep) => prevStep - 1);
  }

  const next = () =>{
    if(category === ''){
     setError(true)
      return;
    }
    
    setStep((prevStep) => prevStep + 1)
  }


  const onSubmit: SubmitHandler<FieldValues> = (data) =>{
    if(step !== STEPS.PRICE){
      return next();
    }

    console.log(data, 'data')
    setIsLoading(true);
   

    axios.post('api/listings', data).then(()=>{
      toast.success('Listing Created!!');
      router.refresh();
      //coming from react hook form to reset the entire form
      reset()
      setStep(STEPS.CATEGORY)
      dispatch(closeModalRent());
      dispatch(resetForm());
    }).catch(()=>{
      toast.error('An error occurred, Please try again');
    }).finally(()=>{
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(()=>{
    if(step === STEPS.PRICE){
      return 'Create'
    }

    return 'Next'
  },[step])

  const secondaryActionLabel = useMemo(()=>{
    if(step === STEPS.CATEGORY){
      return undefined;
    }
    return 'Back'
  },[step])

  //instead of const bodyContent its going to be let because its going to be a changeable variable
  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='Which of these best describes your place?'
      subtitle='Pick a category'
      />
      {error && <p className='text-red-800'>You must select a Category!!!</p> }
      <div className='grid   grid-cols-2 gap-3 max-h-[40vh]   sm:max-h-[50vh] overflow-y-auto'>
        {categories.map((item)=>(
          <Suspense key={item.label} fallback={<LoaderCategoryInput/>}>

              <div className='col-span-1'>
              <CategoryInput 
                onClick={(category)=>{setCustomValue('category', category)}}
                label={item.label}
                icon={item.icon}
                selected={category === item.label}
              />
              </div>
          </Suspense>
        ))}
      </div>

    </div>
  )

  //this is the reason why we used let for body content cause the content changes
  if(step === STEPS.LOCATION){
    bodyContent= (
      <div className='flex flex-col gap-8'>
        <Heading 
          title='Where is your place located?'
          subtitle='Help guests find you'
        />
        <CountrySelect value={location} onChange={(value)=> setCustomValue('location', value)}/>
        <Map center={location?.latlng}/>
      </div>
    )
  }

  if(step === STEPS.INFO){
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title='Share some basics about your place'
          subtitle='What amenities do you have?'
        />

        <Counter 
          title='Guests'
          subtitle='How many guests do you allow?'
          value={guestCount}
          onChange={(value)=> setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter 
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={(value)=> setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter 
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={(value)=> setCustomValue('bathroomCount', value)}
        />

      </div>
    )
  };


  if (step === STEPS.IMAGES){
    bodyContent= (
      <div className='flex flex-col gap-8'>
          <Heading 
            title='Add a photo of your place'
            subtitle='show guest what your place looks like'
          />
          <ImageUpload 
            value={imageSrc}
            onChange={(value)=> setCustomValue('imageSrc', value)}
          />
      </div>
    )
  };


  if(step === STEPS.DESCRIPTION){
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title='How would you describe your place?'
          subtitle='Short and sweet works best'
        />
        <Input 
          id='title'
          label='Title'
          value={title}
          required
          disabled={isLoading}
          register={register}
          errors={errors}
          validate={registerValidation.title}
          handleChange={handleChange}
        />
        <hr />

        <Input 
          id='description'
          label='Description'
          required
          value={description}
          disabled={isLoading}
          register={register}
          errors={errors}
          validate={registerValidation.description}
          handleChange={handleChange}
        />

      </div>
    )
  };


  if(step === STEPS.PRICE){
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title='Now, set your price'
          subtitle='How much do you charge per night?'
        />
        <Input 
          id='price'
          label='Price'
          type='number'
          formatPrice
          value={price}
          required
          disabled={isLoading}
          register={register}
          errors={errors}
          handleChange={handleChange}
        />

      </div>
    )
  }


  return (
    <Modal 
    title='Airbnb your home'
    isOpen={openRent}
    onClose={()=>dispatch(closeModalRent())}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : previous}
    body={bodyContent}
    onSubmit={handleSubmit(onSubmit)}
    
    />
  )
}

export default RentModal