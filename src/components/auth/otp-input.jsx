"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/**
 * OTPInput component for 4-digit OTP entry with auto-focus
 *
 * @param {Object} props - The component props
 * @param {string} props.value - The OTP value (4 digits)
 * @param {Function} props.onChange - Change handler that receives the full OTP string
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.label] - Optional label for the OTP input
 * @returns {React.JSX.Element} The rendered OTPInput component
 */
export function OTPInput({ value = "", onChange, error, label = "Enter 4 digit code" }) {
  const inputRefs = useRef([]);
  const digits = value.split("").concat(Array(4 - value.length).fill(""));

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, digit) => {
    // Only allow numbers
    if (digit && !/^\d$/.test(digit)) {
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = digit;
    const newValue = newDigits.join("").slice(0, 4);
    onChange(newValue);

    // Auto-advance to next input
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newDigits = [...digits];
        newDigits[index] = "";
        const newValue = newDigits.join("").replace(/\s/g, "");
        onChange(newValue);
      }
    }

    // Handle left/right arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    onChange(pasteData);

    // Focus the last filled input or the next empty one
    const nextIndex = Math.min(pasteData.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="space-y-2">
      {label && <Label className="block text-center">{label}</Label>}
      <div className="flex justify-center gap-3">
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength={1}
            value={digits[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            aria-invalid={!!error}
            className={cn(
              "h-14 w-14 rounded-md border border-border-color-0 bg-transparent text-center text-2xl font-semibold text-foreground shadow-xs transition-all outline-none",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
        ))}
      </div>
      {error && (
        <p className="text-center text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
