import React, { useState, useEffect } from 'react';
import { CSSProperty } from '../types';
import CopyButton from './CopyButton';
import { AlertTriangle } from 'lucide-react';

interface PreviewSectionProps {
  clampExpression: string;
  cssProperty: string;
  fullCSS: string;
  hasSmallFontWarning: boolean;
  hasLargeFontWarning: boolean;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  clampExpression,
  cssProperty,
  fullCSS,
  hasSmallFontWarning,
  hasLargeFontWarning
}) => {
  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});
  const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);
  
  // Update preview style when clamp expression changes
  useEffect(() => {
    if (clampExpression) {
      // Convert CSS property string to camelCase for React style object
      const property = cssProperty.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) as keyof React.CSSProperties;
      setPreviewStyle({
        ...previewStyle,
        [property]: clampExpression
      });
    }
  }, [clampExpression, cssProperty]);
  
  // Update current viewport width
  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const isFontRelated = cssProperty === 'font-size' || cssProperty === 'line-height';

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Preview
        </h2>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Current Viewport: {currentWidth}px
          </span>
          
          <CopyButton 
            textToCopy={clampExpression} 
            label="Copy clamp()" 
          />
          
          <CopyButton 
            textToCopy={fullCSS} 
            label="Copy CSS" 
            className="hidden sm:flex"
          />
        </div>
      </div>
      
      {(hasSmallFontWarning || hasLargeFontWarning) && cssProperty === 'font-size' && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                Accessibility Warning
              </p>
              <ul className="list-disc ml-5 mt-1 text-sm text-amber-700 dark:text-amber-300">
                {hasSmallFontWarning && (
                  <li>Font size may be too small (&lt; 16px) at some viewports, which can affect readability.</li>
                )}
                {hasLargeFontWarning && (
                  <li>Font size may be too large (&gt; 80px) at some viewports, which can affect layout.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 flex items-center justify-center overflow-hidden transition-all duration-300 min-h-[140px]">
        <div 
          className={`transition-all duration-300 ${isFontRelated ? 'max-w-full' : ''}`}
          style={previewStyle}
        >
          <p className={`${isFontRelated ? '' : 'text-base'} text-gray-900 dark:text-white`}>
            {isFontRelated ? 'Preview Text with clamp()' : 'Element with clamp() styling'}
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-3 overflow-x-auto">
          <code className="text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap break-all">
            {cssProperty}: {clampExpression};
          </code>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;