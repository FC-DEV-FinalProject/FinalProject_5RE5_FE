import { useParams } from 'react-router-dom';

const Concat = () => {
  const { projectId } = useParams<{ projectId: string }>();
  return <div>concat 생성페이지 프로젝트 ID: {projectId}</div>;
};

export default Concat;
