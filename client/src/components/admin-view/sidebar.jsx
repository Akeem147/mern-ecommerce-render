import { ChartNoAxesCombined, LayoutDashboard, ListChecks,ShoppingCart } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function MenuItems({setOpen}) {
  const navigate = useNavigate();

  const adminSidebarMenu = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },

    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <ShoppingCart />,
    },

    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <ListChecks />,
    },
  ];

  return (
    <nav className="mt-8 flex flex-col gap-3">
      {adminSidebarMenu.map((menuItem) => (
        <div
        onClick={() => {
          navigate(menuItem.path);
          setOpen ? setOpen(false) : null
        }}
          key={menuItem.id}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground text-xl cursor-pointer"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSidebar({open, setOpen}) {
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
           <SheetHeader className="border-b">
            <SheetTitle className="flex gap-2">
            <ChartNoAxesCombined size={30} />
              <span>Admin panel</span>
            </SheetTitle>
           </SheetHeader>
           <MenuItems setOpen={setOpen}/>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-[240px] flex-col border-r bg-background px-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
