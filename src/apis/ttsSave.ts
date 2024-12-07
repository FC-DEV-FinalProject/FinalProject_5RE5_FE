import apiClient from '@/apis/apiClient';
import useAuthStore from '@/stores/authStore';

export const ttsSave = async (
  projectId: string,
  batchProcessType: 'CREATE' | 'DELETE' | 'UPDATE',
  textInputs: any[] // 각 작업에 필요한 데이터 배열
): Promise<void> => {
  try {
    const { userData } = useAuthStore.getState();

    if (!userData) {
      console.error('로그인 정보가 없습니다.');
      alert('로그인 상태를 확인해주세요.');
      return;
    }

    const { seq: memberSeq } = userData;

    // `textInputs`를 기반으로 `sentenceList` 생성
    const sentenceList = textInputs.map((input, index) => ({
      batchProcessType, // 동적으로 작업 타입 설정
      sentence: {
        tsSeq: input.id,
        voiceSeq: input.voiceSeq,
        text: input.text,
        order: index,
        ttsAttributeInfo: {
          volume: input.volume,
          speed: input.speed,
          stPitch: input.pitch,
          emotion: 'neutral',
          emotionStrength: 100,
          sampleRate: 16000,
          alpha: 0,
          endPitch: input.pitch,
          audioFormat: 'wav',
        },
        ttsAudioFileInfo: null,
      },
    }));

    const payload = { sentenceList };

    const response = await apiClient.post(
      `/project/${projectId}/tts/batch?memberSeq=${memberSeq}`,
      payload
    );

    if (response.status === 200) {
      console.log(`${batchProcessType} 작업 완료:`, response.data);
      alert('작업이 성공적으로 처리되었습니다.');
    } else {
      throw new Error(`${batchProcessType} 실패: 상태 코드 ${response.status}`);
    }
  } catch (error) {
    console.error('에러 발생:', error);
    alert('작업 처리에 실패했습니다. 다시 시도해주세요.');
  }
};
