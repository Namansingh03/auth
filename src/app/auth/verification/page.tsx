"use client"

import React from 'react'
import VerificationForm from '@/components/auth/verifiaction-Form/page'
import AnimatedBlobsBackground from '@/utils/animatedBlobs'

const page = () => {
  return (
    <div className='w-full h-h-screen flex items-center justify-center'>
     <AnimatedBlobsBackground/>
     <VerificationForm/>
    </div>
  )
}

export default page