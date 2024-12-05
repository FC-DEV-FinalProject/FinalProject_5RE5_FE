// src/apis/ttsApi.ts

import apiClient from '@/apis/apiClient';
import useAuthStore from '@/stores/authStore';
import { useTextInputs } from '@/stores/textInputStore';

export const ttsSave = async (projectId: string): Promise<void> => {
  try {
    const { userData } = useAuthStore.getState();

    // userData가 null인지 확인
    if (!userData) {
      console.error('로그인 정보가 없습니다.');
      alert('로그인 상태를 확인해주세요.');
      return;
    }

    const { seq: memberSeq } = userData;
    console.log(userData);

    const { textInputs } = useTextInputs.getState();

    // textInputs를 기반으로 sentenceList 생성
    const sentenceList = textInputs.map((input, index) => ({
      batchProcessType: 'CREATE',
      sentence: {
        tsSeq: index,
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

    const payload = {
      sentenceList,
    };

    const response = await apiClient.post(
      `/project/${projectId}/tts/batch?memberSeq=${memberSeq}`,
      payload
    );

    if (response.status === 200) {
      console.log('저장 완료:', response.data);
      alert('저장되었습니다.');
    } else {
      throw new Error(`저장 실패: 상태 코드 ${response.status}`);
    }
  } catch (error) {
    console.error('에러 발생:', error);
    alert('저장에 실패했습니다. 다시 시도해주세요.');
  }
};
