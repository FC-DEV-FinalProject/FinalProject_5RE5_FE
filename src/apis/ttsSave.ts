import apiClient from '@/apis/apiClient';
import useAuthStore from '@/stores/authStore';
import { useTextInputs } from '@/stores/textInputStore';

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

    // 최신 상태의 textInputs를 가져오기 위해 Zustand의 get() 사용
    const { textInputs: storeTextInputs } = useTextInputs.getState();

    // `textInputs`를 기반으로 `sentenceList` 생성
    const sentenceList = textInputs.map((input) => {
      const order = storeTextInputs.findIndex((item) => item.id === input.id); // 스토어에서의 인덱스 계산
      return {
        batchProcessType, // 동적으로 작업 타입 설정
        sentence: {
          tsSeq: input.id,
          voiceSeq: input.voiceSeq,
          text: input.text,
          order, // 스토어 기반 index 사용
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
      };
    });

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
