import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {toast} from 'react-hot-toast';

import { SafeUser } from '@/app/types';
import { openModalLogin } from './features/loginModal/loginModalSlice';
import { useAppDispatch } from './hooks';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}


const useFavorite = ({
  listingId,
  currentUser
}: IUseFavorite) =>{

  const router = useRouter();
  const dispatch = useAppDispatch();

  const hasFavorited = useMemo(()=>{
    //use operator incase there is no current user or favoriteid array
    const list = currentUser?.favoriteIds || []
    console.log(list, 'listt')
    return list.includes(listingId)
  }, [currentUser,listingId]);

  console.log(hasFavorited, 'hass')


  const toggleFavorite = useCallback(async (
    e: React.MouseEvent<HTMLDivElement>
  )=>{
    e.stopPropagation();

    if(!currentUser){
      return dispatch(openModalLogin());
    }

    try{
      let request;

      if(hasFavorited){
        
        request = () =>{
          return axios.delete(`/api/favorites/${listingId}`)
        }
      }else{
        request = () =>{
          
          return axios.post(`/api/favorites/${listingId}`)
        }
      }

      await request();

      // Show success toast after the request has succeeded
    if (hasFavorited) {
      toast.success('Removed from favorite');
    } else {
      toast.success('Added to favorite');
    }
      router.refresh()
      
    }catch(error){
      toast.error('Something went wrong')
    }
  },[currentUser, dispatch,hasFavorited,listingId,router]);


  return {
    hasFavorited,
    toggleFavorite
  }
}

export default useFavorite;