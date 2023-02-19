import React from "react";
import Header from "../../Navigation/Header";
import Playlist from "./Playlist";
import { useState, useEffect } from "react";
import useSpotify from "../../../hooks/useSpotify";
function PlaylistLibrary() {
  const [allPlaylist, setAllPlaylist] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => {
        setAllPlaylist(res.body.items);
      });
    }
  }, [spotifyApi]);

  return (
    <div>
      <div className="h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-hide w-full">
        <div className="relative">
          <Header />
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  overflow-hidden">
            {allPlaylist
              ?.sort(
                (
                  playlist1: SpotifyApi.PlaylistObjectSimplified,
                  playlist2: SpotifyApi.PlaylistObjectSimplified
                ) => {
                  return playlist2.tracks.total - playlist1.tracks.total;
                }
              )

              .map((v: SpotifyApi.PlaylistObjectSimplified, index: number) => {
                return (
                  <div
                    className={`group m-4  rounded-lg bg-zinc-800 bg-opacity-80 hover:bg-neutral-700 hover:bg-opacity-60 transition-all duration-200 `}
                  >
                    <Playlist playlist={v} index={index} key={index} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistLibrary;
