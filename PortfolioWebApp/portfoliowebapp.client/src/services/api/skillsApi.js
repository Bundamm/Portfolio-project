import { apiRequest } from './apiClient';

/**
 * Skills API service
 * Handles operations related to skills
 */
export const skillsApi = {
  /**
   * Get all skills
   * @returns {Promise<Array>} List of skills
   */
  getAll: async () => {
    try {
      return await apiRequest('/api/skills');
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      throw error;
    }
  },

  /**
   * Get skill by ID
   * @param {number} id - Skill ID
   * @returns {Promise<Object>} Skill data
   */
  getById: async (id) => {
    try {
      return await apiRequest(`/api/skills/${id}`);
    } catch (error) {
      console.error(`Failed to fetch skill with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new skill (admin only)
   * @param {Object} skillData - Skill data to create
   * @returns {Promise<Object>} Created skill
   */
  create: async (skillData) => {
    try {
      return await apiRequest('/api/skills', 'POST', skillData, true);
    } catch (error) {
      console.error('Failed to create skill:', error);
      throw error;
    }
  },

  /**
   * Update an existing skill (admin only)
   * @param {number} id - Skill ID to update
   * @param {Object} skillData - Updated skill data
   * @returns {Promise<Object>} Updated skill
   */
  update: async (id, skillData) => {
    try {
      return await apiRequest(`/api/skills/${id}`, 'PUT', skillData, true);
    } catch (error) {
      console.error(`Failed to update skill with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a skill (admin only)
   * @param {number} id - Skill ID to delete
   * @returns {Promise<boolean>} Whether deletion was successful
   */
  delete: async (id) => {
    try {
      await apiRequest(`/api/skills/${id}`, 'DELETE', null, true);
      return true;
    } catch (error) {
      console.error(`Failed to delete skill with ID ${id}:`, error);
      throw error;
    }
  }
};
