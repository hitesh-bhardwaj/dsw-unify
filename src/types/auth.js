/**
 * Authentication Type Definitions
 * @module types/auth
 */

/**
 * User object
 * @typedef {Object} User
 * @property {number} id - User ID
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {string} avatar - Avatar URL
 */

/**
 * Login request payload
 * @typedef {Object} LoginRequest
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {boolean} [rememberMe] - Remember me option
 */

/**
 * Login response
 * @typedef {Object} LoginResponse
 * @property {string} token - JWT authentication token
 * @property {User} user - User information
 */

/**
 * Forgot password request
 * @typedef {Object} ForgotPasswordRequest
 * @property {string} email - User's email address
 */

/**
 * Forgot password response
 * @typedef {Object} ForgotPasswordResponse
 * @property {boolean} success - Operation success status
 * @property {string} message - Success/error message
 */

/**
 * Verify OTP request
 * @typedef {Object} VerifyOTPRequest
 * @property {string} email - User's email address
 * @property {string} code - 4-digit OTP code
 */

/**
 * Verify OTP response
 * @typedef {Object} VerifyOTPResponse
 * @property {boolean} success - Verification success status
 * @property {string} message - Success/error message
 */

/**
 * Reset password request
 * @typedef {Object} ResetPasswordRequest
 * @property {string} email - User's email address
 * @property {string} code - 4-digit OTP code
 * @property {string} newPassword - New password
 * @property {string} confirmPassword - Password confirmation
 */

/**
 * Reset password response
 * @typedef {Object} ResetPasswordResponse
 * @property {boolean} success - Operation success status
 * @property {string} message - Success/error message
 */

export {};
