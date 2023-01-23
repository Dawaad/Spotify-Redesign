import React, { useCallback, useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackIDState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import { debounce } from "lodash";
import {
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  ArrowUturnLeftIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";

function PlayerFooter() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentIdTrack] =
    useRecoilState(currentTrackIDState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState<number>(50);

  const updateCurrentTrack = () => {
    spotifyApi.getMyCurrentPlayingTrack().then((data) => {
      setCurrentIdTrack(data.body?.item ? data.body.item.id : null);
    });
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
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className="h-24 bg-gradient-to-b from-zinc-900 to-zinc-700 border-t border-zinc-600 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={currentSongInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{currentSongInfo?.name}</h3>
          <p>
            {currentSongInfo?.artists
              .map((artist: SpotifyApi.ArtistObjectSimplified) => {
                return artist.name;
              })
              .join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <ArrowsRightLeftIcon className="button" />
        <BackwardIcon
          className="button"
          onClick={() => {
            handleBackwardSkip();
          }}
        />
        {isPlaying ? (
          <PauseCircleIcon
            onClick={() => {
              handlePlayPause();
            }}
            className="button w-10 h-10"
          />
        ) : (
          <PlayCircleIcon
            onClick={() => {
              handlePlayPause();
            }}
            className="button w-10 h-10"
          />
        )}
        <ForwardIcon
          className="button"
          onClick={() => {
            handleForwardSkip();
          }}
        />
        <ArrowUturnLeftIcon className="button" />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <SpeakerXMarkIcon
          className="button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          onChange={(e) => {
            setVolume(Number(e.target.value));
          }}
          className="w-14 md:w-28"
          type="range"
          value={volume}
          min={0}
          max={100}
        />
        <SpeakerWaveIcon
          className="button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
}

export default PlayerFooter;
