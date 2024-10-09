"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { openModalLogin } from "@/lib/features/loginModal/loginModalSlice";
import { openModal } from "@/lib/features/registerModal/registerModalSlice";
import { useAppDispatch } from "@/lib/hooks";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { signOutSuccess } from "@/lib/features/user/userSlice";
import { openModalRent } from '@/lib/features/rentModal/rentModalSlice'
import toast from "react-hot-toast";
import { resetForm } from "@/lib/features/rentForm/rentFormSlice";
import { useRouter } from "next/navigation";

interface userMenuProps{
  currentUser: SafeUser | null | undefined;
}


const UserMenu: React.FC<userMenuProps> = ({currentUser}) => {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLDivElement>(null); // Ref for the toggle button

  const toggleOpen = useCallback(()=>{
    setIsOpen((value) => !value)
  }, [])

  // const toggleOpen = () =>{
  //   setIsOpen(!isOpen)
  // }

  const onRent = useCallback(()=>{
    if(!currentUser){
      return dispatch(openModalLogin())
    }

    dispatch(openModalRent())
  },[dispatch, currentUser]);

  const handleLogout = async () => {
    try {
      await signOut();  // Await the signOut call to ensure logout completes
      dispatch(signOutSuccess());
      dispatch(resetForm());
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("An error occurred while logging out");
    }
  };


  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node) // Ensure the click is not on the menu button
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 border-[1px] rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>
        <div ref={menuButtonRef} onClick={toggleOpen} className="flex items-center gap-2 border-[1px] px-4 rounded-full py-2 hover:bg-neutral-100 transition cursor-pointer">
          <IoMdMenu />
          <div className="">
            <Avatar />
          </div>
        </div>

        {isOpen && (
          <div 
            ref={menuRef} // Attach the ref to the menu container
            className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
              <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                  <>
                    <MenuItem onClick={()=> router.push('/trips')} label="My Trips"/>
                    <MenuItem onClick={()=> router.push('/favorites')} label="My Favorites"/>
                    <MenuItem onClick={()=> router.push('/properties')} label="My Properties"/>
                    <MenuItem onClick={()=> router.push('/reservations')} label="My Reservations"/>
                    <MenuItem onClick={()=>{dispatch(openModalRent())}} label="Airbnb my home"/>
                    <hr />
                    <MenuItem onClick={handleLogout} label="Logout"/>
                  </>
                ): (
                  <>
                    <MenuItem onClick={()=>{dispatch(openModalLogin())}} label="Login"/>
                    <MenuItem onClick={()=>{dispatch(openModal())}} label="Sign up"/>
                  </>
                )}
                
              </div>
          </div>
        )}
        
      </div>
      
    </div>
  )
}

export default UserMenu