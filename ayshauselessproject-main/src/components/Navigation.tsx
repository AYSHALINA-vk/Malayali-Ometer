import React from 'react';
import { Home, HelpCircle, Trophy } from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: any) => void;
  showNav: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate, showNav }) => {
  if (!showNav) return null;

  return (
    <nav className="static w-full flex justify-center mt-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border-2 border-green-200">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              currentScreen === 'home'
                ? 'bg-green-500 text-white shadow-md'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <Home size={20} />
            <span className="hidden sm:inline font-medium">Home</span>
          </button>

          <button
            onClick={() => onNavigate('results')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              currentScreen === 'results'
                ? 'bg-yellow-500 text-white shadow-md'
                : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
            }`}
          >
            <Trophy size={20} />
            <span className="hidden sm:inline font-medium">Results</span>
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              currentScreen === 'about'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <HelpCircle size={20} />
            <span className="hidden sm:inline font-medium">About</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;