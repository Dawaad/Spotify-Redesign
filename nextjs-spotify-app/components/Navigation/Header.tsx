import React, { useEffect, useState } from "react";
import ProfileTag from "../User/ProfileTag";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { colors } from "../../lib/colours";
import { shuffle } from "lodash";
function Header() {
  const [search, setSearch] = useState<string>();
  const [colour, setColour] = useState<string>();
  useEffect(() => {
    setColour(shuffle(colors).pop() as string);
  }, []);

  return (
    <div>
      <div
        className={` w-full max-h-[8rem] py-6 pb-10 px-10 flex items-center `}
      >
        <form className="w-full">
          <div className="flex items-center text-zinc-600 focus-within:text-zinc-900">
            <MagnifyingGlassIcon className="w-5 h-5 translate-x-7  pointer-events-none" />
            <input
              type="text"
              value={search}
              className="max-w-xs  w-full rounded-lg pr-3 pl-10 py-2 font-semibold text-zinc-900 border-none ring-2 ring-zinc-600 focus:ring-zinc-900 focus:ring-2"
              placeholder="Search"
            />
          </div>
        </form>
        <ProfileTag />
      </div>
      <hr className="border-t-[0.1px] border-zinc-300"/>
    </div>
  );
}

export default Header;
