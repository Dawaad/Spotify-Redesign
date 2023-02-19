import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { entries, entriesIn, shuffle } from "lodash";
import useSpotify from "../../hooks/useSpotify";
import Head from "next/head";
import ProfileTag from "../../components/User/ProfileTag";
import Sidebar from "../../components/Navigation/Sidebar";
import Header from "../../components/Navigation/Header";
import SearchArtist from "../../components/Search/SearchArtist";
import SearchAlbum from "../../components/Search/SearchAlbum";
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
  const [albums, setAlbums] = useState<SpotifyApi.ArtistsAlbumsResponse>();
  const [seeMore, setSeeMore] = useState<Boolean>(false);
  const [uniqueAlbums, setUniqueAlbums] =
    useState<SpotifyApi.AlbumObjectSimplified[]>();
  const [relatedArtists, setRelatedArtists] =
    useState<SpotifyApi.ArtistsRelatedArtistsResponse>();
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

      spotifyApi
        .getArtistAlbums(id as string)
        .then((res) => {
          setAlbums(res.body);
          setUniqueAlbums([
            ...new Map(res.body?.items.map((m) => [m.name, m])).values(),
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
      spotifyApi
        .getArtistRelatedArtists(id as string)
        .then((res) => {
          setRelatedArtists(res.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, spotifyApi]);

  useEffect(() => {
    setColour(shuffle(colours).pop());
  }, [colours]);

  const scrollToAlbum = () => {
    if (typeof window !== "undefined") {
      const albumDiv = document.getElementById("album");
      const offsetTop = albumDiv?.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Head>
        <title>{artist?.name}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="bg-zinc-900 h-screen overflow-hidden">
        <section
          className={`h-[35rem] bg-gradient-to-b to-zinc-900 w-full ${colour} absolute z-0`}
        ></section>

        <main className="flex relative">
          <Sidebar />
          <div className="h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-hide w-full">
            <div className="relative">
              <Header />
              <section className="flex items-center space-x-7   h-80 text-white px-8 pt-10 relative">
                <img
                  className="h-[10rem] w-[10rem] md:h-[13rem] md:w-[13rem] shadow-2xl shadow-zinc-900 rounded-full"
                  src={artist?.images?.[0]?.url}
                />

                <div className="text-base">
                  Artist
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold pt-1">
                    {artist?.name}
                  </h1>
                  <p className="mt-6 text-zinc-300">
                    {artist?.followers.total} Followers
                  </p>
                  <div className="flex mt-2 space-x-2"></div>
                </div>
              </section>
              <section>
                <div className="py-6 px-12 text-zinc-200  text-lg lg:text-xl font-bold">
                  <div>
                    <div id="albums">Albums</div>
                    <div className=" grid grid-cols-2 pt-3 mt-3 bg-zinc-800 bg-opacity-[0.25] rounded-t-lg">
                      {uniqueAlbums
                        ?.slice(0, 6)
                        .map(
                          (
                            album: SpotifyApi.AlbumObjectSimplified,
                            index: number
                          ) => {
                            return (
                              <div className={`p-2`}>
                                <SearchAlbum album={album} />
                              </div>
                            );
                          }
                        )}
                    </div>
                    <div
                      className={`grid grid-cols-2 pb-3  bg-zinc-800 bg-opacity-[0.25] rounded-b-lg ${
                        seeMore ? "scale-y-100 h-auto transition-all duration-1000" : "scale-y-0 h-0"
                      }  origin-top `}
                    >
                      {uniqueAlbums
                        ?.slice(6)
                        .map(
                          (
                            album: SpotifyApi.AlbumObjectSimplified,
                            index: number
                          ) => {
                            return (
                              <div className={`p-2`}>
                                <SearchAlbum album={album} />
                              </div>
                            );
                          }
                        )}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      
                      scrollToAlbum()
                      setSeeMore(!seeMore);
                      
                    }}
                  >
                    See {!seeMore ? "more" : "less"}
                  </div>
                  <div className="mt-8 ">
                    <div className="pb-3">Related Artists</div>
                    <div className="p-6 bg-zinc-800 bg-opacity-[0.25] rounded-lg  flex space-x-6 justify-evenly ">
                      {relatedArtists?.artists
                        .slice(0, 5)
                        .map(
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
              </section>
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
