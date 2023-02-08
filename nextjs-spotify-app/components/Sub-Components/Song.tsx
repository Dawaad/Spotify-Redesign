import React, { useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import { convertMilliseconds } from "../../lib/time";
import { useRecoilState } from "recoil";
import { currentTrackIDState, isPlayingState } from "../../atoms/songAtom";
import useSongQueue from "../../hooks/useSongQueue";
function Song({
  order,
  track,
}: {
  order: number;
  track: SpotifyApi.PlaylistTrackObject;
}) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIDState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentQueue, setCurrentQueue] = useState()
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

  
  const playSong = () => {
    setCurrentTrackId(track.track?.id as string);
    setIsPlaying(true);
    fetchQueueInfo()
     
      
      spotifyApi.play({
        uris: [track.track?.uri as string],
      });
    
  };
  return (
    <div
      onClick={playSong}
      className="grid grid-cols-2 text-zinc-400 py-3 px-4 hover:bg-zinc-700 hover:bg-opacity-50 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="w-10 h-10"
          src={track.track?.album.images[0]?.url}
          alt="Song Image"
        />
        <div>
          <p className="w-36 lg:w-[17rem] truncate text-white">
            {track.track?.name}
          </p>
          <p className="w-40 truncate">
            {track.track?.artists
              .map((artist: SpotifyApi.ArtistObjectSimplified) => {
                return artist.name;
              })
              .join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-64 hidden md:inline truncate">
          {track.track?.album.name}
        </p>
        <p>{convertMilliseconds(track.track?.duration_ms as number)}</p>
      </div>
    </div>
  );
}

export default Song;
