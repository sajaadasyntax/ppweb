// API client service for connecting to the backend

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function for handling API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'حدث خطأ في الاتصال بالخادم');
  }
  return response.json();
};

// API client with authentication
export const apiClient = {
  // Auth endpoints
  auth: {
    login: async (mobileNumber: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber, password }),
      });
      return handleResponse(response);
    },
    register: async (userData: any) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },
    logout: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },
  
  // User endpoints
  users: {
    getProfile: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },
  
  // Content endpoints
  content: {
    getBulletins: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/api/content/bulletins`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    getArchive: async (token: string, category?: string) => {
      const url = category ? 
        `${API_BASE_URL}/api/content/archive?category=${encodeURIComponent(category)}` :
        `${API_BASE_URL}/api/content/archive`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },
  
  // Surveys endpoints
  surveys: {
    getAll: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/api/content/surveys`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    submitResponse: async (token: string, surveyId: string, answers: any) => {
      const response = await fetch(`${API_BASE_URL}/api/content/surveys/${surveyId}/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });
      return handleResponse(response);
    },
  },
  
  // Voting endpoints
  voting: {
    getAll: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/api/content/voting`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    submitVote: async (token: string, votingId: string, option: string) => {
      const response = await fetch(`${API_BASE_URL}/api/content/voting/${votingId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ option }),
      });
      return handleResponse(response);
    },
  },
  
  // Subscriptions endpoints
  subscriptions: {
    getActive: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/api/content/subscriptions/active`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    getPrevious: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/api/content/subscriptions/previous`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    subscribe: async (token: string, planId: string) => {
      const response = await fetch(`${API_BASE_URL}/api/content/subscriptions/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });
      return handleResponse(response);
    },
  },
  
  // Reports endpoints
  reports: {
    submit: async (token: string, reportData: any) => {
      const response = await fetch(`${API_BASE_URL}/api/content/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reportData),
      });
      return handleResponse(response);
    },
  },
}; 