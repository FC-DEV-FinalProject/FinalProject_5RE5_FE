import React from 'react';

interface IDivideProps {
  className?: string;
}

const DividingLine = (props: IDivideProps) => {
  return (
    <div
      className={`border-b-[1px] border-b-gray-300 ${props.className ?? ''}`}
    />
  );
};

export default DividingLine;