import React from "react";
import { useSession } from "next-auth/react";
import useSpotify from "../../../hooks/useSpotify";
import { useState, useEffect } from "react";
import Song from "../../Sub-Components/Song";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import TopTrack from "./TopTrack";
function TopTracks() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [topTrack, setTopTrack] = useState<SpotifyApi.TrackObjectFull[] | null>(
    null
  );
  const [trackLimit, setTrackLimit] = useState<number>(50);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopTracks({ limit: 50 }).then((data) => {
        setTopTrack(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  return (
    <div className="px-12 ">
      <div className="grid grid-cols-2 pb-4">
        <span className="font-bold w-72 text-lg md:text-base lg:text-xl text-zinc-300">
          Your Top Tracks
        </span>

        <div className="group w-max h-6 ml-auto pr-4 pl-6">
          <div className="flex justify-end text-zinc-400 items-center space-x-2 pb-1">
            <span>Show {trackLimit}</span>
            <ChevronDoubleDownIcon className="w-4 h-4" />
          </div>
          <div className="z-10 bg-zinc-900 border border-zinc-600 scale-0 text-center  group-hover:scale-100 transition-all origin-top duration-200  shadow-md shadow-zinc-800 ml-auto w-10 translate-x-3  rounded-lg py-2 space-y-1">
            <div
              className={`${
                trackLimit === 50 ? "bg-zinc-500" : ""
              }  w-full rounded-sm cursor-pointer opacity-80 hover:bg-zinc-500 bg-opacity-80 hover:bg-opacity-60`}
              onClick={() => {
                setTrackLimit(50);
              }}
            >
              50
            </div>
            <div
              className={`${
                trackLimit === 25 ? "bg-zinc-500" : ""
              } w-full rounded-sm cursor-pointer opacity-80 hover:bg-zinc-500 hover:bg-opacity-60`}
              onClick={() => {
                setTrackLimit(25);
              }}
            >
              25
            </div>
            <div
              className={`${
                trackLimit === 10 ? "bg-zinc-500" : ""
              } w-full rounded-sm cursor-pointer opacity-80 hover:bg-zinc-500 hover:bg-opacity-60`}
              onClick={() => {
                setTrackLimit(10);
              }}
            >
              10
            </div>
            <div
              className={`${
                trackLimit === 5 ? "bg-zinc-500" : ""
              } w-full rounded-sm cursor-pointer opacity-80 hover:bg-zinc-500 hover:bg-opacity-60`}
              onClick={() => {
                setTrackLimit(5);
              }}
            >
              5
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg  z-0 h-[17rem]  md:h-[21rem] overflow-y-scroll scrollbar-hide space-y-3 shadow-2xl bg-zinc-700 bg-opacity-[.48] shadow-zinc-600 ">
        {topTrack
          ?.slice(0, trackLimit)
          .map((track: SpotifyApi.TrackObjectFull, index: number) => {
            return <TopTrack key={index} index={index} track={track} />;
          })}
      </div>
    </div>
  );
}

export default TopTracks;
