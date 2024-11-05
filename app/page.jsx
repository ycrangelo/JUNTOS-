import Image from "next/image";
import {auth, signOut} from'../auth'
import { redirect } from 'next/navigation'

export default async function Home() {
   const session = await auth()
   console.log(session)
   if (!session) return redirect('/login') 
   if(session) return redirect('/feeds')
  return (
    <>
    </>
  );
}
