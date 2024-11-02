
import { signIn, auth } from "../../auth"
import { redirect } from 'next/navigation'
 
export default async function SignIn() {
 const session = await auth()
 console.log(session)
  if(session) return redirect('/feeds')
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 