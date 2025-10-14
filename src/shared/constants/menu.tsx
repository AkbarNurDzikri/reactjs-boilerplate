import type { MenuItem } from "@/shared/interfaces/navigation.interface";
import { Database, LayoutDashboard, UserCog, Users } from "lucide-react";

/**
 * Konfigurasi menu sidebar
 * Definisikan semua menu dan submenu di sini
 */
export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "master",
    label: "Master",
    icon: Database,
    path: "/master",
    children: [
      { id: "users", label: "Users", icon: Users, path: "/users" },
      { id: "roles", label: "Roles", icon: UserCog, path: "/roles" },
    ],
  },
];
