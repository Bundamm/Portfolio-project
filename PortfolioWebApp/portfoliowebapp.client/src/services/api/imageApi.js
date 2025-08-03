import { apiRequest } from './apiClient';

/**
 * Image API service
 * Handles operations related to project images
 */
export const imageApi = {
  /**
   * Get all images
   * @returns {Promise<Array>} Array of images
   */
  getAll: async () => {
    try {
      return await apiRequest('/api/image');
    } catch (error) {
      console.error('Failed to fetch images:', error);
      throw error;
    }
  },
  
  /**
   * Get an image by ID
   * @param {number} id - Image ID
   * @returns {Promise<Object>} Image data
   */
  getById: async (id) => {
    try {
      return await apiRequest(`/api/image/${id}`);
    } catch (error) {
      console.error(`Failed to fetch image with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Create a new image associated with a project
   * @param {number} projectId - Project ID
   * @param {Object} imageData - Image data
   * @returns {Promise<Object>} Created image
   */
  create: async (projectId, imageData) => {
    try {
      return await apiRequest(`/api/image/${projectId}`, 'POST', imageData, true);
    } catch (error) {
      console.error('Failed to create image:', error);
      throw error;
    }
  },
  
  /**
   * Update an image
   * @param {number} id - Image ID
   * @param {Object} imageData - Image data to update
   * @returns {Promise<Object>} Updated image
   */
  update: async (id, imageData) => {
    try {
      return await apiRequest(`/api/image/${id}`, 'PUT', imageData, true);
    } catch (error) {
      console.error(`Failed to update image with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Delete an image
   * @param {number} id - Image ID
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      return await apiRequest(`/api/image/${id}`, 'DELETE', null, true);
    } catch (error) {
      console.error(`Failed to delete image with ID ${id}:`, error);
      throw error;
    }
  }
};
