import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import PlayerFooter from "../components/SongPlayer/PlayerFooter";
import Playlist from "../components/UserPlaylist";
import Sidebar from "../components/Navigation/Sidebar";
import Header from "../components/Navigation/Header";
import { colors } from "../lib/colours";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
const Home: NextPage = () => {
  const [colour, setColour] = useState<string>();

  useEffect(() => {
    setColour(shuffle(colors).pop());
  }, []);

  return (
    <div className="bg-zinc-900 h-screen overflow-hidden">
      <Head>
        <title>Spotify Redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <section
          className={` h-80 w-full bg-gradient-to-b ${colour} to-zinc-900 `}
        >
          <Header />
        </section>
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
