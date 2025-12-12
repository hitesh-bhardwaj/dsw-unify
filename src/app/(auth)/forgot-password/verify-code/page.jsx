"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ReturnToLoginButton } from "@/components/auth/return-to-login-button";
import { OTPInput } from "@/components/auth/otp-input";
import { Button } from "@/components/ui/button";

export default function VerifyCodePage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateOTP = () => {
    if (otp && otp.length !== 4) {
      return "Please enter all 4 digits";
    }
    if (otp && !/^\d{4}$/.test(otp)) {
      return "Please enter valid numbers only";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const validationError = validateOTP();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    // Simulate verifying code (no backend integration)
    setTimeout(() => {
      router.push("/forgot-password/change-password");
    }, 500);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Type the 4 digit code send to your email"
    >
      <div className="space-y-6">
        {/* Return to Login Button */}
        <div className="flex justify-center">
          <ReturnToLoginButton />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <OTPInput value={otp} onChange={setOtp} error={error} />

          {/* Verify Code Button */}
          <Button type="submit" className="w-full flex items-center justify-center" disabled={isSubmitting}>
            {isSubmitting ? "Verifying..." : "Verify Code"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
