import { Spinner } from "@/components/ui/spinner";
import { usePermissionsToggle } from "../hooks/use-permissions.toggle";
import { usePermissions } from "../hooks/use-permissions.query";
import { Switch } from "@/components/ui/switch";

type PermissionListProps = {
  roleId: string;
};

export const PermissionList = ({ roleId }: PermissionListProps) => {
  const { data, isLoading } = usePermissions(roleId);
  const toggleMutation = usePermissionsToggle(roleId);

  if (!data || data?.all?.length === 0)
    return (
      <p className="text-sm text-muted-foreground text-center">
        No permissions available.
      </p>
    );

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="max-h-[500px] overflow-y-auto space-y-1">
      {data?.all?.map((perm) => {
        const isAssigned = data?.assigned?.includes(perm.id);

        return (
          <div
            key={perm.id}
            className="flex items-center justify-between rounded-md border p-2 hover:bg-muted/40 transition"
          >
            <div>
              <p className="font-medium text-sm">{perm.name}</p>
              {perm.description && (
                <p className="text-xs text-muted-foreground">
                  {perm.description}
                </p>
              )}
            </div>
            <Switch
              checked={isAssigned}
              onCheckedChange={() => toggleMutation.mutate(perm.id)}
              disabled={toggleMutation.isPending}
              className="cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
};
