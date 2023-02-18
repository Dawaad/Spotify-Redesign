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
        { duration: 3000, fill: "forwards" }
      );
    };
  }

  return (
    <div className="flex flex-col items-center bg-zinc-800 h-screen m-0 justify-center overflow-hidden">
      <div id="mouseTracker"></div>
      <div id="blur"></div>
      <div className="z-[3]">

      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" />

      {Object.values(providers).map((provider) => (
        <div key={provider}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-lg"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
            Login with {provider.name}
          </button>
        </div>
      ))}
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
