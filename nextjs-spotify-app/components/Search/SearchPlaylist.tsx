import Link from "next/link";
import React from "react";

function SearchPlaylist({
  playlist,
  index,
}: {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  index: number;
}) {
  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className="flex rounded-md  bg-zinc-800 bg-opacity-80 py-3 px-3 hover:bg-neutral-700 hover:bg-opacity-60 transition-all duration-200"
    >
      <div className="grid grid-cols-3">
        <div className="flex justify-center flex-wrap h-min">
          <img
            className="rounded-lg h-full w-auto aspect-square"
            src={playlist.images?.[0]?.url}
          />
        </div>

        <div className="col-span-2 px-3 flex items-center w-full">
          <div>
            <div className="text-base w-full truncate-1-lines">
              {playlist.name}
            </div>
            <div className="text-xs w-10/12 truncate-1-lines text-zinc-400 text-opacity-80">
              {playlist.owner.display_name}
            </div>
            <div className="text-xs w-10/12 truncate-1-lines text-zinc-400 text-opacity-80 mt-1">
              {playlist.tracks.total} Tracks
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchPlaylist;
