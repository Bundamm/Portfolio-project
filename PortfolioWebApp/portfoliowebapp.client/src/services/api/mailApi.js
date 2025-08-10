import { apiRequest } from './apiClient';

/**
 * Send a contact form email using the Mail API
 * @param {Object} contactForm - The contact form data
 * @param {string} contactForm.name - The sender's name
 * @param {string} contactForm.email - The sender's email
 * @param {string} contactForm.subject - The email subject
 * @param {string} contactForm.message - The email message content
 * @returns {Promise<Object>} Response data from the API
 */
export const sendContactEmail = async (contactForm) => {
  return apiRequest('/api/contact/send', 'POST', contactForm);
};
