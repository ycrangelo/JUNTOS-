import React from 'react'
import {auth, signOut} from'../../auth'
import { redirect } from 'next/navigation'
import Navbar from '../../component/Navbar'
import Userfyp from '../../component/Userfyp'
import AddPostUi from '../../component/AddPostUi'
export default async function page() {
 
 const session = await auth()
 if(!session) return redirect('/login')
  return (
    <>
      <div className='min-w-max min-h-screen flex items-center justify-center'>
      <div className='lg:w-[60%] min-h-screen w-screen border-x'>
          <Navbar />
          <Userfyp />
          <AddPostUi/>
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