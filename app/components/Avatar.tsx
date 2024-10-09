import Image from "next/image"
import React from "react"

interface AvatarProps{
  src?: string | null
}

const Avatar:React.FC<AvatarProps> = ({src}) => {
  return (
    <Image 
        src={`${src || '/images/avatar.jpg'} `}
        alt="avatar"
        className="w-[30] h-[30] rounded-full"
        width="30"
        height="30"
    />
  )
}

export default Avatar;