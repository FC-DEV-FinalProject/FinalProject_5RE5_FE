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
import { MouseEvent, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export type ViewOptionType = 'tile' | 'list';

export interface IListViewProps {
  option?: ViewOptionType;
  data: IProjectProps[];
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
  const [items, setItems] = useState<IProjectProps[]>(data);
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
    const allChecked = items.every((item) => item.checked);
    setItems(
      items.map((item) => ({
        ...item,
        checked: !allChecked,
      }))
    );
    !allChecked
      ? handleCheckedList.addAll(items.map((item) => item.projectId))
      : handleCheckedList.removeAll();
  };

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
              <Checkbox onClick={handleSelectAll} />
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
  return (
    <div>
      <ul className='flex flex-wrap flex-1'>
        {data.map((item, idx) => (
          <li
            key={item.name + idx}
            className='p-5 m-5 w-[30%] border hover:cursor-pointer hover:scale-95 duration-100 rounded-lg z-0'
            onClick={() => {
              navi(ROUTES.PROJECT + ROUTES.TTS + `/${item.projectId}`);
            }}
          >
            <Checkbox className='fixed z-10' />
            <div className='content-center h-40 text-center'>썸네일</div>
            <div>{item.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
