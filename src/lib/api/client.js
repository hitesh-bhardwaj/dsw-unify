/**
 * Base API Client
 *
 * This is a mock API client that simulates API calls.
 * TODO: Backend team - Replace mock responses with actual fetch calls
 *
 * @module api/client
 */

/**
 * Simulates an API delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Base API configuration
 */
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
  timeout: process.env.NEXT_PUBLIC_API_TIMEOUT || 30000,
  tokenKey: process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || 'auth_token',
};

/**
 * Get stored auth token
 * @returns {string|null}
 */
export function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(API_CONFIG.tokenKey);
}

/**
 * Store auth token
 * @param {string} token
 */
export function setAuthToken(token) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(API_CONFIG.tokenKey, token);
}

/**
 * Remove auth token
 */
export function removeAuthToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(API_CONFIG.tokenKey);
}

/**
 * Mock API call - Returns data after a simulated delay
 *
 * TODO: Backend team - Replace this with actual fetch implementation:
 *
 * export async function apiCall(endpoint, options = {}) {
 *   const token = getAuthToken();
 *   const headers = {
 *     'Content-Type': 'application/json',
 *     ...(token && { Authorization: `Bearer ${token}` }),
 *     ...options.headers,
 *   };
 *
 *   const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
 *     ...options,
 *     headers,
 *   });
 *
 *   if (!response.ok) {
 *     throw new Error(`API Error: ${response.statusText}`);
 *   }
 *
 *   return response.json();
 * }
 *
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @param {Object} mockData - Mock data to return
 * @returns {Promise<any>}
 */
export async function apiCall(endpoint, options = {}, mockData = {}) {
  // Simulate network delay
  await delay(300);

  console.log(`[MOCK API] ${options.method || 'GET'} ${endpoint}`, {
    options,
    mockData
  });

  // Return mock data
  return mockData;
}

/**
 * Handle API errors
 * @param {Error} error
 * @throws {Error}
 */
export function handleApiError(error) {
  console.error('[API Error]', error);

  // TODO: Backend team - Add proper error handling
  // - Parse error response
  // - Extract error message
  // - Handle different error codes (401, 403, 404, 500)

  throw error;
}
