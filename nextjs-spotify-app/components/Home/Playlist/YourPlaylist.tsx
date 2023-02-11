import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Playlist from "./Playlist";
import useSpotify from "../../../hooks/useSpotify";
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
      <div className="text-xl font-bold text-zinc-300">Your Playlists</div>
      <div className="flex  overflow-hidden justify-center w-full py-2 space-x-4">
        {allPlaylist
          ?.sort(
            (
              playlist1: SpotifyApi.PlaylistObjectSimplified,
              playlist2: SpotifyApi.PlaylistObjectSimplified
            ) => {
              return playlist2.tracks.total - playlist1.tracks.total;
            }
          )
          .slice(0, 5)
          .map((v: SpotifyApi.PlaylistObjectSimplified, index: number) => {
            return (
              <div className={`w-1/3 lg:w-1/5  ${index>2?'hidden':''} lg:block`}>
                <Playlist playlist={v} />;
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default YourPlaylist;
