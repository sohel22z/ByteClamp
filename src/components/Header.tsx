import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Linkedin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-3 sm:px-6 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">

        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            ByteClamp
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="https://in.linkedin.com/in/sohelansarii"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 p-2 rounded"
            aria-label="sohel linkedin profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;