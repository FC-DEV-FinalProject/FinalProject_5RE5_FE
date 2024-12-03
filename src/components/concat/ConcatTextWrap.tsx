import ConcatTextItem from '@/components/concat/ConcatTextItem';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { IConcatdata, IFormValues } from '@/types/concat';
import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface IConcatTextWrapProps {
  datas: IConcatdata[];
}
export const ConcatTextWrap = ({ datas }: IConcatTextWrapProps) => {
  const [items, setItems] = useState(datas);
  const [activeId, setActiveId] = useState<string | null>(null);

  const dragHandler = {
    start: (event: DragStartEvent) => {
      setActiveId(event.active.id as string);
    },
    end: (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = items.findIndex((item) => item.dndId === active.id);
      const newIndex = items.findIndex((item) => item.dndId === over.id);
      setItems((prevItems) => arrayMove(prevItems, oldIndex, newIndex));
    },
  };

  const { register, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      checkbox: [],
      text: [],
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
  };

  const dragOverlay = items.find((item) => item.dndId === activeId);

  return (
    <ul className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={dragHandler.start}
          onDragEnd={dragHandler.end}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={items.map((item) => item.dndId)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <ConcatTextItem
                key={item.dndId}
                register={register}
                item={item}
                dndId={item.dndId}
              />
            ))}
          </SortableContext>

          <DragOverlay modifiers={[restrictToVerticalAxis]}>
            {dragOverlay ? (
              <ConcatTextItem
                key={dragOverlay.dndId}
                register={register}
                item={dragOverlay}
                dndId={dragOverlay.dndId}
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        <Button type='submit'>생성하기</Button>
      </form>
    </ul>
  );
};

export default ConcatTextWrap;
