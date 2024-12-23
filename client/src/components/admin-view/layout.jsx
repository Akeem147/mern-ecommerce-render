import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="min-h-screen flex w-full">
      <AdminSidebar open={openSideBar} setOpen={setOpenSideBar} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSideBar} />
        <main className="flex flex-col flex-1 bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
