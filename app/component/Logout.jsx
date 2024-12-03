"use server"

import React from 'react'
import { auth, signOut } from "../../auth";

export default async function Logout  ()  {
  return (
   <div>
       <form
        action={async () => {
          await signOut("google")
        }}
      >
       <Button type='submit' color="danger">
        Logout
      </Button> 
      </form>
       
     </div>
  )
}

