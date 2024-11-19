import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const EditContent = () => {
  // 선택된 성우 이름 관리
  const [selectedFavorite, setselectedFavorite] = useState('성우 이름');
  const [selectedVoice, setSelectedVoice] = useState('성우 이름');

  return (
    <div className='flex flex-col w-full gap-4 p-4 bg-gray-100 rounded shadow'>
      {/* 즐겨찾기 */}
      <div>
        <label className='block mb-1 text-sm font-medium text-gray-700'>
          즐겨찾기
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='w-full'>
              {selectedFavorite}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>목소리 선택</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedFavorite}
              onValueChange={setselectedFavorite}
            >
              <DropdownMenuRadioItem value='Wimon'>Wimon</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='원준'>원준</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='James'>James</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <label className='block mb-1 text-sm font-medium text-gray-700'>
          보이스 옵션
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='w-full'>
              {selectedVoice}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>목소리 선택</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* 단일 선택을 위한 RadioGroup */}
            <DropdownMenuRadioGroup
              value={selectedVoice}
              onValueChange={setSelectedVoice}
            >
              <DropdownMenuRadioItem value='Wimon'>Wimon</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='원준'>원준</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='James'>James</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EditContent;
