import React, { useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps, NextPage } from "next";

const login: NextPage<{ providers: any[] }> = ({ providers }) => {
  if (typeof window !== "undefined") {
    const mouseTracker = document.getElementById("mouseTracker");

    document.body.onpointermove = (event) => {
      const { clientX, clientY } = event;
      (mouseTracker as HTMLElement).animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 1000, fill: "forwards" }
      );
    };
  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-zinc-700 to-zinc-900 h-screen m-0 justify-center overflow-hidden relative ">
      <div id="mouseTracker" className="shrink-0 flex"></div>
      <div id="blur"></div>

      <div className="z-[3] w-[40rem]  flex justify-center">
        <div className="">

        <img className="w-52 mb-10 mx-auto" src="https://links.papareact.com/9xl" />
        <div className="text-[#18D860] text-5xl font-bold flex justify-center mb-20 px-4">Spotify Resdesign</div>

        <div className="flex items-center justify-center">
          {Object.values(providers).map((provider) => (
            <div key={provider}>
              <button
                className="bg-[#18D860] text-lg font-semibold p-5 rounded-lg text-zinc-900"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                Login with {provider.name}
              </button>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
