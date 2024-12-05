import ListView, { IListViewProps } from '@/components/common/ListView';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PROJECT_DATA2 } from '@/mocks/projectData';
import { useCheckedStore } from '@/stores/checkedStore';
import { useEffect, useState } from 'react';
import { IProjectProps } from '@/types/project';
import DivideLine from '@/components/common/DividingLine';
import { apiRequest } from '@/apis/apiClient';
import { removeProject } from '@/apis/project';

const MyProject = ({
  option = 'list',
  data = PROJECT_DATA2,
}: Omit<IListViewProps, 'navi'>) => {
  const [orderValue, setOrderValue] = useState<string>('');
  const { checkedList } = useCheckedStore();
  const [viewData, setViewData] = useState<IProjectProps[]>(data || []);

  const handleSelect = {
    change: (value: string) => {
      setOrderValue(value);
    },
  };

  const handleButton = {
    remove: () => {
      // api 호출
      alert(`${checkedList} 삭제요청`);
      checkedList.map((item) => {
        const a = removeProject(item);
      });
    },
  };

  const doSortList = {
    projectDate: () => {
      const sortedData = [...viewData].sort(
        (a, b) =>
          new Date(a.projectDate).getTime() - new Date(b.projectDate).getTime()
      );
      setViewData(sortedData);
    },
    projectUpdateDate: () => {
      const sortedData = [...viewData].sort(
        (a, b) =>
          new Date(a.projectUpdateDate).getTime() -
          new Date(b.projectUpdateDate).getTime()
      );
      setViewData(sortedData);
    },
  };

  const orderList = (orderValue: string) => {
    if (orderValue === 'order-recent') {
      doSortList.projectUpdateDate();
    } else if (orderValue === 'order-register') {
      doSortList.projectDate();
    }
  };

  useEffect(() => {
    orderList(orderValue);
  }, [orderValue]);

  return (
    <div>
      <div>
        <header className='flex items-center justify-between px-5 py-2'>
          <div className='text-left'>
            <span>Home</span>
          </div>
        </header>
      </div>
      <DivideLine />
      <div className='w-[100%] m-5'>
        <div className='flex justify-between'>
          <div className='selectDiv'>
            <Select onValueChange={handleSelect.change}>
              <SelectTrigger className='w-[100px]'>
                <SelectValue placeholder='정렬' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='order-recent'>최근 작업목록 순</SelectItem>
                <SelectItem value='order-register'>생성일자 순</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {checkedList && checkedList.length > 0 ? (
            <div>
              <Button variant={'destructive'} onClick={handleButton.remove}>
                삭제하기
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='tableDiv'>
          {viewData ? (
            <ListView option={'list'} data={viewData} />
          ) : (
            <div className='flex items-center justify-center h-40'>
              <p>데이터를 불러오는 중입니다...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProject;
