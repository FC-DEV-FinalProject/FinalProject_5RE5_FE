import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';
import { IVcFileProps } from '@/pages/VC';

export const downloadFile = async (url: string, filename: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
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
