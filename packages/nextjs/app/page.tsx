"use client";

import { useState } from "react";
import type { NextPage } from "next";
import Background from "~~/components/Background";
import RegistrationForm from "~~/components/RegistrationForm";
import { BotSvg } from "~~/components/SVGs/SVGs";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();
  const [signupModel, setSignupMode] = useState(false);
  const HandleSignup = () => {
    setSignupMode(!signupModel);
  };

  return (
    <div className="relative w-full max-h-screen overflow-hidden">
      <div className="px-5 pt-12">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">StartUp Fundraising Platform</span>
        </h1>
      </div>
      <div className=" absolute md:-top-12 top-12 -z-10 ">
        <Background />
      </div>
      <div className="md:container px-4 flex mx-auto justify-center md:pt-24 pt-0 -z-30 overflow-hidden">
        <BotSvg />
      </div>
      <div className="absolute right-10 left-10 ">
        <img src="/Vector.png" className="w-full h-full" style={{ objectFit: "cover" }} alt="background" />
      </div>

      <div className="absolute top-32 w-full">
        <p className="w-[700px] mx-auto text-gray-300 text-center leading-[25px]">
          Welcome to Startup Funds, the innovative fundraising platform where blockchain technology meets investment
          transparency. Whether you&#39;re a startup seeking funds or an investor looking to back exciting campaigns,
          our platform ensures a secure, transparent, and rewarding experience for all.
        </p>
      </div>

      <div className="absolute  pl-5 left-1/2 -translate-x-1/2 pt-20  top-1/2 flex flex-col items-center justify-center gap-5  ">
        <h2 className="text-4xl font-bold ">Register Your Self</h2>
        <button className="border w-52 py-2 px-6 bg-violet-900 text-white rounded-full" onClick={HandleSignup}>
          Register
        </button>
      </div>

      {signupModel && <RegistrationForm />}
    </div>
  );
};

export default Home;
