import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { shuffle } from "lodash";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { colors } from "../lib/colours";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import ProfileTag from "./User/ProfileTag";
function UserPlaylist({playlistID}: {playlistID: string}) {
 

  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState<String | null>(null);

  const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse>()

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistID)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => {});
  }, [spotifyApi, playlistID]);

  useEffect(() => {

    setColor(shuffle(colors).pop() as string);
  }, [playlistID]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
        <ProfileTag/>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-zinc-900 ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
        />
        <div>
          {playlist?.public ? <p>Public Playlist</p> : <p>Private Playlist</p>}
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs playlist={playlist}/>
      </div>
    </div>
  );
}

export default UserPlaylist;
