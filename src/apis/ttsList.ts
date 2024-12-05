import apiClient from '@/apis/apiClient';

interface TTSResponse {
  status: number;
  response: {
    sentenceList: {
      sentence: {
        tsSeq: number;
        voiceSeq: number;
        text: string;
        order: number;
        ttsAttributeInfo: {
          volume: number;
          speed: number;
          stPitch: number;
          emotion: string;
          emotionStrength: number;
          sampleRate: number;
          alpha: number;
          endPitch: number;
          audioFormat: string;
        };
        ttsAudioFileInfo: null;
      };
    }[];
  };
}

export const fetchTTSList = async (projectId: string): Promise<TTSResponse['response']['sentenceList']> => {
  try {
    const response = await apiClient.get<TTSResponse>(`/project/${projectId}/tts`);
    return response.data.response.sentenceList;
  } catch (error) {
    console.error('Error fetching TTS list:', error);
    throw new Error('TTS 작업물을 가져오는 데 실패했습니다.');
  }
};