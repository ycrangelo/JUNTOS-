import React from 'react'
import {User} from "@nextui-org/react";
import { signOut, auth } from "../auth"
import {Button} from "@nextui-org/react";

export default async function Navbar() {
 const session = await auth()
 const userAvatar = await session.user?.image
 const userName = await session.user?.name
 console.log(userAvatar)
  return (
   <>
    <div className='w-auto border-b lg:p-3 p-2 flex justify-between'>
     <User   
      name={userName}
      avatarProps={{
        src: {userAvatar}
      }}
     />
     <div>
       <form
        action={async () => {
          "use server"
          await signOut("google")
        }}
      >
       <Button type='submit' color="danger">
        Logout
      </Button> 
      </form>
       
     </div>
    </div>

   </>
  )
}

