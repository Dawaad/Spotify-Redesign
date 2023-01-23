import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { shuffle } from "lodash";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
function Playlist() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState<String | null>(null);
  const playlistID = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
    "from-orange-500",
  ];

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
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-zinc-900 space-x-3 opacity-90 hover:opacity-80 rounded-full cursor-pointer text-white p-1 pr-2">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image as string}
            alt="Profile Image"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

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
        <Songs/>
      </div>
    </div>
  );
}

export default Playlist;
