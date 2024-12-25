import { Button, User } from "@nextui-org/react";
import { auth, signOut } from "../../auth";
import Link from 'next/link'
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";

export default async function Navbar() {
 const session = await auth()
const userAvatar =await String(session.user?.image);
 const userName = await session.user?.name
 console.log(userAvatar)
  return (
   <>
    <div className='w-auto sticky top-0 border-b lg:p-3 p-2 flex justify-between'>
       
        <Popover
          backdrop="blur"
            showArrow
          placement="right">
              <PopoverTrigger>
     <User
      name={userName}
      avatarProps={{
        src:userAvatar
      }}
      
              />
            </PopoverTrigger>
              <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny">This is the popover content</div>
        </div>
      </PopoverContent>
            </Popover>
        
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