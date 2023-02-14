import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSpotify from "../../../hooks/useSpotify";
import { convertMilliseconds } from "../../../lib/time";
import { currentTrackIDState, isPlayingState } from "../../../atoms/songAtom";
import { useRecoilState } from "recoil";
function TopTrack({
  index,
  track,
}: {
  index: number;
  track: SpotifyApi.TrackObjectFull;
}) {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIDState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.id as string);
    setIsPlaying(true);
    spotifyApi
      .play({
        uris: [track.uri as string],
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  return (
    <div
      onClick={playSong}
      className="h-[3.55rem] md:h-[3rem] lg:h-[3.25rem] w-full bg-opacity-80 rounded-lg grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 bg-zinc-800 text-zinc-300 text-opacity-85 cursor-pointer hover:bg-neutral-700 hover:bg-opacity-80 transition-all duration-300 "
    >
      <div className="col-span-2 flex items-center space-x-6 md:space-x-3 lg:space-x-4 xl:space-x-7 ml-4 ">
        <div className="font-semibold text-xs xl:text-sm">{index + 1}</div>
        <img
          className="h-10 w-10 lg:h-9 lg:w-9 xl:w-10 xl:h-10 rounded-full md:h-8 md:w-8 "
          src={`${track.album.images[0]?.url}`}
        />
        <div className="w-64 truncate font-bold text-sm md:text-xs lg:text-sm ">
          {track.name}
        </div>
      </div>
      <div className="flex md:hidden lg:flex items-center">
        <div className=" px-6 w-32 truncate  font-semibold text-zinc-400 text-opacity-75  items-center text-xs xl:text-sm">
          {track.artists[0].name}
        </div>
      </div>
      <div className="font-semibold flex md:hidden lg:flex items-center text-xs xl:text-sm">
        {convertMilliseconds(track.duration_ms)}
      </div>
    </div>
  );
}

export default TopTrack;
