import axios, { Axios } from 'axios';

type TApiResponse<T> =
  | {
      code: 200;
      message: 'OK';
      data: T;
    }
  | {
      code: 400;
      message: 'Bad Request';
      details: string;
    }
  | {
      code: 401;
      message: 'Unauthorized';
    }
  | {
      code: 500;
      message: 'Internal Server Error';
    };

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(({ data }) => data);

export const apiRequest = {
  get: <T>(...args: Parameters<Axios['get']>): Promise<TApiResponse<T>> =>
    apiClient.get(...args),
  post: <T>(...args: Parameters<Axios['post']>): Promise<TApiResponse<T>> =>
    apiClient.post(...args),
  put: <T>(...args: Parameters<Axios['put']>): Promise<TApiResponse<T>> =>
    apiClient.put(...args),
  delete: <T>(...args: Parameters<Axios['delete']>): Promise<TApiResponse<T>> =>
    apiClient.delete(...args),
  patch: <T>(...args: Parameters<Axios['patch']>): Promise<TApiResponse<T>> =>
    apiClient.patch(...args),
};

export default apiClient;
