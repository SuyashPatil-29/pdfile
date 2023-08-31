"use client"

import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

const handleLogout = () => {
    signOut()
    redirect("/")
  }

const LogoutButton = () => {
  return (
    <Button variant="link" className='text-white text-3xl' onClick={handleLogout}>Logout</Button>
  )
}

export default LogoutButton