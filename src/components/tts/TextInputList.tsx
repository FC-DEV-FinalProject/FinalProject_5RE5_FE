import { TTSState, Language, Style, Voice } from "@/types/tts";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
}

export const TextInputList: React.FC<TextInputListProps> = ({
  state,
  toggleSelection,
  handleTextChange,
  cancelEdit
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

  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

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
      setStyles(mockStyles[selectedLanguage as keyof typeof mockStyles]);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (selectedStyle) {
      setVoices(mockVoices[selectedStyle as keyof typeof mockVoices]);
    }
  }, [selectedStyle]);
  

  return (
    <>
      {state.textInputs.map((input) => (
        <div 
          key={input.id} 
          className="mb-2"
        >
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-end mb-2 space-x-1">
              <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">언어 선택</Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <div className="flex">
                      <div className="border-r">
                        {mockLanguages.map(lang => (
                          <div
                            key={lang.languageCode}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onMouseEnter={() => setHoveredLanguage(lang.languageCode)}
                            onClick={() => setSelectedLanguage(lang.languageCode)}
                          >
                            {lang.languageName}
                          </div>
                        ))}
                      </div>
                      {hoveredLanguage && mockStyles[hoveredLanguage as keyof typeof mockStyles] && (
                        <div className="border-r">
                          {mockStyles[hoveredLanguage as keyof typeof mockStyles].map(style => (
                            <div
                              key={style.name}
                              className="p-2 cursor-pointer hover:bg-gray-100"
                              onMouseEnter={() => setHoveredStyle(style.name)}
                              onClick={() => setSelectedStyle(style.name)}
                            >
                              {style.mood}
                            </div>
                          ))}
                        </div>
                      )}
                      {hoveredStyle && mockVoices[hoveredStyle as keyof typeof mockVoices] && (
                        <div>
                          {mockVoices[hoveredStyle as keyof typeof mockVoices].map(voice => (
                            <div
                              key={voice.voiceSeq}
                              className="p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => setSelectedVoice(voice.name)}
                            >
                              {voice.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                {/* 선택된 값 표시 */}
                {selectedLanguage && (
                  <span className="ml-2">{mockLanguages.find(l => l.languageCode === selectedLanguage)?.languageName}</span>
                )}
                {selectedStyle && (
                  <span className="ml-2">{mockStyles[selectedLanguage as keyof typeof mockStyles].find(s => s.name === selectedStyle)?.mood}</span>
                )}
                {selectedVoice && (
                  <span className="ml-2">{selectedVoice}</span>
                )}
                {/* <Select onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-[95px] border-none shadow-none ml-4">
                    <SelectValue placeholder="성우 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.languageCode} value={lang.languageCode}>
                        {lang.languageName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedLanguage && (
                  <Select onValueChange={setSelectedStyle}>
                    <SelectTrigger className="w-[95px] border-none shadow-none ml-4">
                      <SelectValue placeholder="스타일 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map(style => (
                        <SelectItem key={style.name} value={style.name}>
                          {style.mood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                {selectedStyle && (
                  <Select onValueChange={setSelectedVoice}>
                    <SelectTrigger className="w-[95px] border-none shadow-none ml-4">
                      <SelectValue placeholder="목소리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map(voice => (
                        <SelectItem key={voice.voiceSeq} value={voice.name}>
                          {voice.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )} */}
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
        </div>
        </div>
      ))}
    </>
  );
};
