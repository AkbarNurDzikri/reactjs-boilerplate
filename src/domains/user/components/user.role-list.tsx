import { Spinner } from "@/components/ui/spinner";
import { useRolesToggle } from "../hooks/use-roles.toggle";
import { useRoles } from "../hooks/use-roles.query";
import { Switch } from "@/components/ui/switch";

type RoleListProps = {
  userId: string;
};

export const RoleList = ({ userId }: RoleListProps) => {
  const { data, isLoading } = useRoles(userId);
  const toggleMutation = useRolesToggle(userId);

  if (!data || data?.all?.length === 0)
    return (
      <p className="text-sm text-muted-foreground text-center">
        No Roles available.
      </p>
    );

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="max-h-[500px] overflow-y-auto space-y-1">
      {data?.all?.map((role) => {
        const isAssigned = data?.assigned?.includes(role.id);

        return (
          <div
            key={role.id}
            className="flex items-center justify-between rounded-md border p-2 hover:bg-muted/40 transition"
          >
            <div>
              <p className="font-medium text-sm">{role.name}</p>
              {role.description && (
                <p className="text-xs text-muted-foreground">
                  {role.description}
                </p>
              )}
            </div>
            <Switch
              checked={isAssigned}
              onCheckedChange={() => toggleMutation.mutate(role.id)}
              disabled={toggleMutation.isPending}
              className="cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
};
