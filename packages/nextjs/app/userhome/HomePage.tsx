"use client";

import { useState } from "react";
import CampaignForm from "./CampainForm";
import TableForm from "./TxTable";

// import TableForm from "./TxTable";

function HomePage() {
  const [campainModel, setCampainModel] = useState(false);
  const HandleRegistration = () => {
    setCampainModel(!campainModel);
  };
  return (
    <div className="flex flex-col justify-around items-center mt-4 space-y-3 ">
      <button
        onClick={HandleRegistration}
        className=" flex self-end py-3 px-2 bg-[188DFA] text-white bg-blue-500 rounded-md  mr-16"
      >
        Register Campain
      </button>
      <TableForm />
      {campainModel && <CampaignForm />}
    </div>
  );
}

export default HomePage;
