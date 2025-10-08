import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Lightbulb,
  FileText,
  Target,
  MessageCircle,
  Menu,
  X,
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Assistant from './Assistant';

interface LayoutProps {
  children: ReactNode;
  yearLevel: 'l1' | 'l2' | 'l3';
}

export default function Layout({ children, yearLevel }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const yearTitle = {
    l1: 'Licence 1',
    l2: 'Licence 2',
    l3: 'Licence 3',
  }[yearLevel];

  const menuItems = [
    { name: 'UE / Cours', path: `/${yearLevel}/courses`, icon: BookOpen },
    { name: 'Emploi du temps', path: `/${yearLevel}/timetable`, icon: Clock },
    { name: 'Conseils & Orientation', path: `/${yearLevel}/advice`, icon: Lightbulb },
    { name: 'Documents & Bibliothèque', path: `/${yearLevel}/documents`, icon: FileText },
  ];

  if (yearLevel === 'l3') {
    menuItems.push({ name: 'Débouchés & Stages', path: `/${yearLevel}/careers`, icon: Target });
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed top-0 left-0 right-0 bg-gray-800 shadow-lg z-40 border-b-2 border-[#006400]">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition text-white"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-xl font-bold text-[#00A86B] ml-2">{yearTitle}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Accueil</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-900/30 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-gray-800 border-r-2 border-[#006400] shadow-lg transform transition-transform duration-300 z-30 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-[#006400] text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
        />
      )}

      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      <Assistant />
    </div>
  );
}
