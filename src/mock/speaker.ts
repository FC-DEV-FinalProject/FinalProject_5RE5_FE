export const mockLanguages = [
  { languageCode: "ko", languageName: "한국어" },
  { languageCode: "en", languageName: "영어" },
  { languageCode: "ja", languageName: "일본어" },
];

export const mockStyles = {
  ko: [
    { name: "standard", mood: "표준" },
    { name: "cheerful", mood: "밝은" },
    { name: "calm", mood: "차분한" },
  ],
  en: [
    { name: "casual", mood: "캐주얼" },
    { name: "formal", mood: "공식적인" },
  ],
  ja: [
    { name: "polite", mood: "정중한" },
    { name: "friendly", mood: "친근한" },
  ],
};

export const mockVoices = {
  standard: [
    { voiceSeq: 1, name: "김철수" },
    { voiceSeq: 2, name: "이영희" },
  ],
  cheerful: [
    { voiceSeq: 3, name: "박지성" },
    { voiceSeq: 4, name: "손흥민" },
  ],
  calm: [
    { voiceSeq: 5, name: "정우성" },
    { voiceSeq: 6, name: "고소영" },
  ],
};