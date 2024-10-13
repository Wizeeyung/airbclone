import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";


//we are using this function in the layout page cause its a server component by default
export async function getSession(){
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
  try{
    const session = await getSession();
    console.log(session, 'session')
    if(!session?.user?.email){
      return null;
    }

    const currentUser = await prisma?.user.findUnique({
      where:{
        email: session.user.email as string
      }
    });

    if(!currentUser){
      return null;
    }

    //because we have to avoid hydration error during production we convert date object to stric and use types to safe the changed variables
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString()
    }
    // return currentUser;

  }catch(error:any){
    return null;
  }
}