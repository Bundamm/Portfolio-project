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
      const loginData = { Username: username, Password: password };
      const response = await apiRequest('/api/account/login', 'POST', loginData);
      
      // Save token to local storage - handle both uppercase and lowercase
      const token = response && (response.Token || response.token);
      if (token) {
        setAuthToken(token);
      }
      
      return response;
    } catch (error) {
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
