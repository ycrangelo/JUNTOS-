import React from 'react'
import {auth, signOut} from'../../auth'
import { redirect } from 'next/navigation'
export default async function page() {
 
 const session = await auth()
 if(!session) return redirect('/login')
  return (
    <>
      <div className='min-w-max min-h-screen flex items-center justify-center'>
      <div className='w-[60%] min-h-screen  border border-red-800'>
      
      </div>
      </div>
    </>
  )
}


// div>page
    
//       <form
//       action={async () => {
//         "use server"
//         await signOut("google")
//       }}
//     >
//       <button type="submit">signOut with Google</button>
//     </form>
//     </div> 