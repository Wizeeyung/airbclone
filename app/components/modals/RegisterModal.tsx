"use client"

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { closeModal, openModal } from "@/lib/features/registerModal/registerModalSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Modal from "./Modal";

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
      Password: ""
    }
  });

  //the data is coming from the fieldvalues which are name,email,password
  const onSubmit: SubmitHandler<FieldValues> = (data)=>{
    setIsLoading(true);

    axios.post('/api/auth/register', data).then(()=>{

    }).catch((error)=>{
      console.log(error);
    }).finally(()=>{
      setIsLoading(false);
    })
  }

  return (
    <Modal 
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={()=>{
        dispatch(closeModal());
      }}
    />
  )
}

export default RegisterModal