"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * PasswordInput component with visibility toggle
 *
 * @param {Object} props - The component props
 * @param {string} props.label - The label for the password input
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} props.value - The password value
 * @param {Function} props.onChange - Change handler
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.className] - Additional class names
 * @returns {React.JSX.Element} The rendered PasswordInput component
 */
export function PasswordInput({
  label,
  placeholder = "Your password",
  value,
  onChange,
  error,
  className,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor="password">{label}</Label>}
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          className="pr-10"
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
