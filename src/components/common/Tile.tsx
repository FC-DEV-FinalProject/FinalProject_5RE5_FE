import { Button } from '@/components/ui/button';
import { LucideProps } from 'lucide-react';
import React from 'react';

interface ITileProps {
  title: string;
  icon?: React.ComponentType<Omit<LucideProps, 'ref'>>;
  desc?: string;
  className?: string;
  onClick?: () => void;
}

const Tile = (props: ITileProps) => {
  return (
    <div
      className={
        ' p-3 border h-[200px] rounded-lg hover:cursor-pointer hover:bg-accent hover:text-accent-foreground ' +
        `${props.className ?? ''}`
      }
      onClick={props.onClick}
    >
      <div className='content-center text-center h-2/3'>
        {props.icon && (
          <props.icon className='text-center w-[100%]' size={40} />
        )}
        <p className='mt-2 font-bold'>{props.title}</p>
      </div>
      {props.desc && (
        <div className='mt-2 text-sm text-center text-gray-500 break-keep'>
          {props.desc}
        </div>
      )}
    </div>
  );
};

export default Tile;
