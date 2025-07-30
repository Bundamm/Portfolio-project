/**
 * API Services Index
 * Exports all API services for easy importing throughout the application
 */

// Base API utilities
export { apiRequest, getAuthToken, setAuthToken, isAuthenticated } from './apiClient';

// API Services
export { aboutMeApi, getContactInfo } from './aboutMeApi';
export { projectsApi } from './projectsApi';
export { categoryApi } from './categoryApi';
export { authApi } from './authApi';
export { imageApi } from './imageApi';
export { pdfApi } from './pdfApi';
