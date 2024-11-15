import { Link } from 'react-router-dom';
import { useState } from 'react';

const HomeHeader = () => {
  // 프로젝트 목록 상태 관리
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 01' },
    { id: 2, name: 'Project 02' },
  ]);

  // 프로젝트 추가 함수
  const handleAddProject = () => {
    const newId = projects.length + 1;
    setProjects([
      ...projects,
      { id: newId, name: `Project ${newId.toString().padStart(2, '0')}` },
    ]);
  };

  return (
    <div>
      <header className='flex items-center gap-4 px-4 bg-gray-200 h-14'>
        <nav>
          <ul className='flex gap-4 '>
            {projects.map((project) => (
              <li key={project.id}>
                <Link to={`#project${project.id}`} className=' hover:underline'>
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={handleAddProject}
          className='px-2 py-1 rounded hover:bg-gray-400'
        >
          +
        </button>
      </header>
    </div>
  );
};

export default HomeHeader;
