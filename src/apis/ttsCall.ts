import apiClient from '@/apis/apiClient';

export const ttsCall = async (projectId: string) => {
  try {
    const response = await apiClient.get(`/project/${projectId}/tts`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
