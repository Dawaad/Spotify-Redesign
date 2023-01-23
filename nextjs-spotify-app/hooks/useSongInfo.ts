import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIDState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIDState);
  const [songInfo, setSongInfo] = useState<SpotifyApi.SingleTrackResponse|null>(null);
    
  useEffect(() => {
    const fetchSongInfo = async () => {
        if(currentIdTrack){
            const currentTrackInfo = spotifyApi.getTrack(currentIdTrack).then(res => {
                setSongInfo(res.body)
            })
        }
    }

    fetchSongInfo()
  },[currentIdTrack,spotifyApi])
  

  return songInfo;
}

export default useSongInfo;
