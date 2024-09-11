"use client"
import Image from "next/image";
import { useCallback, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { closeModal, openModal } from "@/lib/features/registerModal/registerModalSlice";
import { useAppDispatch } from "@/lib/hooks";

const UserMenu = () => {

  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(()=>{
    setIsOpen((value) => !value)
  }, [])

  // const toggleOpen = () =>{
  //   setIsOpen(!isOpen)
  // }


  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div onClick={(e)=>{console.log(e)}} className="hidden md:block text-sm font-semibold py-3 px-4 border-[1px] rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>
        <div onClick={toggleOpen} className="flex items-center gap-2 border-[1px] px-4 rounded-full py-2 hover:bg-neutral-100 transition cursor-pointer">
          <IoMdMenu />
          <div className="">
            <Avatar />
          </div>
        </div>

        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={()=>{dispatch(openModal())}} label="Login"/>
                <MenuItem onClick={()=>{}} label="Sign up"/>
              </div>
          </div>
        )}
        
      </div>
      
    </div>
  )
}

export default UserMenu