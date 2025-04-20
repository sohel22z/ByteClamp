import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { CSSProperty } from '../types';
import { formatCSSProperty } from '../utils/helpers';

interface PropertySelectorProps {
  value: CSSProperty;
  onChange: (value: CSSProperty) => void;
  customProperty?: string;
  onCustomPropertyChange?: (value: string) => void;
}

const commonProperties: CSSProperty[] = [
  'font-size',
  'line-height',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'width',
  'height',
  'gap',
  'border-radius',
  'custom'
];

const PropertySelector: React.FC<PropertySelectorProps> = ({
  value,
  onChange,
  customProperty = '',
  onCustomPropertyChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (property: CSSProperty) => {
    onChange(property);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        CSS Property
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="w-full px-3 py-2 text-left border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex justify-between items-center">
            <span>{formatCSSProperty(value === 'custom' ? customProperty || 'Custom' : value)}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
            <ul className="py-1" role="listbox">
              {commonProperties.map((property) => (
                <li
                  key={property}
                  role="option"
                  aria-selected={value === property}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${
                    value === property ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                  }`}
                  onClick={() => handleSelect(property)}
                >
                  {formatCSSProperty(property)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {value === 'custom' && (
        <div className="mt-2">
          <input
            type="text"
            value={customProperty}
            onChange={(e) => onCustomPropertyChange?.(e.target.value)}
            placeholder="Enter custom property (e.g., max-width)"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 dark:text-white"
          />
        </div>
      )}
    </div>
  );
};

export default PropertySelector;