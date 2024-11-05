import React from 'react'
import {auth, signOut} from'../../auth'
import { redirect } from 'next/navigation'
export default async function page() {
 
 const session = await auth()
 if(!session) return redirect('/login')
  return (
    <>
      <div>
<div>page
    
      <form
      action={async () => {
        "use server"
        await signOut("google")
      }}
    >
      <button type="submit">signOut with Google</button>
    </form>
    </div> 
      </div>
    </>
  )
}


