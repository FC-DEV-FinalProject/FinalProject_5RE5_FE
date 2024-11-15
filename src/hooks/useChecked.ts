import { useState } from 'react';

const useChecked = () => {
  const [checkedList, setCheckedList] = useState<number[]>([]);

  const handleCheckedList = {
    get: () => {
      return checkedList;
    },
    add: (projectId: number) => {
      if (!checkedList.includes(projectId))
        setCheckedList([...checkedList, projectId]);
    },
    remove: (projectId: number) => {
      setCheckedList(checkedList.filter((num) => num !== projectId));
    },
    set: (projectId: number) => {
      checkedList.includes(projectId)
        ? setCheckedList(checkedList.filter((num) => num !== projectId))
        : setCheckedList([...checkedList, projectId]);
    },
    addAll: (idList: number[]) => {
      setCheckedList(idList);
    },
    removeAll: () => {
      setCheckedList([]);
    },
  };

  return {
    checkedList,
    handleCheckedList,
  };
};

export default useChecked;
