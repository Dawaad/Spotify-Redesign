import Link from "next/link";
import React from "react";

function Playlist({
  playlist,
  index,
}: {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  index: number;
}) {
  return (
    <Link
      className={` group pb-1 w-1/2 sm:1/3   justify-center h-64 rounded-md bg-zinc-800 bg-opacity-80 hover:bg-neutral-700 hover:bg-opacity-60 transition-all duration-200 ${
        index == 2 ? "hidden sm:flex" : "flex"
      }`}
      href={`playlist/${playlist.id}`}
    >
      <div className="py-6">
        <div className="pb-2">
          <img
            className="h-[9rem] w-[9rem] sm:w-[8rem] sm:h-[8rem] rounded-lg shadow-zinc-900 shadow-2xl  "
            src={`${playlist.images?.[0]?.url}`}
          />
        </div>
        <div className=" truncate  text-zinc-200  py-2 w-[9rem] sm:w-[8rem] text-sm font-bold ">
          {playlist.name}
        </div>
        <div className="truncate-2-lines  text-zinc-400 text-opacity-80 text-sm w-[9rem] sm:w-[8rem]">
          {playlist.description}
        </div>
      </div>
    </Link>
  );
}

export default Playlist;
