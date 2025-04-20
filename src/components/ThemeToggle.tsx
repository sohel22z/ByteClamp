import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {

  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="py-1 px-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-blue-600" />
      )}
    </button>
  );
};

export default ThemeToggle;