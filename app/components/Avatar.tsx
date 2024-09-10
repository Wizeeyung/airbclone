import Image from "next/image"


const Avatar = () => {
  return (
    <Image 
        src="/images/avatar.jpg"
        alt="avatar"
        className="w-full h-full rounded-full"
        width="30"
        height="30"
    />
  )
}

export default Avatar;