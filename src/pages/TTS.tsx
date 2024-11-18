import { useParams } from 'react-router-dom';

const TTS = () => {
  const { projectId } = useParams<{ projectId: string }>();
  return <div>tts 생성 페이지 프로젝트 ID: {projectId}</div>;
};

export default TTS;
