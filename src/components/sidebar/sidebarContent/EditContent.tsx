import { useState } from 'react';

import { DropdownSelector } from '@/components/ui/dropDownSelector';
import { SliderControl } from '@/components/ui/sliderControl';
import { Button } from '@/components/ui/button';

const EditContent = () => {
  const [selectedFavorite, setSelectedFavorite] = useState('성우 이름');
  const [selectedVoice, setSelectedVoice] = useState('성우 이름');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isApplyLoading, setIsApplyLoading] = useState(false);

  const [sliders, setSliders] = useState({
    speed: 0,
    height: 0,
    endProcessing: 0,
    endLength: 0,
    volume: 0,
  });

  const handleSliderChange = (id: string, value: number) => {
    setSliders((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handlePreview = async () => {
    try {
      setIsPreviewLoading(true);
      // 미리 듣기 로직 구현
    } catch (error) {
      console.error('미리 듣기 실패:', error);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setIsApplyLoading(true);
      // 전체 적용 로직 구현
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

        {/* 슬라이더 */}
        {Object.entries(sliders).map(([id, value]) => (
          <SliderControl
            key={id}
            label={id}
            value={value}
            onChange={(v) => handleSliderChange(id, v[0])}
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
