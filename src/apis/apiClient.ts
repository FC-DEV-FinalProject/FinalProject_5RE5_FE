import axios, { Axios } from 'axios';

export interface IApiResponse {}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiRequest = {
  get: (...args: Parameters<Axios['get']>) => apiClient.get(...args),
  post: (...args: Parameters<Axios['post']>) => apiClient.post(...args),
  put: (...args: Parameters<Axios['put']>) => apiClient.put(...args),
  delete: (...args: Parameters<Axios['delete']>) => apiClient.delete(...args),
  patch: (...args: Parameters<Axios['patch']>) => apiClient.patch(...args),
};

export default apiClient;
