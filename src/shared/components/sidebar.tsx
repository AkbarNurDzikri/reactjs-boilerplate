import type React from "react";
import type { SidebarProps } from "../interfaces/navigation.interface";
import { menuItems } from "../constants/menu";
import { SidebarMenuItem } from "./sidebar-menu-item";

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  currentPath,
  onNavigate,
}) => {
  return (
    <aside
      className={`bg-gray-50 transition-all duration-400 overflow-hidden ${
        isOpen ? "w-52" : "w-0"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-center gap-3 border-b border-gray-200">
          <img src="/vite.svg" />
          <h1 className={`font-bold text-xl ${!isOpen && "hidden"}`}>
            App Name
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto border-r">
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.id}
              item={item}
              currentPath={currentPath}
              onNavigate={onNavigate}
              isOpen={isOpen}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};
