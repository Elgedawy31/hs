import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  UsersIcon,
  CameraIcon,
  CreditCardIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const MenuItem = ({ icon: Icon, label, path }) => (
    <button
      onClick={() => navigate(path)}
      className={`w-full flex items-center relative group transition-all duration-300 ease-in-out text-sm sm:text-base`}
    >
      <div
        className={`absolute left-0 w-[2px] sm:w-[3px] h-full transform transition-all duration-300 ease-in-out 
          ${location.pathname === path ? 'bg-primary scale-y-100' : 'bg-transparent scale-y-0 group-hover:scale-y-100 group-hover:bg-primary/50'}`}
      />
      <div
        className={`flex items-center w-full px-3 sm:px-4 py-2 transform transition-all duration-300 ease-in-out
          ${location.pathname === path ? 'bg-secondPrimaryColor translate-x-1' : 'bg-transparent hover:translate-x-1 hover:bg-secondPrimaryColor/50'}
          text-text hover:text-hoverText`}
      >
        <Icon
          className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ease-in-out group-hover:scale-110 
            ${location.pathname === path ? 'text-primary' : 'text-text'}`}
        />
        <span className="ml-2 sm:ml-3 flex-1 text-left font-medium transition-all duration-300">{label}</span>
      </div>
    </button>
  );

  return (
    <aside
      className={`
        fixed inset-y-0 z-50 flex w-[16rem] sm:w-[17rem] lg:w-[18rem] flex-col bg-body lg:relative
        transition-all duration-500 ease-in-out transform
        lg:translate-x-0 lg:opacity-100 lg:scale-100
        ${sidebarOpen ? 'translate-x-[-20px] opacity-100 scale-100' : '-translate-x-full opacity-0 scale-95'}`}
    >
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-0.5 sm:space-y-1 w-[85%] sm:w-[80%] mx-auto">
          <MenuItem
            icon={HomeIcon}
            label="Dashboard"
            path="/"
          />
          <MenuItem
            icon={UsersIcon}
            label="Employees"
            path="/employees"
          />
          <MenuItem
            icon={CameraIcon}
            label="Screenshots"
            path="/screenshots"
          />
          <MenuItem
            icon={CreditCardIcon}
            label="Payment"
            path="/payment"
          />
          <MenuItem
            icon={StarIcon}
            label="Bonus"
            path="/bonus"
          />
        </nav>
      </div>
    </aside>
  );
}
