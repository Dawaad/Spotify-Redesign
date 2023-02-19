import React from "react";

import { useRecoilValue } from "recoil";
import { customOrder } from "../interfaces/customOrder";
import Song from "./Sub-Components/Song";
function Songs({
  playlist,
 
  search,
 
}: {
  playlist: SpotifyApi.SinglePlaylistResponse | undefined;
  customOrder: customOrder
  search: string|null

}) {

  

  return (
    <div className="text-white px-8 flex flex-col  pb-28">
      {playlist?.tracks.items
        .filter((track: SpotifyApi.PlaylistTrackObject) => {
          return search? (track.track?.name.toLowerCase() as string).includes(search) && !track.is_local : !track.is_local;
        })
        .map((track: SpotifyApi.PlaylistTrackObject, index: number) => {
          return <Song key={track.track?.id} track={track} order={index} />;
        })}
    </div>
  );
}

export default Songs;
