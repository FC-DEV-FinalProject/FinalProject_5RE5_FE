import { CustomCheckbox } from '@/components/common/CustomCheckbox';
import { Button } from '@/components/ui/button';
import { OneVcState, useVcStore, VcState } from '@/stores/vcDataStore';

interface VcControlsProps {
  state: VcState;
  toggleAllSelection: () => void;
  addRemoveList: (seqList: number[]) => void;
  selectedCount: number;
  totalCount: number;
}

const VcControls = ({
  state,
  toggleAllSelection,
  addRemoveList,
  selectedCount,
  totalCount,
}: VcControlsProps) => {
  const { setActivate } = useVcStore();

  const anySelected = selectedCount > 0;

  const handler = {
    removeButton: () => {
      const removeList = state.vcList
        .filter((oneVc) => oneVc.isSelected)
        .map((oneVc) => oneVc.vcSrcFile.seq);

      addRemoveList(removeList);
      removeList.map((removeSeq) => {
        setActivate(removeSeq);
      });
    },
  };

  return (
    <>
      <div>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-2'>
            <CustomCheckbox
              id='select-all'
              checked={state.isAllSelected}
              onCheckedChange={toggleAllSelection}
            />
            <label htmlFor='select-all'>
              {anySelected
                ? `${selectedCount}/${totalCount} 선택`
                : '전체 선택'}
            </label>
          </div>
          <Button
            onClick={handler.removeButton}
            disabled={!anySelected}
            variant='outline'
            className='w-24 rounded-3xl'
          >
            선택 삭제
          </Button>
        </div>
      </div>
    </>
  );
};

export default VcControls;
