import { apiRequest } from './apiClient';

/**
 * Projects API service
 * Handles operations related to portfolio projects
 */
export const projectsApi = {
  /**
   * Get all projects
   * @returns {Promise<Array>} Array of projects
   */
  getAll: async () => {
    try {
      return await apiRequest('/api/projects');
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  },
  
  /**
   * Get a project by ID
   * @param {number} id - Project ID
   * @returns {Promise<Object>} Project data
   */
  getById: async (id) => {
    try {
      return await apiRequest(`/api/projects/${id}`);
    } catch (error) {
      console.error(`Failed to fetch project with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Create a new project
   * @param {number} categoryId - Category ID
   * @param {Object} projectData - Project data
   * @returns {Promise<Object>} Created project
   */
  create: async (categoryId, projectData) => {
    try {
      return await apiRequest(`/api/projects/${categoryId}`, 'POST', projectData, true);
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  },
  
  /**
   * Update a project
   * @param {number} id - Project ID
   * @param {number} categoryId - Category ID
   * @param {Object} projectData - Project data to update
   * @returns {Promise<Object>} Updated project
   */
  update: async (id, categoryId, projectData) => {
    try {
      return await apiRequest(`/api/projects/${categoryId}?id=${id}`, 'PUT', projectData, true);
    } catch (error) {
      console.error(`Failed to update project with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Delete a project
   * @param {number} id - Project ID
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      return await apiRequest(`/api/projects/${id}`, 'DELETE', null, true);
    } catch (error) {
      console.error(`Failed to delete project with ID ${id}:`, error);
      throw error;
    }
  }
};
