import { apiRequest, setAuthToken } from './apiClient';

/**
 * Auth API service
 */
export const authApi = {
  /**
   * Log in a user
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise<Object>} User data with token
   */
  login: async (username, password) => {
    try {
      const loginData = { username, password };
      const response = await apiRequest('/api/account/login', 'POST', loginData);
      
      // Save token to local storage
      if (response && response.token) {
        setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  /**
   * Log out the current user
   */
  logout: () => {
    setAuthToken(null);
  }
};
