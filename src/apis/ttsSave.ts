// src/apis/ttsApi.ts

import apiClient from '@/apis/apiClient';
import useAuthStore from '@/stores/authStore';
import { useTextInputs } from '@/stores/textInputStore';

export const ttsSave = async (): Promise<void> => {
  try {
    const { userData } = useAuthStore.getState();

    // userData가 null인지 확인
    if (!userData) {
      console.error('로그인 정보가 없습니다.');
      alert('로그인 상태를 확인해주세요.');
      return; // 함수 종료
    }

    const { seq: memberSeq } = userData; // userData가 null이 아니므로 seq에 안전하게 접근 가능
    console.log(userData);

    const { textInputs } = useTextInputs.getState(); // Zustand 상태에서 직접 데이터 가져오기

    // textInputs를 기반으로 sentenceList 생성
    const sentenceList = textInputs.map((input, index) => ({
      batchProcessType: 'CREATE',
      sentence: {
        tsSeq: index,
        voiceSeq: input.voiceSeq, // 선택된 voiceSeq 사용
        styleSeq: 0, // 이 부분도 적절하게 상태나 변수에서 가져와야 합니다.
        text: input.text,
        order: index,
        ttsAttributeInfo: {
          volume: input.volume,
          speed: input.speed,
          stPitch: input.pitch,
          emotion: 'neutral', // 여기도 필요에 따라 상태에서 가져올 수 있습니다.
          emotionStrength: 100,
          sampleRate: 16000,
          alpha: 0,
          endPitch: input.pitch,
          audioFormat: 'wav',
        },
        ttsAudioFileInfo: {
          ttsAudioSeq: 0,
          audioUrl: '',
          downloadYn: 'N',
          audioPlayYn: 'N',
        },
      },
    }));

    const payload = {
      sentenceList,
    };

    // apiClient 사용하여 요청 보내기 (memberSeq 값을 동적으로 추가)
    const response = await apiClient.post(
      `/project/1/tts/batch?memberSeq=${memberSeq}`,
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
