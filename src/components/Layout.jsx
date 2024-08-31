import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Network, 
  FileText, 
  Users, 
  Database, 
  UserCheck, 
  ShieldAlert,
  ChevronDown,
  Home,
  Menu
} from 'lucide-react';

const menuItems = [
  { icon: Network, label: 'Data Mapping', to: '/' },
  { icon: FileText, label: 'Governance Document', to: '/governance' },
  { icon: Users, label: 'Employee Awareness', to: '/awareness' },
  { icon: Database, label: 'Data Processors', to: '/processors' },
  { icon: UserCheck, label: 'Subject Access Request', to: '/sar' },
  { icon: ShieldAlert, label: 'Data breach register', to: '/breach' },
];

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm md:hidden">
        <div className="px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">

          <img src="/image/logo.png" alt="Logo" />

            <div className="font-semibold text-lg">PDPA / International School</div>
          </div>
          {/* <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </Button> */}
        </div>
        {isMobileMenuOpen && (
          <nav className="border-b-2 py-2 overflow-scroll bg-[#f5f5f5]">
            <ul className="space-y-1 flex w-max">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.to} 
                    className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 ${
                      location.pathname === item.to ? 'text-green-600' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (hidden on mobile) */}
        <div className="hidden lg:block w-100 lg:w-85 bg-[#f5f5f5]  shadow-md">
          <div className="p-4 flex items-center space-x-2 bg-white  ">
            
          <img src="/image/logo.png" class="w-[33px] h-[32px]" alt="Logo" />


            <div className="font-semibold text-lg">PDPA / International School</div>
            <ChevronDown className="w-4 h-4" />
          </div>
          <nav className="mt-4">
            <ul className="space-y-2 p-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.to} 
                    className={`flex items-center space-x-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded p-2 ${
                      location.pathname === item.to ? 'bg-green-50 text-green-600' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Header */}
          <header className="bg-white shadow-sm hidden md:block">
            <div className="max-w-100 mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div className="flex items-center space-x-4">
         
              </div>
              <div className="flex items-center space-x-4">
                <img src="/image/actions.png" alt="User avatar" className="w-8 h-8 rounded-full" />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="max-w-100 mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
