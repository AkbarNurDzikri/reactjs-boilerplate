import { Button } from "@/components/ui/button";
import type { NavbarProps } from "../interfaces/navigation.interface";
import {
  LogOut,
  PanelLeftClose,
  PanelRightClose,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import apiClient from "../lib/api-client";
import { useNavigate } from "react-router";
import { stringTruncate } from "../utils/string-truncate";

export const Navbar: React.FC<NavbarProps> = ({
  isOpen,
  onToggleSidebar,
  user,
}) => {
  const navigate = useNavigate();
  return (
    <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left Section: Toggle & Title */}
      <div className="flex items-center gap-4">
        <>
          {/* Sidebar Toggle Button */}
          {isOpen ? (
            <PanelLeftClose
              className="w-5 h-5 cursor-pointer hover:text-muted-foreground"
              onClick={onToggleSidebar}
            />
          ) : (
            <PanelRightClose
              className="w-5 h-5 cursor-pointer hover:text-muted-foreground"
              onClick={onToggleSidebar}
            />
          )}

          {/* <h2 className="text-xl font-bold">Dashboard</h2> */}
          {/* tambahkan jam digital disini */}
        </>
      </div>

      {/* Right Section: User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src="/user-default.svg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="font-medium">{stringTruncate(user.name, 10)}</span>
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown Menu Content */}
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Profile Menu Item */}
          <DropdownMenuItem className="cursor-pointer">
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>

          {/* Settings Menu Item */}
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Logout Menu Item */}
          <DropdownMenuItem
            className="cursor-pointer text-red-600"
            onClick={async () => {
              const res = await apiClient.post(`/auth/logout`);
              if (res.success) {
                navigate("/signin");
              }
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
