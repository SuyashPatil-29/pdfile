import Navbar from '@/components/app_components/Navbar'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'
import {redirect} from "next/navigation"

async function HomePage() {
  const session = await getServerSession(authOptions)
  console.log(session);

  if(!session?.user){
    redirect("/")
  }
  
  return (
    <div className='bg-black h-screen w-screen'>
        <Navbar />
        <h1 className='text-white text-center text-[40px] uppercase'>WELCOME {session?.user.username || session?.user.name} TALK TO YOUR PDF</h1>
    </div>
  )
}

export default HomePage