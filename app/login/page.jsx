
import { signIn, auth } from "../../auth"
import { redirect } from 'next/navigation'
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
 
export default async function SignIn() {
 const session = await auth()
 console.log(session)
  if(session) return redirect('/feeds')
  return (
    <>
      <div className="flex flex-col items-center gap-4 justify-center w-dvw min-h-dvh border border-red-800">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-9xl">
            JUNTOS
          </h1>
          <p className="font-light">Where Every Connection Matters.</p>
        </div>
        <div>
             <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
      <Button type="submit" color="default" radius="sm" size="lg" variant="flat" endContent={<FcGoogle />}>
        Continue with
      </Button> 
      </form>
        </div>  
      </div>
    </>
  )
} 



