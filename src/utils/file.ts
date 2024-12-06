import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';
import { IVcFileProps } from '@/pages/VC';

export const downloadFile = async (url: string, filename: string) => {
  if (!url || !filename) {
    throw new Error('URL과 파일명은 필수값입니다.');
  }
  let objectUrl: string | null = null;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`파일 다운로드 실패: ${response.status}`);
    }
    const blob = await response.blob();
    const link = document.createElement('a');
    objectUrl = window.URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = filename;
    link.click();
  } catch (error) {
    console.error('파일 다운로드 중 오류 발생:', error);
    throw error;
  } finally {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
  }
};

/**
 *
 * @param fileDataList 다운로드 파일 리스트
 * @param zipname 압축파일 명
 */
export const downloadZip = async (
  fileDataList: IVcFileProps[],
  zipname: string
) => {
  if (fileDataList.length === 0) return;
  const zip = new JSZip();
  const fetchPromises = fileDataList.map((fileData, index) => {
    return new Promise<void>((resolve, reject) => {
      JSZipUtils.getBinaryContent(
        fileData.fileUrl,
        (err: Error | null, data: string | ArrayBuffer) => {
          if (err) {
            reject(err);
          } else {
            const filename = `${index}_${fileData.name}`;
            zip.file(filename, data, { binary: true });
            resolve();
          }
        }
      );
    });
  });

  try {
    await Promise.all(fetchPromises);
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, zipname);
  } catch (error) {
    console.error('Error creating zip file:', error);
  }
};
