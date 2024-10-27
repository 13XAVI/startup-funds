"use client";

import React, { useState } from "react";
import CampainForm from "./CampainForm";

// import TableForm from "./TxTable";

function HomePage() {
  const [campainModel, setCampainModel] = useState(false);
  const HandleRegistration = () => {
    setCampainModel(!campainModel);
  };
  return (
    <div className="flex justify-around items-center">
      <button onClick={HandleRegistration} className=" py-3 px-6 bg-[188DFA] text-white ">
        Register Campain
      </button>
      {/* <TableForm /> */}
      {campainModel && <CampainForm />}
    </div>
  );
}

export default HomePage;
