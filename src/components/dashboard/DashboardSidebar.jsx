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

const DashboardSidebar = () => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      exact: true
    },
    {
      title: 'Profile',
      icon: User,
      path: '/dashboard/profile'
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
      title: 'Reports',
      icon: FileText,
      path: '/dashboard/reports'
    },
    {
      title: 'Messages',
      icon: MessageSquare,
      path: '/dashboard/messages'
    },
    {
      title: 'Notifications',
      icon: Bell,
      path: '/dashboard/notifications'
    },
    {
      title: 'Favorites',
      icon: Heart,
      path: '/dashboard/favorites'
    },
    {
      title: 'Cart',
      icon: ShoppingCart,
      path: '/dashboard/cart'
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/dashboard/settings'
    }
  ];

  return (
    <div className="w-64 bg-background border-r border-borderColor h-full flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-borderColor">
        <h2 className="text-xl font-bold text-primary">HealthSync</h2>
        <p className="text-sm text-hoverText">Dashboard</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
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
      <div className="p-4 border-t border-borderColor">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-placeholderText">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Dr. John Doe</p>
            <p className="text-xs text-hoverText">Dermatologist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
