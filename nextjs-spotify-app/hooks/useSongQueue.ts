import React from "react";
import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";
function useSongQueue() {

    const [currentQueue, setCurrentQueue] = useState()
    const spotifyApi = useSpotify()
    
    useEffect(() => {
        const fetchQueueInfo = async () => {
            const currentQueue = await fetch(
                'https://api.spotify.com/v1/me/player/queue',
                {
                    headers:{
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                    }
                }
                ).then(res => res.json());
                setCurrentQueue(currentQueue)
        }
        fetchQueueInfo()
    },[spotifyApi])
    return currentQueue   
}
export default useSongQueue;
