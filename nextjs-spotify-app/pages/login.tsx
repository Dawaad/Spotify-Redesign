import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps, NextPage } from "next";

const login: NextPage<{ providers: any[] }> = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-zinc-800 min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" />

      {Object.values(providers).map((provider) => (
        <div key={provider}>
          <button className="bg-[#18D860] text-white p-5 rounded-lg"
          onClick={() => signIn(provider.id, {callbackUrl: "/"})}>

          Login with {provider.name}
          </button>
          </div>
      ))}
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
