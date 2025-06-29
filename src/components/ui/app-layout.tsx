
import { ReactNode } from "react";
import BottomNav from "./bottom-nav";
import { RoleSelector } from "./role-selector";

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function AppLayout({ children, hideNav = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="w-full border-b bg-white p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-600">Sowama</h1>
          <RoleSelector />
        </div>
      </header>
      <div className="pb-16">
        {children}
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
}

export default AppLayout;
