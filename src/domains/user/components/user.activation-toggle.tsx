import { Switch } from "@/components/ui/switch";
import { userActivationService } from "../services/user-activation.service";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";

interface UserActivationToggleProps {
  userId: string;
  isActive: boolean;
  userName?: string;
}

export const UserActivationToggle = ({
  userId,
  isActive,
}: UserActivationToggleProps) => {
  const [checked, setChecked] = useState(isActive);

  const handleToggle = async (newValue: boolean) => {
    setChecked(newValue);
    await userActivationService(userId, !newValue);
  };

  return (
    <div className="flex items-center gap-3">
      <Label
        className={`${
          checked ? "text-blue-500 bg-blue-100" : "text-red-500 bg-red-100"
        } p-1 rounded-lg text-xs`}
      >
        {checked ? "Active" : "Inactive"}
      </Label>
      <Switch
        id={userId}
        checked={checked}
        onCheckedChange={handleToggle}
        className="cursor-pointer"
      />
    </div>
  );
};
