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
      className={`w-1/3 md:1/5 h-auto ${
        index > 3 ? "hidden md:flex" : index > 2 ? "hidden lg:flex" : "flex"
      }  bg-zinc-700 px-6 py-3 justify-center`}
    >
      <div>
       

        <img
          src={artist.images?.[0]?.url}
          className="float-left  rounded-full  object-cover transition-all duration-500 w-[10rem] h-auto aspect-[1/1]"
          />
        <div>
          <div className="text-sm">{artist.name}</div>
          <div className="text-xs text-zinc-400 text-opacity-80">Artist</div>
        </div>
          </div>
     
    </Link>
  );
}

export default SearchArtist;
