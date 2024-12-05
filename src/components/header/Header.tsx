import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.png';

interface IHeaderProps {
  projectTab?: boolean;
}
const Header = ({ projectTab = false }: IHeaderProps) => {
  return (
    <header className='flex-none h-[50px] bg-[#f8f8f8] flex items-center px-4 border-b-2 border-[#eee]'>
      <h1 className='w-[90px]'>
        <Link to='/'>
          <img src={Logo} />
        </Link>
      </h1>

      {projectTab && (
        <nav className='pl-5'>
          <ul className='flex items-center px-4 text-sm'>
            <li className='border-[#eee] border-x'>
              <Link
                to={`/project/tts/project1`}
                className='hover:underline flex items-center h-[50px] px-4'
              >
                Project 01
              </Link>
            </li>
            <li className='border-r border-[#eee]'>
              <Link
                to={`/project/tts/project2`}
                className='hover:underline flex items-center h-[50px] px-4'
              >
                Project 02
              </Link>
            </li>
            <li className='border-r border-[#eee]'>
              <Link
                to={`/project/tts/project3`}
                className='hover:underline flex items-center h-[50px] px-4'
              >
                Project 03
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
