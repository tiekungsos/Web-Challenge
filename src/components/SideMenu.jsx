import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Network, 
  FileText, 
  Users, 
  Database, 
  UserCheck, 
  ShieldAlert 
} from 'lucide-react';

const menuItems = [
  { icon: Network, label: 'Data Mapping', to: '/' },
  { icon: FileText, label: 'Governance Document', to: '/governance' },
  { icon: Users, label: 'Employee Awareness', to: '/awareness' },
  { icon: Database, label: 'Data Processors', to: '/processors' },
  { icon: UserCheck, label: 'Subject Access Request', to: '/sar' },
  { icon: ShieldAlert, label: 'Data breach register', to: '/breach' },
];

const SideMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-30 md:translate-x-0 md:static md:inset-auto md:w-auto`}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Button onClick={onClose} className="md:hidden">Close</Button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.to} className="flex items-center space-x-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded p-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;