
import { signIn, auth } from "../../auth"
import { redirect } from 'next/navigation'
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";


export default async function SignIn() {
  const session = await auth()
  console.log(session)
  
  async function createPost() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/database/user/post/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: session.user.email,
            name: session.user.name,
        }),
    });

    const data = await response
    console.log(data);
}

  // If session exists, store email and create post, then redirect
  if (session) {
    await createPost(); // Create the post
    return redirect('/feeds'); // Redirect to the feeds page
  }
  return (
    <>
      <div className="min-w-max min-h-screen flex flex-col items-center gap-4 justify-center ">
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



