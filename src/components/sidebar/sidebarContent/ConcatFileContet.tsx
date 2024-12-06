import { Button } from '@/components/ui/button';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { useTextInputs } from '@/stores/textInputStore';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useConcatStore } from '@/stores/concatStore';

interface IFileStatus {
  name: string;
  status: '완료' | '오류';
}

interface IFileContentProps {
  allFiles: IFileStatus[];
  setAllFiles: React.Dispatch<React.SetStateAction<IFileStatus[]>>;
  uploadedFiles: string[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<string[]>>;
  uploadingCount: number;
  setUploadingCount: React.Dispatch<React.SetStateAction<number>>;
}

export const ConcatFileContent: React.FC<IFileContentProps> = ({
  allFiles,
  setAllFiles,
  uploadedFiles,
  setUploadedFiles,
  uploadingCount,
  setUploadingCount,
}) => {
  const setDatas = useConcatStore((state) => state.setDatas);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map((file) => ({
        name: file.name,
        status: '업로드 중',
      }));

      // 전체 업로드 시도된 파일 추가
      setAllFiles((prev) => [
        ...prev,
        ...fileNames.map((file) => ({
          name: file.name,
          status: '완료' as '완료', // status의 타입을 맞추기 위해 '완료'로 지정
        })),
      ]);

      setUploadingCount((prev) => prev + fileNames.length); // 업로드 중 파일 개수 증가

      Array.from(files).forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            // 업로드 완료된 파일 상태 업데이트
            setAllFiles((prev) =>
              prev.map((item) =>
                item.name === file.name ? { ...item, status: '완료' } : item
              )
            );

            // 업로드 완료된 파일 추가
            setUploadedFiles((prev) => [...prev, file.name]);
          } catch (error) {
            // 파일 상태를 오류로 업데이트
            setAllFiles((prev) =>
              prev.map((item) =>
                item.name === file.name ? { ...item, status: '오류' } : item
              )
            );
            alert('업로드중 오류가 발생했습니다.');
          } finally {
            // 업로드 중 개수 감소
            setUploadingCount((prev) => prev - 1);
          }
        };

        reader.onerror = () => {
          // 파일 상태를 오류로 업데이트
          setAllFiles((prev) =>
            prev.map((item) =>
              item.name === file.name ? { ...item, status: '오류' } : item
            )
          );
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
    <div className='flex flex-col justify-between h-full'>
      <div>
        <div>
          <p className='mb-4'>편집 오디오</p>
          <Button
            className='w-full mb-2'
            size='sm'
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            오디오 파일 추가
          </Button>
          <input
            id='file-upload'
            type='file'
            accept='.wav, .mp3'
            className='hidden'
            onChange={handleFileUpload}
            multiple
          />
          <CircularProgress
            total={allFiles.length}
            current={uploadedFiles.length}
          />
          <ScrollArea className='h-24 my-2'>
            <ul className='flex flex-col w-full gap-2 px-3 mt-2'>
              {allFiles.map((file, index) => (
                <li
                  key={index}
                  className='flex items-center justify-between text-gray-700'
                >
                  <div className='flex items-center'>
                    <span className='text-sm'>{file.name}</span>
                  </div>
                  <div className='flex items-center'>
                    <span
                      className={`mr-2 w-3 h-3 rounded-full ${
                        file.status === '완료' ? 'bg-blue-500' : 'bg-red-500'
                      }`}
                    ></span>
                    <span className='text-sm'>{file.status}</span>
                  </div>
                </li>
              ))}
            </ul>
            <ScrollBar forceMount orientation='vertical' />
          </ScrollArea>
        </div>

        <Separator className='my-3' />
        <div>
          <p className='mb-4 text-md'>텍스트</p>
          <Button className='w-full' size='sm'>
            텍스트 파일 추가
          </Button>
        </div>

        <Separator className='my-3' />

        <div>
          <p className='mb-4 text-md'>배경 오디오</p>
          <Button className='w-full' size='sm'>
            배경 오디오 추가
          </Button>
          <ul className='mt-3 text-sm'>{/* <li>bgm.mp3</li> */}</ul>
        </div>
      </div>
      <Button size='lg' variant={'green'}>
        생성하기
      </Button>
    </div>
  );
};
