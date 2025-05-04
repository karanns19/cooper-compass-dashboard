import { FC } from 'react';
import ExpandIcon from '../assets/icons/Expand Icon.png';
import CollapseIcon from '../assets/icons/Collapse Icon.png';
import ProfileIcon from '../assets/icons/profile.png'; // fallback icon
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ isCollapsed, toggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between bg-white h-16 px-4 shadow-lg border-b-1 bg-[#f5f6f7] text-white me-[20px]">
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition"
      >
        <img
          src={isCollapsed ? ExpandIcon : CollapseIcon}
          alt="Toggle Sidebar"
          className="h-5 w-5"
        />
      </button>

      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/profile')}>
        <img
          src={user?.profileImage || ProfileIcon}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover cursor-pointer"
        />

        <div className="hidden md:flex flex-col space-x-2">
          <span className="text-md sm:text-sm font-regular text-black">{user ? `${user.firstName} ${user.lastName}` : ''}</span>
          <span className="text-sm text-black">{user?.role || ''}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
