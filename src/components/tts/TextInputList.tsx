import { TTSState, Language, Style, Voice } from "@/types/tts";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Repeat2, Play, Download, MoveVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { mockLanguages, mockStyles, mockVoices } from "@/mock/speaker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TextInputListProps {
  state: TTSState;
  toggleSelection: (id: number) => void;
  handleTextChange: (id: number, text: string) => void;
  cancelEdit: () => void;
  addTextInput: (hoveredId: number) => void;
  saveInput: () => void;
}

export const TextInputList: React.FC<TextInputListProps> = ({
  state,
  toggleSelection,
  handleTextChange,
  cancelEdit,
  addTextInput,
  saveInput
}) => {
  // const [languages, setLanguages] = useState<Language[]>([]);
  const [languages, setLanguages] = useState(mockLanguages);
  // const [styles, setStyles] = useState<Style[]>([]);
  const [styles, setStyles] = useState<typeof mockStyles.ko>([]);
  // const [voices, setVoices] = useState<Voice[]>([]);
  const [voices, setVoices] = useState<typeof mockVoices.standard>([]);

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);

  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [isStyleSelected, setIsStyleSelected] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [inputHoverStates, setInputHoverStates] = useState<Record<number, boolean>>({});

  // useEffect(() => {
  //   fetch('/api/language')
  //     .then(response => response.json())
  //     .then(data => setLanguages(data.response.languageList));
  // }, []);

  // useEffect(() => {
  //   if (selectedLanguage) {
  //     fetch(`/api/style?language=${selectedLanguage}`)
  //       .then(response => response.json())
  //       .then(data => setStyles(data.response.styleList));
  //   }
  // }, [selectedLanguage]);

  // useEffect(() => {
  //   if (selectedStyle) {
  //     fetch(`/api/voice?style=${selectedStyle}`)
  //       .then(response => response.json())
  //       .then(data => setVoices(data.response.voiceList));
  //   }
  // }, [selectedStyle]);

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
    setSelectedStyle(null);
    setSelectedVoice(null);
  };

  const handleInputHover = (id: number, isHovered: boolean) => {
    setInputHoverStates(prevState => ({ ...prevState, [id]: isHovered }));
  };

  return (
    <>
      {state.textInputs.map((input) => (
        <div 
          key={input.id} 
          className="mb-4"
        >
          <div 
            className="mb-4 min-h-[120px]"
            onMouseEnter={() => handleInputHover(input.id, true)}
            onMouseLeave={() => handleInputHover(input.id, false)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-end mb-2 space-x-1">
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild className="min-w-[95px] h-[32px]">
                    <Button variant="outline" onClick={handlePopoverOpen}>{selectedVoice || "성우 선택"}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 min-w-[400px]" align="start">
                    <div className="flex">
                      <div className="w-1/3 text-center border-r">
                        {languages.map(lang => (
                          <div
                            key={lang.languageCode}
                            className="py-2 cursor-pointer hover:bg-gray-100"
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
                        <div className="w-1/3 text-center border-r">
                          {styles.map(style => (
                            <div
                              key={style.name}
                              className="p-2 cursor-pointer hover:bg-gray-100"
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
                        <div className="w-1/3 text-center">
                          {voices.map(voice => (
                            <div
                              key={voice.voiceSeq}
                              className="p-2 cursor-pointer hover:bg-gray-100"
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
                
                <Button variant="secondary" size="sm">효과 없음</Button>
                <Button variant="secondary" size="sm" >음량</Button>
                <Button variant="secondary" size="sm" >속도</Button>
                <Button variant="secondary" size="sm" >높이</Button>
                <Button variant="ghost" size="sm" >초기화</Button>
                <Button variant="outline" className="text-green-400 border-green-400" size="sm">
                  <Repeat2 />재생성
                </Button>
              </div>
              <div className="flex space-x-1">
                <Play size={16} fill="#333" />
                <Download size={16} />
                <MoveVertical size={16} />
              </div>
            </div>
            <div className="flex items-center mb-2 space-x-2">
              <CustomCheckbox
                id={`input-${input.id}`}
                checked={input.isSelected}
                onCheckedChange={() => toggleSelection(input.id)}
              />
              <Input 
                value={input.text}
                onChange={(e) => handleTextChange(input.id, e.target.value)}
                placeholder="내용을 입력해주세요.(최대 2,000자)"
                onFocus={() => {
                  if (input.text === '') {
                    cancelEdit();
                  }
                }}
              />
            </div>
            {inputHoverStates[input.id] && (
              <div className="mt-2 text-center">
                  {input.isEditing ? (
                    <>
                      <Button onClick={saveInput} variant="secondary" className="w-24 mr-1 rounded-3xl">
                        저장
                      </Button>
                      <Button onClick={cancelEdit} variant="secondary" className="w-24 rounded-3xl">
                        취소
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => addTextInput(input.id)} variant="outline" className="rounded-3xl w-52">
                      + 텍스트 추가
                    </Button>
                  )}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
