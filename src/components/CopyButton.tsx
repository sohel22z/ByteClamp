import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ 
  textToCopy, 
  label = 'Copy',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(textToCopy);
    
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={copied}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${copied
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
        } ${className}`}
      aria-label={copied ? 'Copied' : label}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default CopyButton;