import React from 'react'
import {Image} from "@nextui-org/react";
import dynamic from 'next/dynamic';

// Dynamically import the UserfypClient component with no SSR
const UserfypClient = dynamic(() => import('./UserfypClient'), {ssr: false});

export default function Userfyp({userImage, userName}) {
    return (

        <div className='w-auto flex justify-center '>
            <UserfypClient userImage={userImage} userName={userName}/>
        </div>

    )
}
