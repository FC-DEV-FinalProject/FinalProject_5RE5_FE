import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { mockLanguages, mockStyles, mockVoices } from '@/mock/speaker';

interface VoiceSelectionPopoverProps {
  selectedLanguage: string | null;
  setSelectedLanguage: (language: string) => void;
  selectedStyle: string | null;
  setSelectedStyle: (style: string) => void;
  selectedVoice: string | null;
  setSelectedVoice: (voice: string) => void;
}

export const VoiceSelectionPopover: React.FC<VoiceSelectionPopoverProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedStyle,
  setSelectedStyle,
  selectedVoice,
  setSelectedVoice,
}) => {
  const [languages, setLanguages] = useState(mockLanguages);
  const [styles, setStyles] = useState<typeof mockStyles.ko>([]);
  const [voices, setVoices] = useState<typeof mockVoices.standard>([]);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [isStyleSelected, setIsStyleSelected] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (selectedLanguage) {
      setStyles(mockStyles[selectedLanguage as keyof typeof mockStyles] || []);
      setIsLanguageSelected(true);
      setIsStyleSelected(false);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (selectedStyle) {
      setVoices(mockVoices[selectedStyle as keyof typeof mockVoices] || []);
      setIsStyleSelected(true);
    }
  }, [selectedStyle]);

  const handleVoiceSelect = (voiceName: string) => {
    setSelectedVoice(voiceName);
    setIsPopoverOpen(false);
  };

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
    setIsLanguageSelected(false);
    setIsStyleSelected(false);
    setSelectedStyle('');
    setSelectedVoice('');
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild className='min-w-[95px] h-[32px]'>
        <Button variant='outline' onClick={handlePopoverOpen}>
          {selectedVoice || '성우 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 min-w-[400px]' align='start'>
        <div className='flex'>
          <div className='w-1/3 text-center border-r'>
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
          {isLanguageSelected && (
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
          {isStyleSelected && (
            <div className='w-1/3 text-center'>
              {voices.map((voice) => (
                <div
                  key={voice.voiceSeq}
                  className='p-2 cursor-pointer hover:bg-gray-100'
                  onClick={() => handleVoiceSelect(voice.name)}
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
