import { apiRequest } from './apiClient';

/**
 * Experience API service
 * Handles operations related to professional experience
 */
export const experienceApi = {
  /**
   * Get all experiences
   * @returns {Promise<Array>} List of all experiences
   */
  getAll: async () => {
    try {
      return await apiRequest('/api/experience');
    } catch (error) {
      console.error('Failed to fetch all experiences:', error);
      throw error;
    }
  },

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
   * Create a new experience entry (admin only)
   * @param {Object} experienceData - Experience data to create
   * @returns {Promise<Object>} Created experience
   */
  create: async (experienceData) => {
    try {
      return await apiRequest('/api/experience', 'POST', experienceData, true);
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
