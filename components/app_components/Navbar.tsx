import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between w-screen h-28 bg-transparent fixed top-0 left-0 px-11'>
        <div className='flex justify-items-center items-center'>
            <Link href="/">
                <Image src="/assets/file-text-front-gradient.png" width={75} height={75} alt='LOGO'/>
            </Link>
        </div>
        <div>
            <Button variant="link" className='text-white text-3xl'>Logout</Button>
        </div>
    </div>
  )
}

export default Navbar