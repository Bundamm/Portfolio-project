import { apiRequest } from './apiClient';

/**
 * Experience API service
 * Handles operations related to professional experience
 */
export const experienceApi = {
  /**
   * Get experience by ID
   * @param {number} id - Experience ID
   * @returns {Promise<Object>} Experience data
   */
  getById: async (id) => {
    try {
      return await apiRequest(`/api/experience/${id}`);
    } catch (error) {
      console.error(`Failed to fetch experience with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get experiences associated with a specific AboutMe profile
   * @param {number} aboutMeId - AboutMe profile ID
   * @returns {Promise<Array>} List of experiences
   */
  getByAboutMeId: async (aboutMeId) => {
    try {
      return await apiRequest(`/api/experience/aboutme/${aboutMeId}`);
    } catch (error) {
      console.error(`Failed to fetch experiences for AboutMe ID ${aboutMeId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new experience entry (admin only)
   * @param {number} aboutMeId - AboutMe profile ID to associate with
   * @param {Object} experienceData - Experience data to create
   * @returns {Promise<Object>} Created experience
   */
  create: async (aboutMeId, experienceData) => {
    try {
      return await apiRequest(`/api/experience/aboutme/${aboutMeId}`, 'POST', experienceData, true);
    } catch (error) {
      console.error('Failed to create experience:', error);
      throw error;
    }
  },

  /**
   * Update an existing experience entry (admin only)
   * @param {number} id - Experience ID to update
   * @param {Object} experienceData - Updated experience data
   * @returns {Promise<Object>} Updated experience
   */
  update: async (id, experienceData) => {
    try {
      return await apiRequest(`/api/experience/${id}`, 'PUT', experienceData, true);
    } catch (error) {
      console.error(`Failed to update experience with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete an experience entry (admin only)
   * @param {number} id - Experience ID to delete
   * @returns {Promise<boolean>} Whether deletion was successful
   */
  delete: async (id) => {
    try {
      await apiRequest(`/api/experience/${id}`, 'DELETE', null, true);
      return true;
    } catch (error) {
      console.error(`Failed to delete experience with ID ${id}:`, error);
      throw error;
    }
  }
};
