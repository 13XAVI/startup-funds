"use client";

import { useRouter } from "next/navigation";
import { FaUsers } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

function DashboardSidebar() {
  const router = useRouter();
  return (
    <div className=" px-4 ">
      <div className="mt-5 space-y-10 ">
        <div
          className="flex lg:text-2xl text-xl items-center gap-2 cursor-pointer hover:bg-primary text-black hover:text-white p-2 rounded-md transition-all duration-300 ease-in-out"
          onClick={() => router.push("/userhome")}
        >
          <MdDashboard className="" />
          Campain
        </div>
        <div
          className="flex lg:text-2xl text-xl items-center gap-2 cursor-pointer hover:bg-primary text-black hover:text-white p-2 rounded-md transition-all duration-300 ease-in-out"
          onClick={() => router.push("/")}
        >
          <FaUsers className="" />
          Donate Fund
        </div>
        <div
          className="flex lg:text-2xl  text-xl items-center gap-2 cursor-pointer hover:bg-primary text-black hover:text-white p-2 rounded-md transition-all duration-300 ease-in-out"
          onClick={() => router.push("/")}
        >
          <HiOutlineDocumentReport className="" />
          Reward Tokens
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
