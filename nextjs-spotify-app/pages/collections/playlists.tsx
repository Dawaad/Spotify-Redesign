import React from "react";
import Head from "next/head";
import Sidebar from "../../components/Navigation/Sidebar";
import Header from "../../components/Navigation/Header";

import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { shuffle } from "lodash";
import PlaylistLibrary from "../../components/Home/Playlist/PlaylistLibrary";
function playlist() {
 
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
  const [colour, setColour] = useState<string>();

  useEffect(() => {
    setColour(shuffle(colours).pop());
  }, [colours]);
  return (
    <>
      <Head>
        <title>Playlists</title>
      </Head>

      <div className="bg-zinc-900 h-screen overflow-hidden">
        <section
          className={`absolute h-80 w-full bg-gradient-to-b ${colour} to-zinc-900 `}
        ></section>

        <main className="flex relative">
          <Sidebar />
          <PlaylistLibrary />
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

export default playlist;
