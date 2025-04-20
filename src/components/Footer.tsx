import { Github, Linkedin } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
  return (

    <footer className="w-full py-6 px-4 sm:px-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center">

        <div className="flex items-center gap-2">
          <a href="https://in.linkedin.com/in/sohelansarii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            aria-label="GitHub Repository"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://github.com/sohel22z"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            aria-label="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </a>
          <span className="text-sm text-gray-500 dark:text-gray-500">
            Created by <a
              href="https://clamp.vittoretrivi.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sohel Ansari
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;