// src/apis/ttsApi.ts

import apiClient from '@/apis/apiClient';
import { useTextInputs } from '@/stores/textInputStore';
import { SaveError } from '@/lib/utils';

export const ttsSave = async (): Promise<void> => {
  try {
    const { textInputs } = useTextInputs.getState(); // Zustand 상태에서 직접 데이터 가져오기

    // textInputs를 기반으로 sentenceList 생성
    const sentenceList = textInputs.map((input, index) => ({
      batchProcessType: 'CREATE',
      sentence: {
        tsSeq: index,
        voiceSeq: 0,
        styleSeq: 0,
        text: input.text,
        order: index,
        ttsAttributeInfo: {
          volume: 100,
          speed: 1,
          stPitch: 0,
          emotion: 'neutral',
          emotionStrength: 100,
          sampleRate: 16000,
          alpha: 0,
          endPitch: 0,
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

    // apiClient 사용하여 요청 보내기
    const response = await apiClient.post(
      '/project/1/tts/batch?memberSeq=9',
      payload
    );

    if (response.status === 200) {
      console.log('저장 완료:', response.data);
      alert('저장되었습니다.');
    } else {
      throw new SaveError('저장 실패', response.status);
    }
  } catch (error) {
    throw new SaveError(`저장 실패: ${error}`, 500);
  }
};
