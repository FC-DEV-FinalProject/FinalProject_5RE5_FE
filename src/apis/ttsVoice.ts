import apiClient from '@/apis/apiClient';

interface Language {
  languageCode: string;
  languageName: string;
  regionCode: string;
  regionName: string;
}

interface Style {
  name: string;
  mood: string;
  contents: string;
  desc: string;
}

interface LanguageResponse {
  status: number;
  response: {
    languageList: Language[];
  };
}

export const ttsLanguage = async (): Promise<Language[]> => {
  try {
    const response = await apiClient.get<LanguageResponse>('/language');
    return response.data.response.languageList;
  } catch (error) {
    console.error(error);
    throw new Error('언어 데이터를 가져오는 데 실패했습니다.');
  }
};

export const ttsStyle = async (selectedLanguage: string): Promise<Style[]> => {
  try {
    const response = await apiClient.get(
      `/style/search?languagecode=${selectedLanguage}`
    );
    return response.data.response.styleList;
  } catch (error) {
    console.error(error);
    throw new Error('스타일 데이터를 가져오는 데 실패했습니다.');
  }
};

export const ttsVoiceName = async (languageCode: string, styleName: string) => {
  try {
    const response = await apiClient.get(
      `/voice?languagecode=${languageCode}&stylename=${styleName}`
    );
    return response.data.response.voiceList; // 필요한 데이터 반환
  } catch (error) {
    console.error(error);
    throw new Error('voiceName 데이터를 가져오는 데 실패했습니다.');
  }
};
