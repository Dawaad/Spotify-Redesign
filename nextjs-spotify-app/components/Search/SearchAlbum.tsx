import React from "react";
import Link from "next/link";
function SearchAlbum({ album }: { album: SpotifyApi.AlbumObjectSimplified }) {
  return (
    <Link
      href={`/artist/${album.artists[0].id}`}
      className="flex h-full rounded-md bg-zinc-800 bg-opacity-80 py-3 px-3 hover:bg-neutral-700 hover:bg-opacity-60 transition-all duration-200"
    >
      <div className="flex w-full">
        <div className="flex justify-center w-max h-min">
          <img className="rounded-lg w-auto h-full " src={album.images?.[2]?.url} />
        </div>
        
        <div className=" px-3 flex items-center">
            <div>

            <div className="text-base w-full truncate-1-lines">{album.name}</div>
            <div className="text-xs w-full truncate-1-lines text-zinc-400 text-opacity-80">{album.artists.map((artist:SpotifyApi.ArtistObjectSimplified) => {
                return artist.name
            }).join(', ')}</div>
        </div>
            </div>
      </div>
    </Link>
  );
}

export default SearchAlbum;
