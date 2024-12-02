import axios from 'axios';
import apiClient from '@/apis/apiClient';

interface Language {
  languageCode: string;
  languageName: string;
  regionCode: string;
  regionName: string;
}

interface LanguageResponse {
  status: number;
  response: {
    languageList: Language[];
  };
}

export const ttsVoice = async (): Promise<Language[]> => {
  try {
    const response = await apiClient.get<LanguageResponse>('/language');
    return response.data.response.languageList;
  } catch (error) {
    console.error(error);
    throw new Error('언어 데이터를 가져오는 데 실패했습니다.');
  }
};
