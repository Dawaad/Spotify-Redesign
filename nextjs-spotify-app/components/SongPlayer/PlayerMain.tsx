import React from "react";
import useSpotify from "../../hooks/useSpotify";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  currentTrackIDState,
  isPlayingState,
  isRepeatState,
  isShuffleState,
} from "../../atoms/songAtom";
import useSongInfo from "../../hooks/useSongInfo";
import { debounce } from "lodash";
import useSongQueue from "../../hooks/useSongQueue";
import {
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  ArrowUturnLeftIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

interface spotifyQueue {
  currently_Playing: SpotifyApi.TrackObjectFull;
  queue: SpotifyApi.TrackObjectFull[];
}

function PlayerMain() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentIdTrack] =
    useRecoilState(currentTrackIDState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [isShuffle, setIsShuffle] = useRecoilState(isShuffleState);
  const [isRepeat, setIsRepeat] = useRecoilState(isRepeatState);
  const [volume, setVolume] = useState<number>(50);
  const [currentQueue, setCurrentQueue] = useState<spotifyQueue>();
  const updateCurrentTrack = () => {
    spotifyApi.getMyCurrentPlayingTrack().then((data) => {
      setCurrentIdTrack(data.body?.item ? data.body.item.id : null);
    });
  };

  const fetchQueueInfo = async () => {
    const currentQueue = await fetch(
      "https://api.spotify.com/v1/me/player/queue",
      {
        headers: {
          Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
        },
      }
    ).then((res) => res.json());
    console.log(currentQueue);
    setCurrentQueue(currentQueue);
  };

  const currentSongInfo = useSongInfo();

  const handleBackwardSkip = async () => {
    await spotifyApi.skipToPrevious();
    setTimeout(updateCurrentTrack, 1000);
  };
  const handleForwardSkip = async () => {
    await spotifyApi.skipToNext();
    setTimeout(updateCurrentTrack, 1000);
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const fetchPlayBackState = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      setIsShuffle(data.body?.shuffle_state);
      setIsRepeat(data.body?.repeat_state);
    });
  };

  const handleShuffle = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.shuffle_state) {
        spotifyApi.setShuffle(false);
        setIsShuffle(false);
      } else {
        spotifyApi.setShuffle(true);
        setIsShuffle(true);
      }
    });
  };

  const handleRepeat = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.repeat_state === "context") {
        spotifyApi.setRepeat("track");
        setIsRepeat("track");
      } else if (data.body.repeat_state === "track") {
        spotifyApi.setRepeat("off");
        setIsRepeat("off");
      } else {
        spotifyApi.setRepeat("context");
        setIsRepeat("context");
      }
    });
  };

  const handleRefresh = () => {
    spotifyApi.getMyCurrentPlayingTrack().then((data) => {
      setCurrentIdTrack(data.body?.item ? data.body.item.id : null);

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data.body?.is_playing);
      });
    });
    fetchPlayBackState();
  };

  const fetchCurrentSong = () => {
    if (!currentSongInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentIdTrack(data.body?.item ? data.body.item.id : null);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 500),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      fetchCurrentSong();
      fetchQueueInfo();
      fetchPlayBackState();
      setVolume(50);
      console.log(currentQueue);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className="px-12">
      <div className=" font-bold w-72 md:text-base lg:text-xl text-zinc-300 pb-4">
        Now Playing
      </div>

      <div className="flex">
        <div className="md:min-w-[18rem] w-full p-4  rounded-xl bg-zinc-800 bg-opacity-80 text-zinc-300 text-opacity-85 h-[21rem]   ">
          {currentSongInfo ? (
            <>
              <div className="grid grid-cols-8">
                <div className="flex justify-start col-span-1">
                  {" "}
                  <ArrowPathIcon
                    className="button lg:w-6 lg:h-6 hover:rotate-180 duration-200"
                    onClick={handleRefresh}
                  />
                </div>
                <div className="flex justify-end text-xs col-span-7 ">
                  Playing Next:{" "}
                  <p className="ml-4 lg:ml-2 font-bold max-w-[10rem] truncate">
                    {currentQueue?.queue?.[0]?.name}
                  </p>
                </div>
              </div>
              <div className="flex justify-center md:p-8 lg:p-2">
                <img
                  className="h-[7rem] w-[7rem] lg:h-[10rem] lg:w-[10rem] rounded-2xl shadow-xl shadow-zinc-900"
                  src={`${currentSongInfo?.album?.images?.[0]?.url}`}
                />
              </div>
              <div className="flex justify-center font-semibold text-sm truncate">
                {currentSongInfo?.name}
              </div>
              <div className="flex justify-center text-zinc-400 text-opacity-80 text-sm">
                {currentSongInfo?.artists[0].name}
              </div>
              <div className="pt-2 flex justify-evenly space-x-1  items-center">
                <ArrowsRightLeftIcon
                  className={`${
                    isShuffle ? "text-green-700" : ""
                  } button lg:w-6 lg:h-6`}
                  onClick={handleShuffle}
                />
                <BackwardIcon
                  className="button lg:w-6 lg:h-6"
                  onClick={() => {
                    handleBackwardSkip();
                  }}
                />
                <div>
                  {isPlaying ? (
                    <PauseCircleIcon
                      onClick={handlePlayPause}
                      className="button md:w-12 md:h-12 w-14 h-14"
                    />
                  ) : (
                    <PlayCircleIcon
                      onClick={handlePlayPause}
                      className="button md:w-12 md:h-12  w-14 h-14"
                    />
                  )}
                </div>
                <ForwardIcon
                  className="button lg:w-6 lg:h-6"
                  onClick={() => {
                    handleForwardSkip();
                  }}
                />
                <ArrowUturnLeftIcon
                  onClick={handleRepeat}
                  className={`${
                    isRepeat === "context"
                      ? "text-green-700"
                      : isRepeat === "track"
                      ? "text-yellow-700"
                      : ""
                  }  button lg:w-6 lg:h-6`}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex h-3/4 items-center justify-center text-center text-xl xl:text-2xl">
                Please ensure that your Spotify app is active and is currently
                playing a song. Once a song is playing, refresh the page to
                retrieve current playback information
              </div>
              <div className="flex justify-center">
                <ArrowPathIcon
                  className="button h-10 w-10 hover:rotate-180 duration-200"
                  onClick={handleRefresh}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerMain;
