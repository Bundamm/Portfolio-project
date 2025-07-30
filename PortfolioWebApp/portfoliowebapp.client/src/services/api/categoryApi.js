import { apiRequest } from './apiClient';

/**
 * Category API service
 * Handles operations related to project categories
 */
export const categoryApi = {
  /**
   * Get all categories
   * @returns {Promise<Array>} Array of categories
   */
  getAll: async () => {
    try {
      return await apiRequest('/api/category');
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  },
  
  /**
   * Get a category by ID
   * @param {number} id - Category ID
   * @returns {Promise<Object>} Category data
   */
  getById: async (id) => {
    try {
      return await apiRequest(`/api/category/${id}`);
    } catch (error) {
      console.error(`Failed to fetch category with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Create a new category
   * @param {Object} categoryData - Category data
   * @returns {Promise<Object>} Created category
   */
  create: async (categoryData) => {
    try {
      return await apiRequest('/api/category', 'POST', categoryData, true);
    } catch (error) {
      console.error('Failed to create category:', error);
      throw error;
    }
  },
  
  /**
   * Update a category
   * @param {number} id - Category ID
   * @param {Object} categoryData - Category data to update
   * @returns {Promise<Object>} Updated category
   */
  update: async (id, categoryData) => {
    try {
      return await apiRequest(`/api/category/${id}`, 'PUT', categoryData, true);
    } catch (error) {
      console.error(`Failed to update category with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Delete a category
   * @param {number} id - Category ID
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      return await apiRequest(`/api/category/${id}`, 'DELETE', null, true);
    } catch (error) {
      console.error(`Failed to delete category with ID ${id}:`, error);
      throw error;
    }
  }
};
