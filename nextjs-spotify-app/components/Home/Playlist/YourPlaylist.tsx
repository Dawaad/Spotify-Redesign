import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Playlist from "./Playlist";
import useSpotify from "../../../hooks/useSpotify";
function YourPlaylist() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [allPlaylist, setAllPlaylist] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => {
        setAllPlaylist(res.body.items);
      });
    }
  }, [spotifyApi, session]);

  return (
    <div>
      {allPlaylist?.map(
        (v: SpotifyApi.PlaylistObjectSimplified, index: number) => {
          return <Playlist playlist = {v}/>;
        }
      )}
    </div>
  );
}

export default YourPlaylist;
