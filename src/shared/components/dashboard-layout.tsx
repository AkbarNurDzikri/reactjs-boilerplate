import type React from "react";
import { useState } from "react";
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();
  const handleNavigate = (path: string): void => {
    navigate(path);
  };

  const user = useLoaderData();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={sidebarOpen}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar Component */}
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isOpen={sidebarOpen}
          user={user}
        />
        <Outlet />
      </div>
    </div>
  );
};
