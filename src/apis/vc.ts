/**
 * api 리스트
 * 1. 전체 행 조회: /vc/{proSeq}
 * 2. src 저장
 * 3. trg 저장
 */

import { apiRequest } from '@/apis/apiClient';

const APIURL_VC = {
  GET_VC_LIST: (projectSeq: number) => `/vc/${projectSeq}`,
  CREATE_VC: (srcSeq: number, trgSeq: number) =>
    `/vc/result?srcSeq=${srcSeq}&trgSeq=${trgSeq}`,
  REMOVE_SRC: `/vc/src`,
};

interface IVCProps<T = {}> {
  projectSeq: number;
  fileData?: T;
}

export interface IVcDataResponse {}

/**
 * 프로젝트 vc 전체 행 조회
 */
export const getVcList = async ({ projectSeq }: IVCProps) => {
  try {
    const response = await apiRequest.get<IVcDataResponse>(
      APIURL_VC.GET_VC_LIST(projectSeq)
    );

    if (response.code !== 200)
      throw new Error(`${response.code}, ${response.message}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

/**
 * 원본파일 1개 저장
 */
export const saveSrcFile = ({
  projectSeq,
  fileData,
}: IVCProps<{ fileData: File }>) => {};

/**
 * 원본파일 n개 저장
 */
export const saveSrcFiles = ({
  projectSeq,
  fileData,
}: IVCProps<{ fileData: File[] }>) => {};

/**
 * 보이스파일 1개 저장
 */
export const saveTrgFile = ({
  projectSeq,
  fileData,
}: IVCProps<{ fileData: File }>) => {};

/**
 * 보이스파일 n개 저장
 */
export const saveTrgFiles = ({
  projectSeq,
  fileData,
}: IVCProps<{ fileData: File[] }>) => {};

/**
 * vc 정보 생성
 */
export const createVc = (srcSeq: number, trgSeq: number) => {
  try {
    console.log(`createVc ${srcSeq}, ${trgSeq}`);
    apiRequest.post(APIURL_VC.CREATE_VC(srcSeq, trgSeq));
  } catch (err) {
    console.error(err);
  }
};

/**
 * vc 정보 수정
 */
export const modifyVc = () => {};

/**
 * vc 정보 삭제
 */
export const removeSrc = (seqList: number[]) => {
  console.log(seqList);
  apiRequest.delete(APIURL_VC.REMOVE_SRC, { data: seqList });
};
