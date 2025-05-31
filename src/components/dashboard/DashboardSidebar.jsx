import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  User,
  Bell,
  Heart,
  ShoppingCart,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardSidebar = () => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      exact: true
    },
    {
      title: 'Appointments',
      icon: Calendar,
      path: '/dashboard/appointments'
    },
    {
      title: 'Patients',
      icon: Users,
      path: '/dashboard/patients'
    },
    {
      title: 'Analytics',
      icon: Users,
      path: '/dashboard/analytics'
    },
    {
      title: 'Medical Records',
      icon: FileText,
      path: '/dashboard/medical-records'
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/dashboard/settings'
    },
    {
      title: 'Doctor',
      icon: Settings,
      path: '/dashboard/doctor'
    }
  ];
  const {user} = useAuth()

  return (
    <div className="w-64 bg-body border shadow-md shadow-borderColor border-borderColor  h-fit flex flex-col rounded-md sticky top-32">
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-text hover:bg-placeholderText hover:text-primary'
                    }`
                  }
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-6 border-t border-borderColor">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-placeholderText">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-hoverText">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
