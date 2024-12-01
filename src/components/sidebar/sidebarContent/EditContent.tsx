import { useState } from 'react';
import { DropdownSelector } from '@/components/ui/dropDownSelector';
import { SliderControl } from '@/components/ui/sliderControl';
import { Button } from '@/components/ui/button';
import { VoiceSelectionPopover } from '@/components/common/VoiceSelectPopover';
import { useAudioSettingsStore } from '@/stores/useAudioSettingsStore';

const EditContent = () => {
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
    setSelectedSpeed(value);
  };

  const handleSliderChange = (id: string, value: number) => {
    setSliders(id, value);
  };
  const handlePreview = async () => {
    try {
      setIsPreviewLoading(true);
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
      console.log(
        '개별 적용: 속도 값 -',
        selectedSpeed,
        ', 음높이 및 음량 값 -',
        sliders,
        '개별 적용 스타일 :',
        selectedVoices
      );
    } catch (error) {
      console.error('개별 적용 실패:', error);
    } finally {
      setIsApplyLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full h-full gap-4 rounded '>
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
          selectedVoice={selectedVoices}
          setSelectedVoice={setSelectedVoices}
        />

        {/* 속도 블럭 선택 */}
        <div className='flex flex-col gap-2 mt-4'>
          <label className='text-sm font-medium text-gray-700'>속도</label>
          <div className='flex gap-2'>
            {speedValues.map((value) => (
              <button
                key={value}
                onClick={() => handleSpeedClick(value)}
                className={`flex-1 py-2 rounded ${
                  selectedSpeed === value
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
        {sliders.map((slider) => (
          <SliderControl
            key={slider.id}
            label={slider.label}
            value={slider.value}
            onChange={(v) => handleSliderChange(slider.id, v[0])}
            min={slider.min}
            max={slider.max}
          />
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className='flex flex-col gap-4'>
        <Button
          className='w-full text-white bg-black'
          onClick={handlePreview}
          disabled={isPreviewLoading}
        >
          미리 듣기
        </Button>
        <Button
          className='w-full text-white bg-black'
          onClick={handleApply}
          disabled={isApplyLoading}
        >
          개별 적용하기
        </Button>

        <Button
          className='w-full text-white bg-black'
          onClick={handleAllApply}
          disabled={isApplyLoading}
        >
          {isApplyLoading ? '처리중...' : '전체 적용하기'}
        </Button>
      </div>
    </div>
  );
};

export default EditContent;
