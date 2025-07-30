import { apiRequest } from './apiClient';

/**
 * AboutMe API service
 * Handles operations related to the AboutMe section
 */

export const aboutMeApi = {
  /**
   * Get AboutMe data by ID
   * @param {number} id - AboutMe record ID (typically 1)
   * @returns {Promise<Object>} AboutMe data
   */
  getById: async (id = 1) => {
    try {
      return await apiRequest(`/api/aboutme/${id}`);
    } catch (error) {
      console.error('Failed to fetch AboutMe data:', error);
      throw error;
    }
  },
  
  /**
   * Update AboutMe data
   * @param {number} id - AboutMe record ID (typically 1)
   * @param {Object} data - AboutMe data to update
   * @returns {Promise<Object>} Updated AboutMe data
   */
  update: async (id, data) => {
    try {
      return await apiRequest(`/api/aboutme/${id}`, 'PUT', data, true);
    } catch (error) {
      console.error('Failed to update AboutMe data:', error);
      throw error;
    }
  }
};

/**
 * Helper function to get only contact info from AboutMe data
 * @returns {Promise<Object>} Contact info (email, phone)
 */
export const getContactInfo = async () => {
  try {
    const aboutMeData = await aboutMeApi.getById(1);
    
    return {
      email: aboutMeData.email || null,
      phone: aboutMeData.phone || null
    };
  } catch (error) {
    console.error('Failed to get contact info:', error);
    // Return default values in case of error
    return {
      email: null,
      phone: null
    };
  }
};
