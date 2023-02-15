import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Playlist from "./Playlist";
import useSpotify from "../../../hooks/useSpotify";
import Link from "next/link";
function YourPlaylist() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [allPlaylist, setAllPlaylist] = useState<
    SpotifyApi.PlaylistObjectSimplified[] | null
  >(null);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => {
        setAllPlaylist(res.body.items);
      });
    }
  }, [spotifyApi, session]);

  return (
    <div className=" py-8 px-12">

      <div className="grid grid-cols-2">

      <div className="flex items-center text-xl font-bold text-zinc-300">Your Playlists</div>


      <Link href={"/collections/playlists"} className="h-auto flex items-center justify-end text-xs font-semibold text-zinc-400 text-opacity-80 hover:underline cursor-pointer">SHOW ALL</Link>
 
      </div>
      <div className="flex  overflow-hidden justify-between py-4 space-x-6 h-auto">
        {allPlaylist
          ?.sort(
            (
              playlist1: SpotifyApi.PlaylistObjectSimplified,
              playlist2: SpotifyApi.PlaylistObjectSimplified
            ) => {
              return playlist2.tracks.total - playlist1.tracks.total;
            }
          )
          .slice(0, 3)
          .map((v: SpotifyApi.PlaylistObjectSimplified, index: number) => {
            return <Playlist playlist={v} index={index} key={index}/>;
          })}
      </div>
    </div>
  );
}

export default YourPlaylist;
