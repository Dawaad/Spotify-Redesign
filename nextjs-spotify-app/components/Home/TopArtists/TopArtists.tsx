import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "../../../hooks/useSpotify";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";
import Artist from "./TopArtist";

function TopArtist() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [topArtists, setTopArtists] = useState<
    SpotifyApi.ArtistObjectFull[] | null
  >(null);
  const changeTimer: React.MutableRefObject<any> = useRef(null);

  const [translatePosition, setTranslatePosition] = useState<number>(0);
  const [artistLimit, setArtistLimit] = useState<number>(50);
  const [artistDiv, setArtistDivWidth] = useState<HTMLElement | null>(null);

  const pxToRem = (px: number) => {
    return px / 16;
  };
  const remToPx = (rem: number) => {
    return rem * 16;
  };

  function timeoutClearUp() {
    clearInterval(changeTimer.current);
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopArtists({ limit: 50 }).then((data) => {
        setTopArtists(data.body.items);
      });
    }
  }, [session, spotifyApi]);


  useEffect(() => {
    setArtistDivWidth(document.getElementById("allArtists"));
  }, []);

  useEffect(() => {
   
    if (!artistDiv) return;
    if (translatePosition >= 0) {
      setTranslatePosition(0);
    }
  }, [translatePosition]);

  function increment(positionChange: number) {
    changeTimer.current = setInterval(
      () =>
        setTranslatePosition((value) => {
          return value + positionChange;
        }),
      15
    );
  }

  const handleLimitChange = (limitChange: number) => {
    setArtistLimit(limitChange);
    setTranslatePosition(0);
  };

 

  return (
    <div className="pt-6 px-4   text-zinc-200">
      <div className="px-8  space-x-10 flex font-bold text-xl items-center">
        <span>Your Top Artists</span>
        <div className="group">
          <div className="flex items-center text-xs md:text-sm font-semibold cursor-pointer py-3">
            <ChevronDownIcon className="rotate-0 w-3 h-3 mr-1 text-zinc-400 group-hover:rotate-180 transition-all duration-100 ease-linear " />
            Top {artistLimit}
          </div>
          <div className="scale-0 group-hover:scale-100 transition-all ease-in origin-top duration-100 absolute z-20 space-y-1 border border-zinc-500 shadow-lg shadow-zinc-800 text-sm py-2 px-1 translate-x-3  rounded-lg bg-zinc-800 text-neutral-300">
            <div
              onClick={() => {
                handleLimitChange(50);
              }}
              className={`rounded-md p-1 cursor-pointer ${
                artistLimit === 50 ? "bg-zinc-500" : ""
              } hover:bg-zinc-500 hover:bg-opacity-60`}
            >
              Top 50
            </div>
            <div
              onClick={() => {
                handleLimitChange(25);
              }}
              className={`rounded-md p-1 cursor-pointer ${
                artistLimit === 25 ? "bg-zinc-500" : ""
              } hover:bg-zinc-500 hover:bg-opacity-60`}
            >
              Top 25
            </div>
            <div
              onClick={() => {
                handleLimitChange(10);
              }}
              className={`rounded-md p-1 cursor-pointer ${
                artistLimit === 10 ? "bg-zinc-500" : ""
              } hover:bg-zinc-500 hover:bg-opacity-60`}
            >
              Top 10
            </div>
            <div
              onClick={() => {
                handleLimitChange(5);
              }}
              className={`rounded-md p-1 cursor-pointer ${
                artistLimit === 5 ? "bg-zinc-500" : ""
              } hover:bg-zinc-500 hover:bg-opacity-60`}
            >
              Top 5
            </div>
          </div>
        </div>
        <div className="flex  pr-8 md:pr-12 space-x-4">
          <div className="bg-white w-6 h-6 shadow-gray-900 shadow-md rounded-md flex items-center justify-center cursor-pointer hover:opacity-80 hover:border-zinc-900">
            <ChevronLeftIcon
              className=" text-zinc-900 w-5 h-5"
              onMouseDown={() => {
                increment(1);
              }}
              onMouseUp={timeoutClearUp}
            />
          </div>
          <div className="bg-white w-6 h-6 rounded-md shadow-md shadow-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 hover:border-zinc-900">
            <ChevronRightIcon
              className="w-5 h-5 text-zinc-900"
              onMouseDown={() => {
                increment(-1);
              }}
              onMouseUp={timeoutClearUp}
            />
          </div>
        </div>
      </div>

      <div
        className={"px-4 flex space-x-10 -z-40 max-w-lg"}
        style={{ translate: `${translatePosition}rem` }}
        id="allArtists"
      >
        {topArtists
          ?.slice(0, artistLimit)
          .map((artist: SpotifyApi.ArtistObjectFull, index: number) => {
            return <Artist artist={artist} key={index} />;
          })}
      </div>
    </div>
  );
}

export default TopArtist;
