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

  useEffect(() => {}, [session, spotifyApi]);
  return (
    <div
      onClick={playSong}
      className="h-[3.55rem] rounded-lg grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 bg-zinc-300  text-zinc-800 shadow-md shadow-zinc-500 hover:bg-opacity-[0.85]"
    >
      <div className="col-span-2 flex items-center space-x-6 md:space-x-3 lg:space-x-6 ml-4 ">
        <div className="font-semibold">{index + 1}</div>
        <img
          className="h-10 w-10 lg:h-10 lg:w-10 rounded-lg md:h-8 md:w-8"
          src={`${track.album.images[0]?.url}`}
        />
        <div className="w-64 truncate font-bold text-zinc-800 text-sm ">
          {track.name}
        </div>
      </div>
      <div className="flex md:hidden lg:flex items-center">
        <div className=" px-6 w-32 truncate  font-semibold text-zinc-700  items-center text-sm">
          {track.artists[0].name}
        </div>
      </div>
      <div className="font-semibold flex md:hidden lg:flex items-center text-sm ">
        {convertMilliseconds(track.duration_ms)}
      </div>
    </div>
  );
}

export default TopTrack;
