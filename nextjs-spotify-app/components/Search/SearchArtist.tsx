import Link from "next/link";
import React from "react";

function SearchArtist({
  artist,
  index,
}: {
  artist: SpotifyApi.ArtistObjectFull;
  index: number;
}) {
  return (
    <Link
      href={`/artist/${artist.id}`}
      className={`w-1/3 md:w-1/4 lg:w-1/5 h-auto ${
        index > 3 ? "hidden md:flex" : index > 2 ? "hidden lg:flex" : "flex"
      }  bg-zinc-800  bg-opacity-80 py-3 px-2 justify-center rounded-md hover:bg-neutral-700 hover:bg-opacity-60 transition-all duration-200`}
    >
      <div className="py-6">
        <div className="pb-2 flex flex-wrap h-min w-full">
          <img
            className="w-9/12 h-auto  aspect-square shadow-zinc-900 shadow-2xl m-auto rounded-full"
            src={`${
              artist.images?.[0]?.url
                ? artist.images[0].url
                : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2"
            } `}
          />
        </div>
        <div className=" truncate-2-lines text-zinc-200   w-9/12 text-sm font-bold m-auto">
          {artist.name}
        </div>
        <div className="truncate-1-lines mt-2 text-zinc-400 text-opacity-80 text-sm w-9/12 m-auto">
          Artist
        </div>
      </div>
    </Link>
  );
}

export default SearchArtist;
