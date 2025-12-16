"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ReturnToLoginButton } from "@/components/auth/return-to-login-button";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import * as authApi from "@/lib/api/auth";

function ChangePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Call reset password API
      await authApi.resetPassword(email, code, formData.newPassword);

      // Navigate to login page
      router.push("/login");
    } catch (error) {
      setErrors({
        general: error.message || "Failed to reset password. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <ReturnToLoginButton />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors.general && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {errors.general}
          </div>
        )}
        <PasswordInput
          label="New Password"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
        />

        <PasswordInput
          label="Verify New Password"
          placeholder="Verify New Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          error={errors.confirmPassword}
        />

        <Button
          type="submit"
          className="w-full flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Changing..." : "Change Password"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

export default function ChangePasswordPage() {
  return (
    <AuthLayout
      title="Change Password"
      subtitle="Add a new password for your account"
    >
      <Suspense fallback={<div className="space-y-6">Loading...</div>}>
        <ChangePasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
