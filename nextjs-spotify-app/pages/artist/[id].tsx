import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { shuffle } from "lodash";
import useSpotify from "../../hooks/useSpotify";
import Head from "next/head";
import ProfileTag from "../../components/User/ProfileTag";
import Sidebar from "../../components/Navigation/Sidebar";
import Header from "../../components/Navigation/Header";
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
  const [colour, setColour] = useState<string>();

  useEffect(() => {
    if (!id) return;
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getArtist(id as string)
        .then((data) => {
          setArtist(data.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, spotifyApi]);

  useEffect(() => {
    setColour(shuffle(colours).pop());
  }, [colours]);

  return (
    <>
      <Head>
        <title>{artist?.name}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="bg-zinc-900 h-screen overflow-hidden">
        <section
          className={`absolute h-80 w-full bg-gradient-to-b ${colour} to-zinc-900 `}
        ></section>

        <main className="flex relative">
          <Sidebar />
          <div className="h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-hide w-full">
            <div className="relative">
              <Header />
              </div>
              </div>
              </main>
      </div>
    </>
  );
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
