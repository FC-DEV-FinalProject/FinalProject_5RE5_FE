import { ROUTES } from '@/constants/route';
import { LucideProps } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface IProjectIconMenuProps {
  icon?: React.ComponentType<Omit<LucideProps, 'ref'>>;
  name: string;
  linkTo: string;
}

const ProjectIconMenu = (props: IProjectIconMenuProps) => {
  return (
    <Link to={props.linkTo}>
      <div className='flex flex-col p-2 hover:bg-accent hover:font-bold hover:text-accent-foreground rounded-2xl'>
        {props.icon && (
          <props.icon className='text-center w-[100%] my-2' size={24} />
        )}
        <p className='text-xs text-center'>{props.name}</p>
      </div>
    </Link>
  );
};

export default ProjectIconMenu;
