import React from 'react';

interface ModeToggleProps {
  mode: 'formula' | 'single-value';
  onChange: (mode: 'formula' | 'single-value') => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Input Mode:</span>
      <div className="inline-flex h-10 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
        <button
          type="button"
          onClick={() => onChange('formula')}
          className={`relative px-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
        ${mode === 'formula'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
        >
          Formula Mode
        </button>
        <button
          type="button"
          onClick={() => onChange('single-value')}
          className={`relative px-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
        ${mode === 'single-value'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
        >
          Single Value
        </button>
      </div>
    </div>
  );
};

export default ModeToggle;