import React from 'react';
import ContextArea from '../common/ContextArea/ContextArea';
import Sidebar from '../common/SideBar/SideBar';
import TopBar from '../common/TopBar/TopBar';

interface UnloggedLayoutProps {
  children: React.ReactNode;
}

export default function UnloggedLayout({ children }: UnloggedLayoutProps) {
  return (
    <>
      <TopBar />
      <Sidebar />
      <ContextArea>{children}</ContextArea>
    </>
  );
}