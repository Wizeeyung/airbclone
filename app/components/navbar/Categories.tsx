"use client"
import React, { lazy, Suspense } from 'react'
import Container from '../Container'
import { usePathname, useSearchParams } from 'next/navigation'
import { Loading } from '../Loading'
import { categories } from '@/lib/data'


const CategoryBox = lazy(()=> import('../CategoryBox'))




const Categories = () => {

  const params = useSearchParams();
  const category = params.get('category');
  const pathname = usePathname();
  
  const isMainPage = pathname === '/';
  if(!isMainPage){
    return null;
  }


  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
      {
          categories.map((item)=>(
            <Suspense key={item.label} fallback={<Loading/>}>
               <CategoryBox 
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
              
            />
            </Suspense>
           
          ))
        }
      
      </div>

    </Container>
  )
}

export default Categories