import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ROUTES } from '@/constants/route';
import useChecked from '@/hooks/useChecked';
import { IProjectProps } from '@/types/project';
import { SquareArrowOutUpRightIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export type ViewOptionType = 'tile' | 'list';

export interface IListViewProps {
  option?: ViewOptionType;
  data?: IProjectProps[];
  navi: NavigateFunction;
}

const ListView = ({ option = 'list', data }: Omit<IListViewProps, 'navi'>) => {
  const navigate = useNavigate();
  return (
    <div>
      {option === 'list' ? (
        <List data={data} navi={navigate} />
      ) : (
        <Tile data={data} navi={navigate} />
      )}
    </div>
  );
};

const List = ({ data, navi }: IListViewProps) => {
  const [items, setItems] = useState<IProjectProps[]>(() => {
    const initialData = data || [];
    return initialData.map((item) => ({ ...item, checked: false }));
  });
  const [masterChecked, setMasterChecked] = useState<boolean>(false);
  const { checkedList, handleCheckedList } = useChecked();

  const handleCheckboxChange = (id: number): void => {
    setItems(
      items.map((item) => {
        if (item.projectId === id) {
          handleCheckedList.set(id);
        }
        return item.projectId === id
          ? { ...item, checked: !item.checked }
          : item;
      })
    );
  };

  const handleSelectAll = (): void => {
    setItems(
      items.map((item) => ({
        ...item,
        checked: !masterChecked,
      }))
    );
    !masterChecked
      ? handleCheckedList.addAll(items.map((item) => item.projectId))
      : handleCheckedList.removeAll();
  };

  useEffect(() => {
    const allChecked = items.every((item) => item.checked);
    setMasterChecked(allChecked);
  }, [items]);

  const onTest = () => {
    alert(`삭제요청 리스트: ${checkedList}`);
    // 삭제요청 API 호출
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-10'>
              <Checkbox onClick={handleSelectAll} checked={masterChecked} />
            </TableHead>
            <TableHead className='w-[50%]'>Name</TableHead>
            <TableHead>Last modified</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>바로가기</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, idx) => {
            return (
              <TableRow key={item.name + idx}>
                <TableCell>
                  <Checkbox
                    onClick={() => {
                      handleCheckboxChange(item.projectId);
                    }}
                    checked={item.checked}
                  />
                </TableCell>
                <TableCell className='font-medium'>{item.name}</TableCell>
                <TableCell>{item.modDate}</TableCell>
                <TableCell>{item.regDate}</TableCell>
                <TableCell
                  className='hover:cursor-pointer'
                  onClick={() => {
                    navi(ROUTES.PROJECT + ROUTES.TTS + `/${item.projectId}`);
                  }}
                >
                  <SquareArrowOutUpRightIcon />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {checkedList.length > 0 ? (
        <Button variant={'destructive'} onClick={onTest}>
          삭제하기
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

const Tile = ({ data, navi }: IListViewProps) => {
  const onTest = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    // 체크박스 클릭 동작
  };
  return (
    <div>
      <ul className='flex flex-wrap flex-1'>
        {data ? (
          data.map((item, idx) => (
            <li
              key={item.name + idx}
              className='p-5 m-5 w-[30%] border hover:cursor-pointer hover:scale-95 duration-100 rounded-lg z-10'
              onClick={() => {
                navi(ROUTES.PROJECT + ROUTES.TTS + `/${item.projectId}`);
              }}
            >
              <Checkbox
                className='relative z-0 hover:bg-neutral-100'
                onClick={(
                  e: React.MouseEvent<HTMLInputElement, MouseEvent>
                ) => {
                  e.stopPropagation();
                  onTest(e);
                }}
              />
              <div className='content-center h-40 text-center'>썸네일</div>
              <div>{item.name}</div>
            </li>
          ))
        ) : (
          <div className='flex items-center justify-center h-40'>
            <p>데이터를 불러오는 중입니다...</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ListView;
