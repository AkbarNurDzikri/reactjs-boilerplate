import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { ReactNode, MouseEventHandler } from "react";

type InputType = "text" | "number" | "email" | "password";

export interface FormInputProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  type?: InputType;
  placeholder?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  description?: string;
  onIconClick?: MouseEventHandler<HTMLButtonElement>;
  prefix?: string;
  suffix?: string;
}

export function FormInput<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  type = "text",
  placeholder,
  icon,
  iconPosition = "right",
  description,
  onIconClick,
  prefix,
  suffix,
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-3">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative flex items-center">
              {/* Prefix */}
              {prefix && (
                <span className="absolute left-3 text-gray-500 text-sm select-none">
                  {prefix}
                </span>
              )}

              {/* Icon kiri */}
              {icon && iconPosition === "left" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault(); // mencegah submit
                    e.stopPropagation(); // hentikan bubbling
                    onIconClick?.(e);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {icon}
                </button>
              )}

              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className={cn(
                  prefix ? "pl-10" : "",
                  icon && iconPosition === "left" ? "pl-10" : "",
                  icon && iconPosition === "right" ? "pr-10" : "",
                  suffix ? "pr-12" : ""
                )}
              />

              {/* Icon kanan */}
              {icon && iconPosition === "right" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onIconClick?.(e);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {icon}
                </button>
              )}

              {/* Suffix */}
              {suffix && (
                <span className="absolute right-3 text-gray-500 text-sm select-none">
                  {suffix}
                </span>
              )}
            </div>
          </FormControl>
          {description && (
            <FormDescription className="-mt-2">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
