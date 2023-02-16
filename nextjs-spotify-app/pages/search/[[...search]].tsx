import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import { GetServerSideProps } from "next/types";
import { getSession } from "next-auth/react";
import { searchResult } from "../../interfaces/searchResults";
import { shuffle } from "lodash";
import Head from "next/head";
import Header from "../../components/Navigation/Header";
import Sidebar from "../../components/Navigation/Sidebar";
import PlayerFooter from "../../components/SongPlayer/PlayerFooter";
import SearchArtist from "../../components/Search/SearchArtist";
import TopTrack from "../../components/Home/TopTracks/TopTrack";
import SearchAlbum from "../../components/Search/SearchAlbum";
import SearchPlaylist from "../../components/Search/SearchPlaylist";
function Search() {
  const router = useRouter();
  const { search } = router.query;
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [searchResults, setSearchResult] = useState<searchResult>();

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

  useEffect(() => {
    if (!search) return;
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .search(search as string, ["playlist", "track", "artist", "album"], {
          limit: 6,
        })
        .then((res) => {
          setSearchResult({
            albumResult: res.body.albums,
            artistResult: res.body.artists,
            playlistResult: res.body.playlists,
            trackResult: res.body.tracks,
          });
        });
    }
  }, [search, spotifyApi]);

  return (
    <>
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
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
            <div>
              {search ? (
                <>
                  <div className="py-6 px-12 text-zinc-200  text-lg lg:text-xl font-bold">
                    <p className="">Search Results for "{search}"</p>
                    <div className="mt-8 ">
                      <div className="pb-3">Artists</div>
                      <div className="p-6 bg-zinc-800 bg-opacity-[0.25] rounded-lg  flex space-x-6 justify-evenly ">
                        {searchResults?.artistResult?.items.slice(0,5).map(
                          (
                            artist: SpotifyApi.ArtistObjectFull,
                            index: number
                          ) => {
                            return (
                              <SearchArtist artist={artist} index={index} />
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="lg:grid lg:grid-cols-2 text-zinc-200 px-12 py-3 text-lg lg:text-xl font-bold space-y-3 lg:space-y-0 lg:space-x-3">
                    <div>
                      <div>Albums</div>
                      <div className="grid grid-rows-2 grid-cols-2 p-3 mt-3 bg-zinc-800 bg-opacity-[0.25] rounded-lg">
                        {searchResults?.albumResult?.items
                          .slice(0, 6)
                          .map((album: SpotifyApi.AlbumObjectSimplified) => {
                            return (
                              <div className="p-3 ">
                                <SearchAlbum album={album} />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="">
                      <div className="">Songs</div>
                      <div className="p-3 bg-zinc-800 bg-opacity-[0.25] mt-3 rounded-lg space-y-4 h-auto">
                        {searchResults?.trackResult?.items.slice(0,5).map(
                          (
                            track: SpotifyApi.TrackObjectFull,
                            index: number
                          ) => {
                            return <TopTrack track={track} index={index} />;
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="py-6 px-12 text-zinc-200  text-lg lg:text-xl font-bold">
                    <div className="pb-3">Playlist</div>
                    <div className="grid grid-rows-2 grid-cols-3  p-3 mt-3 bg-zinc-800 bg-opacity-[0.25] rounded-lg">
                      {searchResults?.playlistResult?.items.map(
                        (
                          playlist: SpotifyApi.PlaylistObjectSimplified,
                          index: number
                        ) => {
                          return (
                            <div className="p-3 ">
                            <SearchPlaylist playlist={playlist} index={index} />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-6 px-12 text-zinc-200  text-lg lg:text-xl font-bold flex justify-center items-center h-[20rem]">
                    The search field is empty. Please provide a search term to proceed
                  </div>
              )}
            </div>

            <div className="h-[7rem]"></div>
          </div>
        </main>
        <div className="absolute w-full bottom-0 z-20 ">
          <PlayerFooter />
        </div>
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

export default Search;
