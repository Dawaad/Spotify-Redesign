import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import PlayerFooter from '../components/Player-Footer'
import Playlist from '../components/Playlist'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="bg-zinc-900 h-screen overflow-hidden">
      <Head>
        <title>Spotify Redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex'>
        <Sidebar/>
        <Playlist/>
      </main>
      <div className='sticky bottom-0'>
        <PlayerFooter/>
      </div>
  
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  };
};