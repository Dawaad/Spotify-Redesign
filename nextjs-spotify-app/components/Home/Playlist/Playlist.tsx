import Link from "next/link";
import React from "react";

function Playlist({
  playlist,
}: {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}) {
  return (
    <Link className=" h-max group pb-1" href={`playlist/${playlist.id}`}>
      <img className="w-48 h-48 lg:w-60 lg:h-60 rounded-lg" src={`${playlist.images?.[0]?.url}`}/>
      <div>

      </div>
    </Link>
  );
}

export default Playlist;
