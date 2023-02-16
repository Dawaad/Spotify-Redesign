import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { shuffle } from "lodash";
import useSpotify from "../../hooks/useSpotify";

function Artist() {
  const router = useRouter();
  const { id } = router.query;
  const spotifyApi = useSpotify();
  const colours = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
    "from-orange-500",
    "from-zinc-700",
    "from-zinc-600",
    "from-gray-900",
  ];
  const [artist, setArtist] = useState<SpotifyApi.ArtistObjectFull>();

  useEffect(() => {
    if(!id) return
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getArtist(id as string).then((data) => {
        setArtist(data.body)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [id, spotifyApi]);

  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};

export default Artist;
