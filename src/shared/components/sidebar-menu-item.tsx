import { useState } from "react";
import type { SidebarMenuItemProps } from "../interfaces/navigation.interface";
import { ChevronDown, ChevronRight } from "lucide-react";

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  currentPath,
  onNavigate,
  isOpen,
}) => {
  // State untuk expand/collapse accordion
  const [isExpanded, setIsExpanded] = useState(false);

  // Check apakah menu item ini atau child-nya sedang aktif
  const isActive =
    currentPath === item.path ||
    (item.children &&
      item.children.some((child) => child.path === currentPath));

  const Icon = item.icon;

  // Render menu dengan children (accordion menu)
  if (item.children) {
    return (
      <div>
        {/* Parent menu button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </div>
          {isOpen &&
            (isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            ))}
        </button>

        {/* Children menu items (submenu) */}
        {isExpanded && isOpen && (
          <div className="ml-2 mt-1 space-y-1">
            {item.children.map((child) => (
              <button
                key={child.id}
                onClick={() => onNavigate(child.path)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                  currentPath === child.path
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <child.icon className="w-4 h-4" />
                <span>{child.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render single menu item (tanpa children)
  return (
    <button
      onClick={() => onNavigate(item.path)}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
        isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-5 h-5" />
      {isOpen && <span className="font-medium">{item.label}</span>}
    </button>
  );
};
