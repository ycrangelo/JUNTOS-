
import { redirect } from 'next/navigation'
import { auth } from '../../auth'
import AddPostUi from '../component/AddPostUi'
import Navbar from '../component/Navbar'
import Userfyp from '../component/Userfyp'
export default async function page() {
 
  const session = await auth()
  if (!session) return redirect('/login')
  const emailto =await session.user.email
  return (
    <>
      <div className='min-w-max min-h-screen flex items-center justify-center'>
      <div className='lg:w-[60%] min-h-screen w-screen border-x'>
          <Navbar />
          <Userfyp />
          <AddPostUi email={emailto}/>
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