import React from "react";
import Link from "next/link";
function SearchAlbum({ album }: { album: SpotifyApi.AlbumObjectSimplified }) {
  return (
    <Link
      href={`/artist/${album.artists[0].id}`}
      className="flex  rounded-md bg-zinc-800 bg-opacity-80 py-3 px-3 hover:bg-neutral-700 hover:bg-opacity-60 transition-all duration-200"
    >
      <div className="grid grid-cols-3">
        <div className="flex justify-center">
          <img className="rounded-lg w-full " src={album.images?.[0]?.url} />
        </div>
        
        <div className="col-span-2 px-3 flex items-center">
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
