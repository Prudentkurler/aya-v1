import axios, { AxiosInstance, AxiosError } from 'axios';

/**
 * API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
  code?: string;
}

/**
 * Create and configure axios instance for backend API
 */
const createApiClient = (): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

  const client = axios.create({
    baseURL,
    timeout: 30000, // 30 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Request interceptor: Add auth token if available
   */
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * Response interceptor: Handle common error scenarios
   */
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
      // Handle 401 Unauthorized - likely token expired
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
        // Could trigger redirect to login here if needed
      }

      // Handle 429 Rate limit - implement exponential backoff
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        console.warn(`Rate limited. Retry after ${retryAfter}s`);
      }

      return Promise.reject(error);
    }
  );

  return client;
};

/**
 * Initialize API client
 */
const apiClient = createApiClient();

/**
 * Health API service
 */
export const healthApi = {
  /**
   * Create new measurement (BP or Glucose)
   */
  createMeasurement: async (data: {
    type: 'blood_pressure' | 'glucose';
    systolic?: number;
    diastolic?: number;
    heartRate?: number;
    glucoseLevel?: number;
    notes?: string;
    measuredAt: string;
  }): Promise<{ id: string; serverId: string }> => {
    const response = await apiClient.post<ApiResponse<{ id: string; serverId: string }>>(
      '/measurements',
      data
    );
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to create measurement');
    }
    return response.data.data!;
  },

  /**
   * Get measurements for user
   */
  getMeasurements: async (params?: {
    type?: 'blood_pressure' | 'glucose';
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }): Promise<any[]> => {
    const response = await apiClient.get<ApiResponse<any[]>>('/measurements', { params });
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch measurements');
    }
    return response.data.data || [];
  },

  /**
   * Update measurement
   */
  updateMeasurement: async (
    id: string,
    data: Record<string, any>
  ): Promise<{ id: string; serverId: string }> => {
    const response = await apiClient.put<ApiResponse<{ id: string; serverId: string }>>(
      `/measurements/${id}`,
      data
    );
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to update measurement');
    }
    return response.data.data!;
  },

  /**
   * Delete measurement
   */
  deleteMeasurement: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/measurements/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete measurement');
    }
  },

  /**
   * Create medication
   */
  createMedication: async (data: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    instructions?: string;
  }): Promise<{ id: string; serverId: string }> => {
    const response = await apiClient.post<ApiResponse<{ id: string; serverId: string }>>(
      '/medications',
      data
    );
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to create medication');
    }
    return response.data.data!;
  },

  /**
   * Get user's medications
   */
  getMedications: async (): Promise<any[]> => {
    const response = await apiClient.get<ApiResponse<any[]>>('/medications');
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch medications');
    }
    return response.data.data || [];
  },

  /**
   * Update medication
   */
  updateMedication: async (id: string, data: Record<string, any>): Promise<void> => {
    const response = await apiClient.put<ApiResponse<void>>(`/medications/${id}`, data);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to update medication');
    }
  },

  /**
   * Delete medication
   */
  deleteMedication: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/medications/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete medication');
    }
  },

  /**
   * Record medication adherence
   */
  recordAdherence: async (data: {
    medicationId: string;
    date: string;
    taken: boolean;
    notes?: string;
  }): Promise<{ id: string }> => {
    const response = await apiClient.post<ApiResponse<{ id: string }>>(
      '/medication-adherence',
      data
    );
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to record adherence');
    }
    return response.data.data!;
  },

  /**
   * Get user profile
   */
  getUserProfile: async (): Promise<any> => {
    const response = await apiClient.get<ApiResponse<any>>('/profile');
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch profile');
    }
    return response.data.data;
  },

  /**
   * Update user profile
   */
  updateUserProfile: async (data: Record<string, any>): Promise<void> => {
    const response = await apiClient.put<ApiResponse<void>>('/profile', data);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to update profile');
    }
  },

  /**
   * Sync measurements batch
   */
  syncMeasurements: async (
    measurements: Array<{ id: number; serverId?: string; data: Record<string, any> }>
  ): Promise<Array<{ id: number; serverId: string }>> => {
    const response = await apiClient.post<
      ApiResponse<Array<{ id: number; serverId: string }>>
    >('/measurements/sync', { measurements });
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to sync measurements');
    }
    return response.data.data || [];
  },

  /**
   * Get health insights (AI-powered)
   */
  getHealthInsights: async (params?: {
    days?: number;
    type?: 'blood_pressure' | 'glucose';
  }): Promise<{
    trends: any[];
    recommendations: string[];
    alerts: any[];
  }> => {
    const response = await apiClient.get<
      ApiResponse<{
        trends: any[];
        recommendations: string[];
        alerts: any[];
      }>
    >('/insights', { params });
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch insights');
    }
    return response.data.data || { trends: [], recommendations: [], alerts: [] };
  },

  /**
   * Get health statistics
   */
  getHealthStats: async (params?: {
    period?: '7d' | '30d' | '90d';
    type?: 'blood_pressure' | 'glucose';
  }): Promise<{
    average: number;
    min: number;
    max: number;
    trend: 'up' | 'down' | 'stable';
    dataPoints: number;
  }> => {
    const response = await apiClient.get<
      ApiResponse<{
        average: number;
        min: number;
        max: number;
        trend: 'up' | 'down' | 'stable';
        dataPoints: number;
      }>
    >('/health-stats', { params });
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch health stats');
    }
    return response.data.data!;
  },

  /**
   * Submit feedback for health recommendations
   */
  submitFeedback: async (data: {
    type: 'helpful' | 'not_helpful' | 'irrelevant';
    relatedInsightId?: string;
    notes?: string;
  }): Promise<void> => {
    const response = await apiClient.post<ApiResponse<void>>('/feedback', data);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to submit feedback');
    }
  },
};

export default apiClient;
