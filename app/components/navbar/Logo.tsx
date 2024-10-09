"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {

  const router = useRouter()


  return (
    <Image
    onClick={()=> router.push('/')}
      alt="logo"
      className="cursor-pointer w-[70px] sm:w-[100px]"
      height="100"
      width="100"
      src="/images/airbnb.png"
      priority 
      //priority is used because it sets the image lazy loading to false to prevent it from lazy loading cause its above the fold
    />
  )
}

export default Logo;