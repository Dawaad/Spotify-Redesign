import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import PlayerFooter from "../components/SongPlayer/PlayerFooter";
import Playlist from "../components/UserPlaylist";
import Sidebar from "../components/Navigation/Sidebar";
import Header from "../components/Navigation/Header";

import { useEffect, useState } from "react";
import { shuffle } from "lodash";

import HomeMain from "../components/Home/HomeMain";
const Home: NextPage = () => {
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
  }, []);

  return (
    <div className="bg-zinc-900 h-screen overflow-hidden">
      <section
        className={`absolute h-80 w-full bg-gradient-to-b ${colour} to-zinc-900 `}
      ></section>

      <Head>
        <title>Spotify Redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex relative">
        <Sidebar />
        <HomeMain />
      </main>
     
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};
