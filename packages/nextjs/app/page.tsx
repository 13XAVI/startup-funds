"use client";

import type { NextPage } from "next";
import Background from "~~/components/Background";
import { BotSvg } from "~~/components/SVGs/SVGs";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <div className="relative w-full h-screen">
      <div className="px-5 pt-12">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">StartUp Fundraising Platform</span>
        </h1>
      </div>
      <div className=" absolute md:-top-12 top-12 -z-10 ">
        <Background />
      </div>
      <div className="md:container px-4 flex mx-auto justify-center md:pt-24 pt-0 z-30 overflow-hidden">
        <BotSvg />
      </div>
      <div className="absolute md:-top-24 -top-2 right-10 left-10 -z-20">
        <img src="/Vector.png" className="w-full h-full" style={{ objectFit: "cover" }} alt="background" />
      </div>

      <div className="flex flex-col items-center justify-center mt-4 ">
        <h2 className="text-2xl font-bold">Connect your wallet to start</h2>
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};

export default Home;
