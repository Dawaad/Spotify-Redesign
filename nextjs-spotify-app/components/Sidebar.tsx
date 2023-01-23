import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import * as HeroIcons from "@heroicons/react/24/outline";
import useSpotify from "../hooks/useSpotify";
import { useState } from "react";
import {useRecoilState} from 'recoil'
import { playlistIdState } from "../atoms/playlistAtom";
export default function Sidebar() {
  
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession();
  const [playlist,setPlaylist] = useState<SpotifyApi.PlaylistObjectSimplified[]>([])
  const [playlistID, setPlaylistID] = useRecoilState(playlistIdState)
  console.log(playlistID)

  useEffect(() => {
      if (spotifyApi.getAccessToken()){
        spotifyApi.getUserPlaylists().then((data) => {
          setPlaylist(data.body.items)
        })
      }
  },[session,spotifyApi])


  return (
    <div
      id="sidebar-main-container"
      className=" text-zinc-400 p-5 overflow-y-scroll scrollbar-hide text-xs lg:text-sm border-r border-zinc-600 h-screen sm: max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36"
    >
      <div id="sidebar-icons" className="space-y-4">
      
        <button className="flex items-center space-x-2 hover:text-white">
          <HeroIcons.HomeIcon className="h-5 w-5" />
          <div>Home</div>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HeroIcons.MagnifyingGlassIcon className="h-5 w-5" />
          <div>Search</div>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HeroIcons.BuildingLibraryIcon className="h-5 w-5" />
          <div>Your Library</div>
        </button>
        <hr className="border-t-[0.1px] border-zinc-600" />

        <button className="flex items-center space-x-2 hover:text-white">
          <HeroIcons.PlusCircleIcon className="h-5 w-5" />
          <div>Create Playlist</div>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HeroIcons.HeartIcon className="h-5 w-5" />
          <div>Liked Songs</div>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HeroIcons.RssIcon className="h-5 w-5" />
          <div>Your Episodes</div>
        </button>
        <hr className="border-t-[0.1px] border-zinc-600" />

        {playlist.map((playlist:SpotifyApi.PlaylistObjectSimplified) => {
          return(
            <p key = {playlist.id} className = "cursor-pointer hover:text-white" onClick={() => {
              setPlaylistID(playlist.id)
            }}>{playlist.name}</p>
          )
        })}
       
      </div>
    </div>
  );
}
