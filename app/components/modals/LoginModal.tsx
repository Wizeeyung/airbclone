"use client"

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { closeModalLogin,openModalLogin } from "@/lib/features/loginModal/loginModalSlice";
import { closeModal, openModal } from "@/lib/features/registerModal/registerModalSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { registerValidation } from "@/lib/validation/formValidationSchema";
import toast from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { signInSuccess } from "@/lib/features/user/userSlice";

const LoginModal = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state)=> state.registerModal.isOpen)
  const loginIsOpen = useAppSelector((state)=> state.loginModal.isOpen)
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FieldValues>({
    defaultValues:{
      email: '',
      password: ""
    }
  });

  //the data is coming from the fieldvalues which are name,email,password
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    
    //using the credentials from next/auth
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback)=>{
      setIsLoading(false);
  

      if(callback?.ok){
        dispatch(signInSuccess(data))
        toast.success('Login Successfull')
        router.refresh();
        dispatch(closeModalLogin());
      }

      if(callback?.error){
        toast.error(callback.error)
      }
    })
    
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
        title="Welcome back"
        subtitle= "Login to your account"
        center
      />

      <Input 
        id="email"
        type="text"
        label="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={registerValidation.email}
        
      />

      {/* <Input 
        id="name"
        type="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={registerValidation.name}
      /> */}

      <Input 
        id="password"
        type="password"
        label="password"
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
        onClick={()=>{}}
      />

      <div className="flex justify-center items-center gap-2">
        <div>
          Already have an account?
        </div>
        <div onClick={()=> dispatch(closeModalLogin())} className="text-neutral-800 cursor-pointer hover:underline">
          Log in
        </div>
      </div>

    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginIsOpen}
      title="Login"
      actionLabel="Continue"
      onClose={()=>{
        dispatch(closeModalLogin());
      }}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal;