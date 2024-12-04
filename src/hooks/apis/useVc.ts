import { getVcList, IVcDataResponse } from '@/apis/vc';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const useVc = () => {
  const [vcList, setVcList] = useState<IVcDataResponse>();
  return useMutation({
    mutationFn: getVcList,
    onSuccess: (item) => {
      setVcList(item);
    },
  });
};

export default useVc;
