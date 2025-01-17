import {redirect} from 'next/navigation'
import {auth} from '../../auth'
import AddPostUi from '../component/AddPostUi'
import Navbar from '../component/Navbar'
import Userfyp from '../component/Userfyp'

export default async function page() {

    const session = await auth()
    if (!session) return redirect('/login')
    const emailto = await session.user.name
    const userImage = await session.user.image
    return (
        <>
           
                    <Userfyp userImage={userImage} userName={emailto}/>
              
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