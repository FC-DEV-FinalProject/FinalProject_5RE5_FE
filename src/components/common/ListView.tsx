import { Badge } from '@/components/ui/badge';
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
import { useCheckedStore } from '@/stores/checkedStore';
import { IProjectProps } from '@/types/project';
import { convertDateFormat } from '@/utils/date';
import {
  BookAIcon,
  CombineIcon,
  LucideProportions,
  MicIcon,
  SquareArrowOutUpRightIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export type ViewOptionType = 'tile' | 'list';

export interface IListViewProps {
  option?: ViewOptionType;
  data?: IProjectProps[];
  navi: NavigateFunction;
  viewRemoveData?: boolean;
}

const thumbnail = [BookAIcon, MicIcon, CombineIcon];

const ListView = ({
  option = 'list',
  data,
  viewRemoveData,
}: Omit<IListViewProps, 'navi'>) => {
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
  const { addChecked, removeChecked, removeAll } = useCheckedStore();

  const [items, setItems] = useState<IProjectProps[]>(() => {
    const initialData = data || [];
    return initialData.map((item) => ({ ...item, checked: false }));
  });
  const [masterChecked, setMasterChecked] = useState<boolean>(false);
  const { checkedList, handleCheckedList } = useChecked();

  const handleCheckboxChange = (id: number): void => {
    setItems(
      items.map((item) => {
        if (item.projectSeq === id) {
          handleCheckedList.set(id);
        }
        return item.projectSeq === id
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
      ? handleCheckedList.addAll(items.map((item) => item.projectSeq))
      : handleCheckedList.removeAll();
  };

  useEffect(() => {
    const allChecked = items.every((item) => item.checked);
    setMasterChecked(allChecked);
  }, [items]);

  useEffect(() => {
    const currentChecked = new Set(checkedList);
    // 한 번의 업데이트로 처리
    useCheckedStore.setState((state) => ({
      ...state,
      checkedList: Array.from(currentChecked),
    }));
  }, [checkedList]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-10'>
              <Checkbox onClick={handleSelectAll} checked={masterChecked} />
            </TableHead>
            <TableHead className='w-[30%] text-center'>프로젝트 명</TableHead>
            <TableHead className='text-center'>작업목록</TableHead>
            <TableHead className='text-center'>수정일</TableHead>
            <TableHead className='text-center'>생성일</TableHead>
            <TableHead className='text-center'>바로가기</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, idx) => {
            return (
              <TableRow key={item.projectName + idx}>
                <TableCell>
                  <Checkbox
                    onClick={() => {
                      handleCheckboxChange(item.projectSeq);
                    }}
                    checked={item.checked}
                  />
                </TableCell>
                <TableCell className='font-medium truncate'>
                  {item.projectName}
                </TableCell>
                <TableCell className='flex justify-center gap-2 pt-2 text-center'>
                  {item.tts ? <Badge variant={'outline'}>TTS</Badge> : <></>}
                  {item.vc ? <Badge variant={'destructive'}>VC</Badge> : <></>}
                  {item.concat ? (
                    <Badge variant={'default'}>Concat</Badge>
                  ) : (
                    <></>
                  )}
                </TableCell>
                <TableCell className='text-center'>
                  {convertDateFormat(
                    new Date(item.projectUpdateDate),
                    'YYYY-MM-DD'
                  )}
                </TableCell>
                <TableCell className='text-center'>
                  {convertDateFormat(new Date(item.projectDate), 'YYYY-MM-DD')}
                </TableCell>
                {item.projectActivate === 'Y' ? (
                  <TableCell
                    className={`flex justify-center h-full  ${item.projectActivate === 'Y' ? 'hover:cursor-pointer' : 'cursor-not-allowed'}`}
                    onClick={() => {
                      navi(ROUTES.PROJECT + ROUTES.TTS + `/${item.projectSeq}`);
                    }}
                  >
                    <SquareArrowOutUpRightIcon />
                  </TableCell>
                ) : (
                  <TableCell className='flex justify-center h-full hover:cursor-not-allowed'>
                    <Badge variant={'destructive'}>삭제됨</Badge>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const Tile = ({ data, navi }: IListViewProps) => {
  const onTest = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    // 체크박스 클릭 동작
  };
  return (
    <div>
      <ul className='flex flex-wrap justify-between flex-1 gap-5'>
        {data ? (
          data.map((item, idx) => (
            <li
              key={item.projectName + idx}
              className='p-5 w-[30%] h-[150px] border hover:cursor-pointer hover:scale-95 duration-100 rounded-lg z-10 content-center '
              onClick={() => {
                navi(ROUTES.PROJECT + ROUTES.TTS + `/${item.projectSeq}`);
              }}
            >
              {/* <Checkbox
                className='relative z-0 hover:bg-neutral-100'
                onClick={(
                  e: React.MouseEvent<HTMLInputElement, MouseEvent>
                ) => {
                  e.stopPropagation();
                  onTest(e);
                }}
              /> */}

              <div className='text-center'>{item.projectName}</div>
              <div className='flex justify-center gap-2 pt-2 text-center'>
                {item.tts ? <Badge variant={'outline'}>TTS</Badge> : <></>}
                {item.vc ? <Badge variant={'destructive'}>VC</Badge> : <></>}
                {item.concat ? (
                  <Badge variant={'default'}>Concat</Badge>
                ) : (
                  <></>
                )}
              </div>
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
