"use client"

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {  useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { closeModal } from "@/lib/features/registerModal/registerModalSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { registerValidation } from "@/lib/validation/formValidationSchema";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state)=> state.registerModal.isOpen)
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FieldValues>({
    defaultValues:{
      name: '',
      email: '',
      password: ""
    }
  });

  //the data is coming from the fieldvalues which are name,email,password
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      // Send the POST request
      const response = await axios.post('/api/register', data);
  
      // Close the modal after successful registration
      dispatch(closeModal());
      
      // Optionally handle the response
      console.log(response.data); 
    } catch (error: any) {
      // Check if the error response exists and display an appropriate message
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        // Fallback for unexpected errors
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      // Always set loading to false after the request completes, whether successful or not
      setIsLoading(false);
    }
  };
  
  
  // const onSubmit: SubmitHandler<FieldValues> = (data)=>{
  //   setIsLoading(true);
  //   console.log(data)

  //   axios.post('/api/register', data).then(()=>{
  //       dispatch((closeModal()))
  //   }).catch((error)=>{
  //     toast.error(error.message)
  //     // console.log(error);
  //   }).finally(()=>{
  //     setIsLoading(false);
  //   })
  // };


  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Welcome to Airbnb"
        subtitle= "Create an account!"
        center
      />

      <Input 
        id="email"
        type="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={registerValidation.email}
        
      />

      <Input 
        id="name"
        type="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={registerValidation.name}
      />

      <Input 
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={registerValidation.password}
      /> 
    </div>
  );


  const footerContent =(
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline
        label="Continue with google"
        icon={FcGoogle}
        onClick={()=>{}}
      />

      <Button 
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={()=>signIn('github')}
      />

      <div className="flex justify-center items-center gap-2">
        <div>
          Already have an account?
        </div>
        <div onClick={()=> dispatch(closeModal())} className="text-neutral-800 cursor-pointer hover:underline">
          Log in
        </div>
      </div>

    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={()=>{
        dispatch(closeModal());
      }}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal