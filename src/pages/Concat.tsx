import { ConcatHeader } from '@/components/concat/ConcatHeader';
import ConcatTextWrap from '@/components/concat/ConcatTextWrap';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useConcatCheckboxStore } from '@/stores/concatCheckboxStore';
import { useConcatStore } from '@/stores/concatStore';
import { IConcatdata } from '@/types/concat';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// const datas: IConcatdata[] = [
//   {
//     id: 'src1',
//     text: 'src1',
//     dndId: 'dnd1',
//   },
//   {
//     id: 'src2',
//     text: 'src2',
//     dndId: 'dnd2',
//   },
//   {
//     id: 'src3',
//     text: 'src3',
//     dndId: 'dnd3',
//   },
//   {
//     id: 'src4',
//     text: 'src4',
//     dndId: 'dnd4',
//   },
//   {
//     id: 'src5',
//     text: 'src5',
//     dndId: 'dnd5',
//   },
//   {
//     id: 'src6',
//     text: 'src6',
//     dndId: 'dnd6',
//   },
// ];

const Concat = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectName, setProjectName] = useState(projectId || '새 프로젝트');
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };
  const datas = useConcatStore((state) => state.datas);
  console.log(datas);

  const { selectedItems, selectAll, clearAll } = useConcatCheckboxStore();

  const isAllSelected = selectedItems.length === datas.length;

  return (
    <div>
      <div>
        <ConcatHeader
          projectName={projectName}
          onProjectNameChange={handleProjectNameChange}
        />

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Checkbox
              className='data-[state=checked]:bg-green-6 data-[state=checked]:border-green-6 border-gray-300 w-5 h-5'
              id='selectAll'
              checked={isAllSelected}
              onCheckedChange={(isChecked) =>
                isChecked ? selectAll(datas.map((data) => data.id)) : clearAll()
              }
            />
            <label
              htmlFor='selectAll'
              className='text-gray-600 cursor-pointer text-md peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              전체 선택
            </label>
          </div>
          <div>
            <Button variant='outline' className='w-24 rounded-3xl'>
              선택 삭제
            </Button>
          </div>
        </div>
        <div className='px-4 py-2 my-4 border border-gray-200 rounded-lg w-fit'>
          시작 무음 0.0초
        </div>
      </div>

      <div className='overflow-y-auto'>
        <ConcatTextWrap datas={datas} />
      </div>
    </div>
  );
};

export default Concat;
