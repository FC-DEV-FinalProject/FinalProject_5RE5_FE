import apiClient from '@/apis/apiClient';
import useAuthStore from '@/stores/authStore';

export const ttsFileCreate = async (projectId: string) => {
  try {
    const { userData } = useAuthStore.getState();

    if (!userData) {
      console.error('로그인 정보가 없습니다.');
      alert('로그인 상태를 확인해주세요.');
      return;
    }

    const { seq: memberSeq } = userData;

    const response = await apiClient.get(
      `/project/${projectId}/tts/sentence/187/maketts?memberSeq=${memberSeq}`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('TTS파일 생성에 실패했습니다.');
  }
};
