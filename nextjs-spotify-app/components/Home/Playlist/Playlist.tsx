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
      
      href={`playlist/${playlist.id}`}
    >
      <div className="py-6">
        <div className="pb-2">
          <img
            className="w-9/12  rounded-lg aspect-square shadow-gray-900 shadow-2xl m-auto "
            src={`${playlist.images?.[0]?.url}`}
          />
        </div>
        <div className=" truncate-1-lines  text-zinc-200 flex justify-center w-9/12 text-sm font-bold m-auto">
          {playlist.name}
        </div>
        <div className="truncate-2-lines  text-zinc-400 text-opacity-80 text-sm flex justify-center w-9/12 m-auto">
          {playlist.description}
        </div>
      </div>
    </Link>
  );
}

export default Playlist;
