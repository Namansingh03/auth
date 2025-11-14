"use client"

import React from 'react'
import { FaGoogle , FaGithub } from "react-icons/fa"
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

const SocialsForm = () => {
  return (
    <div className='w-full flex items-center flex-row gap-x-5 p-x-5'>
      <Button className='w-45 border border-slate-600 hover:bg-slate-300' variant={'outline'} onClick={() => signIn("google")}>
        <FaGoogle/>
      </Button>
      <Button className= 'w-45 border border-slate-600 hover:bg-slate-300' variant={'outline'} onClick={() => signIn("github")}>
        <FaGithub/>
      </Button>
    </div>
  )
}

export default SocialsForm