import React, { useEffect, useState } from "react";
import ProfileTag from "../User/ProfileTag";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { colors } from "../../lib/colours";
import { shuffle } from "lodash";
function Header() {
  const [search, setSearch] = useState<string | null>();
  const [colour, setColour] = useState<string>();
  useEffect(() => {
    setColour(shuffle(colors).pop() as string);
  }, []);

  return (
    <div>
      <div
        className={` w-full max-h-[8rem] py-6 pb-10 px-6 flex items-center `}
      >
        <form className="w-full" action={`/search/${search}`}>
          <div className="flex items-center text-zinc-200 focus-within:text-zinc-400 transition-all duration-500">
            <MagnifyingGlassIcon className="w-5 h-5 translate-x-7  pointer-events-none" />
            <input
              type="text"
              onChange={(e) => {
                e.target.value.trim()
                  ? setSearch(e.target.value)
                  : setSearch(null);
                console.log(search);
              }}
              className="max-w-[18rem] md:max-w-xs placeholder-zinc-300 w-full rounded-lg pr-3 pl-10 py-2 font-semibold bg-zinc-800 bg-opacity-[0.25] text-zinc-200 border-none focus:outline-none transition-all duration-500 outline-zinc-200"
              placeholder="Search"
            />
          </div>
        </form>
        <ProfileTag />
      </div>
      <div className="flex justify-center">

        <div className="relative w-full h-[0.125rem]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-400 bg-no-repeat bg-left"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
