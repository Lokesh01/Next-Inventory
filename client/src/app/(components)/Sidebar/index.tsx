"use client";

import { useAppSelector } from "@/app/redux";
import { setIsSideBarCollapsed } from "@/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const sidebarLinks = [
  {
    id: 1,
    href: "/dashboard",
    icon: Layout,
    label: "Dashboard",
  },
  {
    id: 2,
    href: "/inventory",
    icon: Archive,
    label: "Inventory",
  },
  {
    id: 3,
    href: "/products",
    icon: Clipboard,
    label: "Products",
  },
  {
    id: 4,
    href: "/users",
    icon: User,
    label: "User",
  },
  {
    id: 5,
    href: "/settings",
    icon: SlidersHorizontal,
    label: "Settings",
  },
  {
    id: 6,
    href: "/expenses",
    icon: CircleDollarSign,
    label: "Expenses",
  },
];

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "text-white bg-blue-200" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const toggleSideBar = () => {
    dispatch(setIsSideBarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={sidebarClassNames}>
      {/* Top Logo */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>logo</div>
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          Lokesh
        </h1>

        <button
          className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSideBar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Links */}
      <div className="flex-grow mt-8">
        {sidebarLinks.map((link) => {
          return (
            <SidebarLink
              key={link.id}
              href={link.href}
              icon={link.icon}
              label={link.label}
              isCollapsed={isSidebarCollapsed}
            />
          );
        })}
      </div>

      {/* Footer */}
      <div></div>
    </div>
  );
};

export default Sidebar;
