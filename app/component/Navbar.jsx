import { Button, User } from "@nextui-org/react";
import { auth, signOut } from "../../auth";

export default async function Navbar() {
 const session = await auth()
const userAvatar =await String(session.user?.image);
 const userName = await session.user?.name
 console.log(userAvatar)
  return (
   <>
    <div className='w-auto border-b lg:p-3 p-2 flex justify-between'>
     <User   
      name={userName}
      avatarProps={{
        src:userAvatar
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

