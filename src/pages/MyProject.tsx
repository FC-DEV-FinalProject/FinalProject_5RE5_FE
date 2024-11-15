import ListView, { ViewOptionType } from '@/components/common/ListView';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PROJECT_DATA } from '@/mock/project';
import { AlignJustifyIcon, LayoutGridIcon } from 'lucide-react';
import { useState } from 'react';

const MyProject = () => {
  const [viewOption, setViewOption] = useState<ViewOptionType>('list');
  return (
    <div className='w-[100%]'>
      <div className='flex justify-between p-10 '>
        <div className='selectDiv'>
          <Select>
            <SelectTrigger className='w-[100px]'>
              <SelectValue placeholder='정렬' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='lastview'>최신 순</SelectItem>
              <SelectItem value='dark'>순서2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='iconMenu'>
          <Button
            variant={viewOption === 'list' ? 'active' : 'ghost'}
            size='icon'
            onClick={() => {
              setViewOption('list');
            }}
          >
            <AlignJustifyIcon />
          </Button>
          <Button
            variant={viewOption === 'tile' ? 'active' : 'ghost'}
            size='icon'
            onClick={() => {
              setViewOption('tile');
            }}
          >
            <LayoutGridIcon />
          </Button>
        </div>
      </div>
      <div className='p-10 pt-0 tableDiv'>
        <ListView option={viewOption} data={PROJECT_DATA} />
      </div>
    </div>
  );
};

export default MyProject;
