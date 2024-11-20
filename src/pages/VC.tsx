import { useParams } from 'react-router-dom';

const VC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  return <div>vc 생성페이지 프로젝트 ID: {projectId}</div>;
};

export default VC;
