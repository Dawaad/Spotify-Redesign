import React from "react";
import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
function ProfileTag() {
  const { data: session } = useSession();
  return (
    <header className="absolute top-5 right-8 z-10 space-y-3">
      <div className="flex items-center bg-zinc-900 space-x-3 bg-opacity-90 hover:bg-opacity-80 rounded-full cursor-pointer text-white p-1 pr-2">
        <img
          className="rounded-full w-10 h-10"
          src={session?.user?.image as string}
          alt="Profile Image"
        />
        <h2 className="hidden md:block">{session?.user?.name}</h2>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
      <div className="text-zinc-200 bg-zinc-900 bg-opacity-90 rounded-lg p-1 space-x-2 list-none">
        
        <li
         onClick={() => {
          signOut()}}
         className=" grid grid-cols-2 p-2 hover:bg-zinc-700 hover:bg-opacity-80 rounded-lg">
          <p>Logout</p>
          <div className="flex items-center justify-end">
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
          </div>
        </li>
      </div>
    </header>
  );
}

export default ProfileTag;
