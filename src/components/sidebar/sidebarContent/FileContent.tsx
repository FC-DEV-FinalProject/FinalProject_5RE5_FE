import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTextInputs } from '@/stores/textInputStore';
import { CircularProgress } from '@/components/ui/CircularProgress';

export const FileContent = () => {
  const { addTextInputs } = useTextInputs();
  const [allFiles, setAllFiles] = useState<string[]>([]); // 전체 업로드 시도된 파일 리스트
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // 업로드 완료된 파일 리스트
  const [uploadingCount, setUploadingCount] = useState<number>(0); // 현재 업로드 중인 파일 개수

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map((file) => file.name);

      // 전체 업로드 시도된 파일 추가
      setAllFiles((prev) => [...prev, ...fileNames]);
      setUploadingCount((prev) => prev + fileNames.length); // 업로드 중 파일 개수 증가

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const text = reader.result as string;
            const lines = text.split(/\n/); // 줄바꿈으로 나눔
            const sentences = lines
              .flatMap((line) => line.match(/[^.!?]+[.!?]?/g) || []) // 문장이 없을 경우 빈 배열 반환
              .filter((sentence) => sentence.trim()) // 빈값 제거
              .map((sentence) => sentence.trim()); // 공백 제거

            if (sentences.length > 30) {
              alert(
                `문장이 너무 많습니다. 최대 30개의 문장만 처리됩니다. (${sentences.length - 30}개의 문장은 무시됩니다.)`
              );
            }

            // 문장 추가
            addTextInputs(sentences.slice(0, 30));

            // 업로드 완료된 파일 추가
            setUploadedFiles((prev) => [...prev, file.name]);
          } catch (error) {
            alert('텍스트 처리 중 오류가 발생했습니다.');
          } finally {
            // 업로드 중 개수 감소
            setUploadingCount((prev) => prev - 1);
          }
        };

        reader.onerror = () => {
          alert('파일을 읽을 수 없습니다.');
          // 업로드 중 개수 감소
          setUploadingCount((prev) => prev - 1);
        };

        reader.readAsText(file);
      });

      e.target.value = ''; // 파일 입력 초기화
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 w-full'>
        <Button
          className='w-full'
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          텍스트 파일추가
        </Button>
        <input
          id='file-upload'
          type='file'
          accept='.txt'
          className='hidden'
          onChange={handleFileUpload}
        />
        <div className='w-full mt-4'>
          {allFiles.length === 0 ? (
            <p className='text-center text-gray-500'>
              텍스트 파일을 추가해주세요.
            </p>
          ) : (
            <div>
              <CircularProgress
                total={allFiles.length}
                current={uploadedFiles.length}
              />

              <ul className='pl-5 list-disc'>
                {uploadedFiles.map((file, index) => (
                  <li key={index} className='text-gray-700'>
                    {file}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className='flex items-center justify-between gap-1'>
        <Button className='flex-1' variant='green'>
          생성하기
        </Button>
      </div>
    </div>
  );
};
