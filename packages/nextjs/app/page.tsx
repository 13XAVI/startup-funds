/* eslint-disable @next/next/no-img-element */
"use client";

import type { NextPage } from "next";
import Background from "~~/components/Background";
import { BotSvg } from "~~/components/SVGs/SVGs";

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className=" absolute md:-top-12 top-12 -z-10 ">
          <Background />
        </div>
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">StartUp Fundraising Platform</span>
          </h1>
        </div>
        <div className="md:container px-4 flex mx-auto justify-center md:pt-24 pt-0 z-30 overflow-hidden">
          <BotSvg />
        </div>
        <div className="absolute md:-top-16 -top-2 right-10 left-10 -z-20">
          <img src="/Vector.png" className="w-full h-full" style={{ objectFit: "cover" }} alt="background" />
        </div>
      </div>
    </>
  );
};

export default Home;
