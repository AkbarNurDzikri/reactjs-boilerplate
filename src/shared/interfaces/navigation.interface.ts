import type React from "react";
import type { IUserContext } from "./user-context.interface";

/**
 * Interface untuk menu item dalam sidebar
 * Mendukung nested menu dengan children
 */
export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  children?: MenuItem[];
}

/**
 * Interface untuk konten halaman
 * Digunakan untuk render konten dinamis setiap route
 */
export interface PageContent {
  title: string;
  description: string;
  content: React.ReactNode;
}

/**
 * Props untuk SidebarMenuItem component
 */
export interface SidebarMenuItemProps {
  item: MenuItem;
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpen: boolean;
}

/**
 * Props untuk Sidebar component
 */
export interface SidebarProps {
  isOpen: boolean;
  currentPath: string;
  onNavigate: (path: string) => void;
}

/**
 * Props untuk Navbar component
 */
export interface NavbarProps {
  onToggleSidebar: () => void;
  isOpen: boolean;
  user: IUserContext;
}

/**
 * Props untuk PageContent component
 */
export interface PageContentProps {
  title: string;
  description: string;
  children: React.ReactNode;
}
