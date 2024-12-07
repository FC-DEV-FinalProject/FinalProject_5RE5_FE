import { useEffect, useState } from 'react';
import { DropdownSelector } from '@/components/ui/dropDownSelector';
import { SliderControl } from '@/components/ui/sliderControl';
import { Button } from '@/components/ui/button';
import { VoiceSelectionPopover } from '@/components/common/VoiceSelectPopover';
import { useAudioSettingsStore } from '@/stores/useAudioSettingsStore';
import { useTextInputs } from '@/stores/textInputStore';
import { ttsStyle } from '@/apis/ttsVoice';
import { toast } from '@/hooks/use-toast';

const EditContent = () => {
  //로컬 상태
  const [localSpeed, setLocalSpeed] = useState(1);
  const [localSliders, setLocalSliders] = useState([
    { id: 'pitch', value: 1.0, min: 0.0, max: 2.0, label: '음높이' },
    { id: 'volume', value: 1.0, min: -10, max: 10, label: '음량' },
  ]);
  const [localVoices, setLocalVoices] = useState<string | null>('');
  const [localVoiceSeq, setLocalVoiceSeq] = useState<number | null>(null);

  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isApplyLoading, setIsApplyLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const speedValues = [0.25, 0.5, 1, 2, 4];
  const {
    selectedSpeed,
    setSelectedSpeed,
    sliders,
    setSliders,
    selectedVoices,
    setSelectedVoices,
  } = useAudioSettingsStore();

  const handleSpeedClick = (value: number) => {
    setLocalSpeed(value);
  };

  const handleVoiceChange = (voice: string | null, voiceSeq: number | null) => {
    setLocalVoices(voice);
    setLocalVoiceSeq(voiceSeq);
  };

  const handleSliderChange = (id: string, value: number) => {
    setLocalSliders((prev) =>
      prev.map((slider) => (slider.id === id ? { ...slider, value } : slider))
    );
  };

  const handlePreview = async () => {
    try {
      setIsPreviewLoading(true);
      setSelectedSpeed(localSpeed);
      setSelectedVoices(localVoices);
      console.log(
        '미리 듣기: 속도 값 -',
        selectedSpeed,
        ', 음높이 및 음량 값 -',
        sliders
      );
    } catch (error) {
      console.error('미리 듣기 실패:', error);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  //전체 적용
  const handleAllApply = async () => {
    try {
      setIsApplyLoading(true);
      setSelectedSpeed(localSpeed);
      setSelectedVoices(localVoices);
      localSliders.forEach((slider) => {
        setSliders(slider.id, slider.value);
      });
      console.log(
        '전체 적용: 속도 값 -',
        selectedSpeed,
        ', 음높이 및 음량 값 -',
        sliders,
        '전체 적용 스타일 :',
        selectedVoices
      );
    } catch (error) {
      console.error('전체 적용 실패:', error);
    } finally {
      setIsApplyLoading(false);
    }
  };

  //개별 적용
  const handleApply = async () => {
    try {
      setIsApplyLoading(true);

      // 1. zustand AudioSettings의 상태를 업데이트
      setSelectedSpeed(localSpeed);
      setSelectedVoices(localVoices);
      localSliders.forEach((slider) => {
        setSliders(slider.id, slider.value);
      });

      // 2. 체크된 텍스트 입력 항목들을 가져옴
      const selectedInputs = useTextInputs
        .getState()
        .textInputs.filter((input) => input.isSelected);

      if (selectedInputs.length === 0) {
        toast({
          title: '적용할 항목이 없습니다',
          description: '적어도 하나의 항목을 선택하세요.',
          variant: 'destructive',
        });
        // alert('적용할 항목이 없습니다. 적어도 하나의 항목을 선택하세요.');
        setIsApplyLoading(false);
        return;
      }

      // 3. 선택된 텍스트 항목에 설정을 적용
      useTextInputs.setState((state) => ({
        textInputs: state.textInputs.map((input) => {
          if (input.isSelected) {
            return {
              ...input,
              speed: localSpeed,
              pitch:
                localSliders.find((slider) => slider.id === 'pitch')?.value ||
                0,
              volume:
                localSliders.find((slider) => slider.id === 'volume')?.value ||
                0,
              voice: localVoices ?? '',
              voiceSeq: localVoiceSeq ?? 0,
            };
          }
          return input;
        }),
      }));
    } catch (error) {
      console.error('개별 적용 실패:', error);
    } finally {
      setIsApplyLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full h-full gap-4 rounded'>
      {/* 컨텐츠 영역 */}
      <div className='flex flex-col flex-1 gap-4'>
        {/* 즐겨찾기 Dropdown */}
        {/* <DropdownSelector
          label='즐겨찾기'
          value={selectedFavorite}
          onChange={setSelectedFavorite}
          options={['Wimon', '원준', 'James']}
        /> */}
        {/* 보이스 옵션 Dropdown */}
        <VoiceSelectionPopover
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          selectedVoice={localVoices}
          setSelectedVoice={(voice, voiceSeq) =>
            handleVoiceChange(voice, voiceSeq)
          }
        />

        {/* 속도 블럭 선택 */}
        <div className='flex flex-col gap-2 mt-4 mb-4'>
          <label className='text-sm font-medium text-gray-700'>속도</label>
          <div className='flex gap-2'>
            {speedValues.map((value) => (
              <button
                key={value}
                onClick={() => handleSpeedClick(value)}
                className={`flex-1 py-2 rounded ${
                  localSpeed === value
                    ? 'border border-gray-300 bg-blue-2 text-gray-700'
                    : 'border border-gray-300 bg-gray-100 text-gray-500 opacity-50 '
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* 음높이 및 음량 슬라이더 */}
        <div className='flex flex-col gap-8'>
          {localSliders.map((slider) => (
            <SliderControl
              key={slider.id}
              label={slider.label}
              value={slider.value}
              onChange={(v) => handleSliderChange(slider.id, v[0])}
              min={slider.min}
              max={slider.max}
              step={slider.id === 'volume' ? 1 : 0.1} //
            />
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className='flex flex-col gap-8'>
        <Button
          className='w-full'
          onClick={handlePreview}
          disabled={isPreviewLoading}
          variant={'green'}
        >
          미리 듣기
        </Button>
        <Button
          className='w-full'
          onClick={handleApply}
          disabled={isApplyLoading}
          variant={'green'}
        >
          적용하기
        </Button>
      </div>
    </div>
  );
};

export default EditContent;
