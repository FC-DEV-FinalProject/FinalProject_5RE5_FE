import { useState } from 'react';

import { DropdownSelector } from '@/components/ui/dropDownSelector';
import { SliderControl } from '@/components/ui/sliderControl';

const EditContent = () => {
  const [selectedFavorite, setSelectedFavorite] = useState('성우 이름');
  const [selectedVoice, setSelectedVoice] = useState('성우 이름');

  // 슬라이더 데이터 배열
  const sliders = [
    { id: 'speed', label: '속도', value: 0, setValue: useState(0) },
    { id: 'height', label: '높이', value: 0, setValue: useState(0) },
    {
      id: 'endProcessing',
      label: '끝음 처리',
      value: 0,
      setValue: useState(0),
    },
    { id: 'endLength', label: '끝음 길이', value: 0, setValue: useState(0) },
    { id: 'volume', label: '볼륨 조절', value: 0, setValue: useState(0) },
  ];

  return (
    <div className='flex flex-col w-full gap-4 p-4 bg-gray-100 rounded shadow'>
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

      {/*slider */}
      {sliders.map((slider) => {
        const [value, setValue] = slider.setValue;
        return (
          <SliderControl
            key={slider.id}
            label={slider.label}
            value={value}
            onChange={(v) => setValue(v[0])}
          />
        );
      })}
    </div>
  );
};

export default EditContent;
