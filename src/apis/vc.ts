/**
 * api 리스트
 * 1. 전체 행 조회: /vc/{proSeq}
 * 2. src 저장
 * 3. trg 저장
 */

interface IVCProps<T = {}> {
  projectSeq: number;
  memberSeq: number;
  fileData?: T;
}

/**
 * 프로젝트 vc 전체 행 조회
 */
const getVCList = ({ projectSeq, memberSeq }: IVCProps) => {};

/**
 * 원본파일 1개 저장
 */
const saveSrcFile = ({
  projectSeq,
  memberSeq,
  fileData,
}: IVCProps<{ fileData: File }>) => {};

/**
 * 원본파일 n개 저장
 */
const saveSrcFiles = ({
  projectSeq,
  memberSeq,
  fileData,
}: IVCProps<{ fileData: File[] }>) => {};

/**
 * 보이스파일 1개 저장
 */
const saveTrgFile = ({
  projectSeq,
  memberSeq,
  fileData,
}: IVCProps<{ fileData: File }>) => {};

/**
 * 보이스파일 n개 저장
 */
const saveTrgFiles = ({
  projectSeq,
  memberSeq,
  fileData,
}: IVCProps<{ fileData: File[] }>) => {};

/**
 * vc 정보 생성
 */
const createVc = () => {};

/**
 * vc 정보 수정
 */
const modifyVc = () => {};

/**
 * vc 정보 삭제
 */
const removeOneLine = () => {};
