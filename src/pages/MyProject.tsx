import ListView, {
  IListViewProps,
  ViewOptionType,
} from '@/components/common/ListView';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PROJECT_DATA, PROJECT_DATA2 } from '@/mocks/projectData';
import { useCheckedStore } from '@/stores/checkedStore';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { IProjectProps } from '@/types/project';
import DividingLine from '@/components/common/DividingLine';

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
    },
  };

  const doSortList = {
    projectDate: () => {
      console.log(1);
      viewData.sort(
        (a, b) =>
          // new Date(a.projectDate).getTime() - new Date(b.projectDate).getTime()
          a.projectSeq - b.projectSeq
      );
    },
    projectUpdateDate: () => {
      console.log(2);
      setViewData(
        viewData.sort(
          (a, b) =>
            // new Date(a.projectUpdateDate).getTime() -
            // new Date(b.projectUpdateDate).getTime()
            b.projectSeq - a.projectSeq
        )
      );
    },
  };

  const orderList = (orderValue: string) => {
    if (orderValue === 'order-recent') {
      doSortList.projectUpdateDate();
      setViewData(PROJECT_DATA);
    } else if (orderValue === 'order-register') {
      doSortList.projectDate();
      setViewData(PROJECT_DATA2);
    }
  };

  useEffect(() => {
    orderList(orderValue);
  }, [orderValue]);

  useEffect(() => {
    console.log(viewData);
  }, [viewData]);

  return (
    <div>
      <div>
        <header className='flex items-center justify-between px-5 py-2'>
          <div className='text-left'>
            <span>Home</span>
          </div>
        </header>
      </div>
      <DividingLine />
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
