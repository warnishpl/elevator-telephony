"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";

interface SidebarContainer {
  isSidebarOpen: boolean;
}

export default function SidebarContainer({ isSidebarOpen }: SidebarContainer) {
  const pathname = usePathname();

  return <Sidebar pathname={pathname} isSidebarOpen={isSidebarOpen}></Sidebar>;
}
