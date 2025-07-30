/**
 * Base API client for making requests to the backend
 */

// Auth token management
export const getAuthToken = () => {
  // For development, you can hardcode a token here
  // const hardcodedToken = "YOUR_JWT_TOKEN_HERE";
  // return hardcodedToken ? `Bearer ${hardcodedToken}` : null;
  
  const token = localStorage.getItem('authToken');
  return token ? `Bearer ${token}` : null;
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Generic API request handler
export const apiRequest = async (endpoint, method = 'GET', data = null, requiresAuth = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  // Add auth token if available or required
  const token = getAuthToken();
  if (requiresAuth && !token) {
    throw new Error('Authentication required');
  }
  
  if (token) {
    headers['Authorization'] = token;
  }
  
  const config = {
    method,
    headers,
    credentials: 'include'
  };
  
  if (data && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(data);
  }
  
  const response = await fetch(endpoint, config);
  
  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized (could redirect to login)
      setAuthToken(null); // Clear invalid token
    }
    
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || response.statusText;
    } catch {
      errorMessage = response.statusText;
    }
    
    throw new Error(`API Error (${response.status}): ${errorMessage}`);
  }
  
  // Handle empty responses
  if (response.status === 204) {
    return null;
  }
  
  // Check if response is JSON
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  
  return await response.text();
};
