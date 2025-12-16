/**
 * Authentication API Service
 *
 * This module contains mock authentication functions.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/auth
 */

import { apiCall } from "./client";

/**
 * @typedef {import("@/types/auth").User} User
 * @typedef {import("@/types/auth").LoginRequest} LoginRequest
 * @typedef {import("@/types/auth").LoginResponse} LoginResponse
 * @typedef {import("@/types/auth").ForgotPasswordRequest} ForgotPasswordRequest
 * @typedef {import("@/types/auth").ForgotPasswordResponse} ForgotPasswordResponse
 * @typedef {import("@/types/auth").VerifyOTPRequest} VerifyOTPRequest
 * @typedef {import("@/types/auth").VerifyOTPResponse} VerifyOTPResponse
 * @typedef {import("@/types/auth").ResetPasswordRequest} ResetPasswordRequest
 * @typedef {import("@/types/auth").ResetPasswordResponse} ResetPasswordResponse
 */

/**
 * Login user
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/auth/login
 * Body: { email, password, rememberMe }
 * Response: { token, user }
 *
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {boolean} [rememberMe=false] - Remember me option
 * @returns {Promise<LoginResponse>}
 */
export async function login(email, password, rememberMe = false) {
  const mockResponse = {
    token: "mock-jwt-token-" + Date.now(),
    user: {
      id: 1,
      name: "John Doe",
      email: email,
      avatar: "https://github.com/shadcn.png",
    },
  };

  return apiCall(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password, rememberMe }),
    },
    mockResponse
  );
}

/**
 * Logout user
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/auth/logout
 * Headers: { Authorization: Bearer <token> }
 *
 * @returns {Promise<{success: boolean}>}
 */
export async function logout() {
  const mockResponse = { success: true };

  return apiCall(
    "/auth/logout",
    {
      method: "POST",
    },
    mockResponse
  );
}

/**
 * Send forgot password email
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/auth/forgot-password
 * Body: { email }
 * Response: { success, message }
 *
 * @param {string} email - User email
 * @returns {Promise<ForgotPasswordResponse>}
 */
export async function forgotPassword(email) {
  const mockResponse = {
    success: true,
    message: "Verification code sent to your email",
  };

  return apiCall(
    "/auth/forgot-password",
    {
      method: "POST",
      body: JSON.stringify({ email }),
    },
    mockResponse
  );
}

/**
 * Verify OTP code
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/auth/verify-otp
 * Body: { email, code }
 * Response: { success, message }
 *
 * @param {string} email - User email
 * @param {string} code - 4-digit OTP code
 * @returns {Promise<VerifyOTPResponse>}
 */
export async function verifyOTP(email, code) {
  const mockResponse = {
    success: true,
    message: "Code verified successfully",
  };

  return apiCall(
    "/auth/verify-otp",
    {
      method: "POST",
      body: JSON.stringify({ email, code }),
    },
    mockResponse
  );
}

/**
 * Reset password
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/auth/reset-password
 * Body: { email, code, newPassword, confirmPassword }
 * Response: { success, message }
 *
 * @param {string} email - User email
 * @param {string} code - 4-digit OTP code
 * @param {string} newPassword - New password
 * @param {string} confirmPassword - Password confirmation
 * @returns {Promise<ResetPasswordResponse>}
 */
export async function resetPassword(email, code, newPassword, confirmPassword) {
  const mockResponse = {
    success: true,
    message: "Password reset successfully",
  };

  return apiCall(
    "/auth/reset-password",
    {
      method: "POST",
      body: JSON.stringify({ email, code, newPassword, confirmPassword }),
    },
    mockResponse
  );
}

/**
 * Get current user
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/auth/me
 * Headers: { Authorization: Bearer <token> }
 * Response: { user }
 *
 * @returns {Promise<User>}
 */
export async function getCurrentUser() {
  const mockResponse = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png",
  };

  return apiCall("/auth/me", { method: "GET" }, mockResponse);
}
