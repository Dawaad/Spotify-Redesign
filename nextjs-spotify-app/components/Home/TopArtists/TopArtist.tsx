import { url } from "inspector";
import React from "react";
import Link from "next/link";
function Artist({ artist }: { artist: SpotifyApi.ArtistObjectFull }) {
  return (
    <Link
      href={`artist/${artist.id}`}
      className="flex-shrink-0 pb-1 sm: overflow-hidden group h-max "
    >
      <div className="px-3 pt-4 border border-transparent rounded-lg group-hover:bg-neutral-700 group-hover:bg-opacity-40 transition-all duration-200">
        <img
          className=" rounded-2xl w-48 h-48 lg:w-60 lg:h-60 shadow-zinc-900 shadow-lg"
          src={artist.images[0].url}
        />
        <div className="text-zinc-300 text-base py-2 px-3 group-hover:text-zinc-200 font-semibold">
          {artist.name}
          <div className="py-1 text-sm text-zinc-400 scale-0 group-hover:scale-100 transition-all origin-top-left  duration-200">
            <div>
              {artist.genres[0]?.replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
              })}
            </div>
            <div>{artist.followers.total} Followers</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Artist;
