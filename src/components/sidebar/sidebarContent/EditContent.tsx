import { useState } from 'react';
import { DropdownSelector } from '@/components/ui/dropDownSelector';
import { SliderControl } from '@/components/ui/sliderControl';
import { Button } from '@/components/ui/button';

const EditContent = () => {
  const [selectedFavorite, setSelectedFavorite] = useState('성우 이름');
  const [selectedVoice, setSelectedVoice] = useState('성우 이름');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isApplyLoading, setIsApplyLoading] = useState(false);

  // 속도 값을 블럭으로 표현
  const speedValues = [0.25, 0.5, 1, 2, 4];
  const [selectedSpeed, setSelectedSpeed] = useState(1); // 기본값 1

  const handleSpeedClick = (value: number) => {
    setSelectedSpeed(value);
  };

  const [sliders, setSliders] = useState([
    { id: 'pitch', value: 0.0, label: '음높이', min: -20.0, max: 20.0 },
    { id: 'volume', value: 0.0, label: '음량', min: -10.0, max: 10.0 },
  ]);

  const handleSliderChange = (id: string, value: number) => {
    setSliders((prev) =>
      prev.map((slider) => (slider.id === id ? { ...slider, value } : slider))
    );
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

  const handleApply = async () => {
    try {
      setIsApplyLoading(true);
      console.log(
        '전체 적용: 속도 값 -',
        selectedSpeed,
        ', 음높이 및 음량 값 -',
        sliders
      );
    } catch (error) {
      console.error('전체 적용 실패:', error);
    } finally {
      setIsApplyLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full h-full gap-4 p-4 bg-gray-100 rounded shadow'>
      {/* 컨텐츠 영역 */}
      <div className='flex flex-col flex-1 gap-4'>
        {/* 즐겨찾기 Dropdown */}
        <DropdownSelector
          label='즐겨찾기'
          value={selectedFavorite}
          onChange={setSelectedFavorite}
          options={['Wimon', '원준', 'James']}
        />
        {/* 보이스 옵션 Dropdown */}
        <DropdownSelector
          label='보이스 옵션'
          value={selectedVoice}
          onChange={setSelectedVoice}
          options={['Wimon', '원준', 'James']}
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
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-700'
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
          {isApplyLoading ? '처리중...' : '전체 적용하기'}
        </Button>
      </div>
    </div>
  );
};

export default EditContent;
