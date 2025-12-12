"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ReturnToLoginButton } from "@/components/auth/return-to-login-button";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";

export default function ChangePasswordPage() {
  const router = useRouter();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate password change (no backend integration yet)
    setTimeout(() => {
      router.push("/login");
    }, 500);
  };

  return (
    <AuthLayout
      title="Change Password"
      subtitle="Add a new password for abc@dsw.com"
    >
      <div className="space-y-6">
        <div className="flex justify-center">
          <ReturnToLoginButton />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
    </AuthLayout>
  );
}
