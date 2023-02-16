import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PlayCircleIcon,ChevronDownIcon } from "@heroicons/react/24/solid";
import { shuffle } from "lodash";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { colors } from "../lib/colours";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import ProfileTag from "./User/ProfileTag";
import { ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { customOrder } from "../interfaces/customOrder";
function UserPlaylist({ playlistID }: { playlistID: string }) {
  

  const spotifyApi = useSpotify();
  const [color, setColor] = useState<String | null>(null);
  const { data: session } = useSession();
  const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse>();
  const [search, setSearch] = useState<string | null>(null);
  const [customOrder, setCustomOrder] = useState<customOrder>({
    order: null,
    direction: "Ascending",
  });
  const getTotalRunTime = () => {};

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
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide relative ">
      <ProfileTag />

      <section
        className={`h-[35rem] bg-gradient-to-b to-zinc-900 w-full ${color} absolute z-0`}
      ></section>
      <section className="flex items-center space-x-7   h-80 text-white px-8 pt-10 relative">
        <img
          className="h-[10rem] w-[10rem] md:h-[13rem] md:w-[13rem] shadow-2xl shadow-zinc-900 rounded-lg"
          src={playlist?.images?.[0]?.url}
        />

        <div className="text-base">
          {playlist?.public ? <p>Public Playlist</p> : <p>Private Playlist</p>}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold pt-1">
            {playlist?.name}
          </h1>
          <p className="mt-6 text-zinc-300">{playlist?.description}</p>
          <div className="flex mt-2 space-x-2">
            
           
            <p>{playlist?.owner.display_name},</p>
            <p className="text-zinc-300 ">{playlist?.tracks.total} songs</p>
          </div>
        </div>
      </section>
      <section>
        <div className=" bg-zinc-900 bg-opacity-[0.15] relative py-6">
          <div className="px-8 grid grid-cols-2">
            <div className="flex items-center">
              <PlayCircleIcon className="button w-[4.5rem] h-[4.5rem] text-green-500" />
            </div>
            <div className="flex justify-end items-center space-x-3 text-zinc-400">
              
              <div className="group flex items-center space-x-2">
                <div className=" transition-all duration-500 origin-right flex items-center">
                  <MagnifyingGlassIcon className="scale-0 group-hover:scale-100 transition-all duration-500  w-4 h-4 ml-1 absolute  pointer-events-none" />
                  <input
                  onChange={(e) => {
                       e.target.value.trim()? setSearch(e.target.value) : setSearch(null)
                      console.log(search)
                  }}
                    className="w-0 p-0 group-hover:w-[12rem]   transition-all duration-500 bg-zinc-200 bg-opacity-10  rounded-sm  group-hover:pl-6 group-hover:py-1 text-sm font-semibold border-none focus:outline-none"
                    placeholder="Search In Playlist"
                  />
                </div>
                <MagnifyingGlassIcon className="w-5 h-5 group-hover:scale-0 transition-all duration-500" />
              </div>

              <div className="flex items-center">
                  {!customOrder.order ? "Custom order" : customOrder.order}
              </div>

            </div>
          </div>
          <div className="grid grid-cols-2 text-zinc-400 py-3 px-12 border-b border-zinc-600">
            <div className="flex items-center space-x-4">
              <p>#</p>
              <p>TITLE</p>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
              <p className="hidden md:inline">ALBUM</p>
              <ClockIcon className="w-6 h-6" />
            </div>
          </div>
          <Songs playlist={playlist} customOrder={customOrder} search={search} />
        </div>
      </section>
    </div>
  );
}

export default UserPlaylist;
