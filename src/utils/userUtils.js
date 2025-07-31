/**
 * Utility functions for user management
 */

/**
 * Simulates user login by setting userId in localStorage
 * In a real app, this would involve authentication
 */
export const simulateLogin = () => {
  const userId = 'user-' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('userId', userId);
  return userId;
};

/**
 * Simulates user logout
 */
export const simulateLogout = () => {
  localStorage.removeItem('userId');
};

/**
 * Checks if user is logged in
 */
export const isUserLoggedIn = () => {
  return !!localStorage.getItem('userId');
};

/**
 * Gets current user ID
 */
export const getCurrentUserId = () => {
  return localStorage.getItem('userId');
};