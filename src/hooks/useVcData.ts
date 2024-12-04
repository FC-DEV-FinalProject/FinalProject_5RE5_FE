import { IVcDataResponse } from '@/apis/vc';
import { useState } from 'react';

export const useVcData = (projectSeq: number) => {
  const [isSelected, setIsSelected] = useState<boolean>();
  const [isEditing, setIsEditing] = useState<boolean>();
  const [audioRefList, setAudioRefList] = useState<HTMLAudioElement[]>();
  const [vcList, setVcList] = useState<IVcDataResponse>();
};
