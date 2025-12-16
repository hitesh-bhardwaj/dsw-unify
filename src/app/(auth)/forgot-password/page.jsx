"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ReturnToLoginButton } from "@/components/auth/return-to-login-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as authApi from "@/lib/api/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = () => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const validationError = validateEmail();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      // Call forgot password API
      await authApi.forgotPassword(email);

      // Navigate to verify code page
      router.push("/forgot-password/verify-code?email=" + encodeURIComponent(email));
    } catch (error) {
      setError(error.message || "Failed to send code. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="It's okay, we have got you covered! Type your email to reset your password."
    >
      <div className="space-y-6">
        {/* Return to Login Button */}
        <div className="flex justify-center">
          <ReturnToLoginButton />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email/Username</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email ID/ Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          {/* Send Code Button */}
          <Button type="submit" className="w-full flex items-center justify-center" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Code"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
