import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import PlayerFooter from "../../components/SongPlayer/PlayerFooter";
import Sidebar from "../../components/Navigation/Sidebar";
import UserPlaylist from "../../components/UserPlaylist";
import { GetServerSideProps } from "next/types";
import { getSession } from "next-auth/react";
function Playlist() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="bg-zinc-900 h-screen overflow-hidden">
      <Head>
        <title>Spotify Redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <UserPlaylist playlistID={id as string} />
      </main>
      <div className="sticky bottom-0">
        <PlayerFooter />
      </div>
    </div>
  );
}

export default Playlist;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};
