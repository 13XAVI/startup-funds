"use client";

import { useState } from "react";
import AdminNav from "./AdminNav";
import DashboardSidebar from "./DashboardSidebar";

function AdminDash() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <button
          className="lg:hidden flex items-center py-2 px-6 "
          aria-label="Toggle navigation"
          onClick={handleToggleMenu}
        ></button>
        <AdminNav />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${toggleMenu ? "block fixed bg-white" : "hidden"} lg:flex lg:flex-shrink-0  border-r h-screen border-gray-300`}
          onClick={toggleMenu ? handleToggleMenu : undefined}
        >
          <DashboardSidebar />
        </div>

        {/* Content Area */}
        <div
          className={`flex-1 pt-5 bg-grayAdm lg:px-10 ${toggleMenu ? "lg:ml-64" : ""}`}
          onClick={toggleMenu ? handleToggleMenu : undefined}
        >
          Dashboard Switch
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
