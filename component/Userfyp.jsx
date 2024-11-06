import React from 'react'
import { Image } from "@nextui-org/react";
import dynamic from 'next/dynamic';

// Dynamically import the UserfypClient component with no SSR
const UserfypClient = dynamic(() => import('./UserfypClient'), { ssr: false });

export default function Userfyp  () {
  return (
   
    <div className='w-auto lg:border border-black flex justify-center '>
    <UserfypClient />
    </div>

  )
}
