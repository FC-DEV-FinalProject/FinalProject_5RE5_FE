import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { ttsLanguage, ttsStyle, ttsVoiceName } from '@/apis/ttsVoice';
import { toast } from '@/hooks/use-toast';

interface Language {
  languageCode: string;
  languageName: string;
  regionCode: string;
  regionName: string;
}

interface Style {
  name: string;
  mood: string | null;
  contents: string;
  desc: string;
}

interface Voice {
  voiceSeq: number;
  name: string;
  gender: string;
  age: number | null;
  useCnt: number;
  isRecommend: string;
}

interface VoiceSelectionPopoverProps {
  selectedLanguage: string | null;
  setSelectedLanguage: (language: string) => void;
  selectedStyle: string | null;
  setSelectedStyle: (style: string) => void;
  selectedVoice: string | null;
  setSelectedVoice: (voice: string, voiceSeq: number) => void;
}

const getDefaultMood = (styleName: string): string => {
  switch (styleName) {
    case 'Standard':
      return '기본';
    case 'Neural':
      return '부드러운';
    case 'Journey':
      return '다양한';
    case 'Casual':
      return '따뜻한';
    case 'Studio':
      return '전문적인';
    case 'WaveNet':
      return '자연스러운';
    case 'News':
      return '뉴스 스타일';
    case 'Polyglot':
      return '다언어';
    default:
      return '일반';
  }
};

export const VoiceSelectionPopover: React.FC<VoiceSelectionPopoverProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedStyle,
  setSelectedStyle,
  selectedVoice,
  setSelectedVoice,
}) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [styles, setStyles] = useState<Style[]>([]);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [isStyleSelected, setIsStyleSelected] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languageData = await ttsLanguage();
        setLanguages(languageData);
        setHasError(false); // 에러 없음을 설정
      } catch (error) {
        console.error('언어 데이터를 불러오는 데 실패했습니다:', error);
        setHasError(true); // 에러 발생
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      const fetchStyles = async () => {
        try {
          const styleData = await ttsStyle(selectedLanguage);
          const updatedStyles = styleData.map((style: Style) => ({
            ...style,
            mood:
              style.mood === '없음' || !style.mood
                ? getDefaultMood(style.name)
                : style.mood,
          }));
          setStyles(updatedStyles);
          setIsLanguageSelected(true);
          setIsStyleSelected(false);
        } catch (error) {
          console.error('스타일 데이터를 불러오는 데 실패했습니다:', error);
        }
      };
      fetchStyles();
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (selectedLanguage && selectedStyle) {
      const fetchVoices = async () => {
        try {
          const voiceData = await ttsVoiceName(selectedLanguage, selectedStyle);
          setVoices(voiceData);
          setIsStyleSelected(true);
        } catch (error) {
          console.error('보이스 데이터를 불러오는 데 실패했습니다:', error);
        }
      };
      fetchVoices();
    }
  }, [selectedLanguage, selectedStyle]);

  const handleVoiceSelect = (voiceName: string, voiceSeq: number) => {
    setSelectedVoice(voiceName, voiceSeq);
    setIsPopoverOpen(false);
  };

  const handlePopoverOpen = () => {
    if (hasError) {
      toast({
        title: '언어 데이터를 가져오는 데 실패했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });

      return;
    }
    setIsPopoverOpen(true);
    setIsLanguageSelected(false);
    setIsStyleSelected(false);
    setSelectedStyle('');
    setSelectedVoice('', 0); // 빈 문자열과 0을 기본 값으로 전달합니다.
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild className='min-w-[95px] h-[32px]'>
        <Button
          variant='outline'
          onClick={handlePopoverOpen}
          className='relative flex items-center justify-center w-full'
        >
          <span className='absolute transform -translate-x-1/2 left-1/2'>
            {selectedVoice || '성우 선택'}
          </span>
          <ChevronDown className='absolute w-4 h-4 right-2' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 min-w-[400px]' align='start'>
        <div className='flex'>
          <div className='w-1/3 overflow-y-auto text-center border-r max-h-80'>
            {languages.map((lang) => (
              <div
                key={lang.languageCode}
                className='py-2 cursor-pointer hover:bg-gray-100'
                onClick={() => {
                  setSelectedLanguage(lang.languageCode);
                  setIsLanguageSelected(true);
                }}
              >
                {lang.languageName}
              </div>
            ))}
          </div>
          {isLanguageSelected && styles.length > 0 && (
            <div className='w-1/3 text-center border-r'>
              {styles.map((style) => (
                <div
                  key={style.name}
                  className='p-2 cursor-pointer hover:bg-gray-100'
                  onClick={() => {
                    setSelectedStyle(style.name);
                    setIsStyleSelected(true);
                  }}
                >
                  {style.mood}
                </div>
              ))}
            </div>
          )}
          {isStyleSelected && voices.length > 0 && (
            <div className='w-1/3 text-center'>
              {voices.map((voice) => (
                <div
                  key={voice.voiceSeq}
                  className='p-2 cursor-pointer hover:bg-gray-100'
                  onClick={() => handleVoiceSelect(voice.name, voice.voiceSeq)}
                >
                  {voice.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
