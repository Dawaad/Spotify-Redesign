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
      className={`group pb-1 w-1/2 sm:1/3   justify-center  rounded-md bg-zinc-800 bg-opacity-80 hover:bg-neutral-700 hover:bg-opacity-60 transition-all duration-200 ${
        index == 2 ? "hidden sm:flex" : "flex"
      }`}
      href={`playlist/${playlist.id}`}
    >
      <div className="py-6">
        <div className="pb-2">
          <img
            className="w-9/12  rounded-lg aspect-square shadow-zinc-900 shadow-2xl m-auto "
            src={`${playlist.images?.[0]?.url}`}
          />
        </div>
        <div className=" truncate  text-zinc-200  py-2 w-[9rem] sm:w-[8rem] text-sm font-bold m-auto">
          {playlist.name}
        </div>
        <div className="truncate-2-lines  text-zinc-400 text-opacity-80 text-sm w-[9rem] sm:w-[8rem] m-auto">
          {playlist.description}
        </div>
      </div>
    </Link>
  );
}

export default Playlist;
