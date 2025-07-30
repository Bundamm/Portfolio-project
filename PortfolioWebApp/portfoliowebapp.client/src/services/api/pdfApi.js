import { apiRequest } from './apiClient';

/**
 * PDF API service
 * Handles operations related to project PDFs
 */
export const pdfApi = {
  /**
   * Get all PDFs
   * @returns {Promise<Array>} Array of PDFs
   */
  getAll: async () => {
    try {
      return await apiRequest('/api/pdf');
    } catch (error) {
      console.error('Failed to fetch PDFs:', error);
      throw error;
    }
  },
  
  /**
   * Get a PDF by ID
   * @param {number} id - PDF ID
   * @returns {Promise<Object>} PDF data
   */
  getById: async (id) => {
    try {
      return await apiRequest(`/api/pdf/${id}`);
    } catch (error) {
      console.error(`Failed to fetch PDF with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Create a new PDF associated with a project
   * @param {number} projectId - Project ID
   * @param {Object} pdfData - PDF data
   * @returns {Promise<Object>} Created PDF
   */
  create: async (projectId, pdfData) => {
    try {
      return await apiRequest(`/api/pdf/${projectId}`, 'POST', pdfData, true);
    } catch (error) {
      console.error('Failed to create PDF:', error);
      throw error;
    }
  },
  
  /**
   * Update a PDF
   * @param {number} id - PDF ID
   * @param {Object} pdfData - PDF data to update
   * @returns {Promise<Object>} Updated PDF
   */
  update: async (id, pdfData) => {
    try {
      return await apiRequest(`/api/pdf/${id}`, 'PUT', pdfData, true);
    } catch (error) {
      console.error(`Failed to update PDF with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Delete a PDF
   * @param {number} id - PDF ID
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      return await apiRequest(`/api/pdf/${id}`, 'DELETE', null, true);
    } catch (error) {
      console.error(`Failed to delete PDF with ID ${id}:`, error);
      throw error;
    }
  }
};
