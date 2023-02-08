import React from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
function ProfileTag() {
    const {data:session} = useSession()
  return (
    <header className="absolute top-5 right-8 z-10">
    <div className="flex items-center bg-zinc-900 space-x-3 bg-opacity-90 hover:bg-opacity-80 rounded-full cursor-pointer text-white p-1 pr-2">
      
      <img
        className="rounded-full w-10 h-10"
        src={session?.user?.image as string}
        alt="Profile Image"
      />
      <h2 className='hidden md:block'>{session?.user?.name}</h2>
      <ChevronDownIcon className="w-5 h-5" />
    </div>
  </header>
  )
}

export default ProfileTag