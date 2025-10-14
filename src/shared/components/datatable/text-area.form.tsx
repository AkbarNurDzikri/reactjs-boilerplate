import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { ReactNode, MouseEventHandler } from "react";
import { Textarea } from "@/components/ui/textarea";

export interface FormTextareaProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onIconClick?: MouseEventHandler<HTMLButtonElement>;
  prefix?: string;
  suffix?: string;
  rows?: number;
  className?: string;
}

export function FormTextarea<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  icon,
  iconPosition = "right",
  onIconClick,
  prefix,
  suffix,
  rows = 4,
  className,
}: FormTextareaProps<TFieldValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-3">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative flex items-start">
              {/* Prefix */}
              {prefix && (
                <span className="absolute left-3 top-3 text-gray-500 text-sm select-none">
                  {prefix}
                </span>
              )}

              {/* Icon kiri */}
              {icon && iconPosition === "left" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onIconClick?.(e);
                  }}
                  className="absolute left-3 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {icon}
                </button>
              )}

              <Textarea
                {...field}
                placeholder={placeholder}
                rows={rows}
                className={cn(
                  prefix ? "pl-10" : "",
                  icon && iconPosition === "left" ? "pl-10" : "",
                  icon && iconPosition === "right" ? "pr-10" : "",
                  suffix ? "pr-12" : "",
                  className
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
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {icon}
                </button>
              )}

              {/* Suffix */}
              {suffix && (
                <span className="absolute right-3 top-3 text-gray-500 text-sm select-none">
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
