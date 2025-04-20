import React, { useMemo } from 'react';
import InputField from './InputField';
import { ViewportSettings as ViewportSettingsType } from '../types';
import { isValidViewport } from '../utils/helpers';

interface ViewportSettingsProps {
  settings: ViewportSettingsType;
  onChange: (settings: ViewportSettingsType) => void;
}

const ViewportSettings: React.FC<ViewportSettingsProps> = ({ settings, onChange }) => {
  // Calculate the alternate unit values for display
  const alternateValues = useMemo(() => ({
    minPx: settings.minUnit === 'rem' ? settings.minWidth * 16 : settings.minWidth,
    minRem: settings.minUnit === 'px' ? settings.minWidth / 16 : settings.minWidth,
    maxPx: settings.maxUnit === 'rem' ? settings.maxWidth * 16 : settings.maxWidth,
    maxRem: settings.maxUnit === 'px' ? settings.maxWidth / 16 : settings.maxWidth,
  }), [settings.minWidth, settings.maxWidth, settings.minUnit, settings.maxUnit]);

  const handleMinWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      onChange({ ...settings, minWidth: value });
    }
  };

  const handleMaxWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      onChange({ ...settings, maxWidth: value });
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as 'px' | 'rem';
    
    // Convert both min and max values based on the new unit
    const newMinValue = newUnit === 'rem' 
      ? Number((settings.minWidth / 16).toFixed(2))  // px to rem
      : Math.round(settings.minWidth * 16);          // rem to px
    
    const newMaxValue = newUnit === 'rem'
      ? Number((settings.maxWidth / 16).toFixed(2))  // px to rem
      : Math.round(settings.maxWidth * 16);          // rem to px
    
    onChange({ 
      ...settings, 
      minUnit: newUnit,
      maxUnit: newUnit,
      minWidth: newMinValue,
      maxWidth: newMaxValue
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Viewport Settings
        </h2>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Unit
          </label>
          <select
            value={settings.minUnit}
            onChange={handleUnitChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="px">px</option>
            <option value="rem">rem</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <InputField
            label="Min Viewport"
            type="number"
            value={settings.minWidth || ''}
            onChange={handleMinWidthChange}
            placeholder={settings.minUnit === 'px' ? "320" : "20"}
            min="0"
            step={settings.minUnit === 'px' ? "1" : "0.1"}
            error={!isValidViewport(settings.minWidth.toString()) ? "Must be a positive number" : undefined}
            helperText={`${settings.minUnit === 'px' ? `${alternateValues.minRem.toFixed(2)}rem` : `${alternateValues.minPx}px`}`}
          />
        </div>
        
        <div className="space-y-4">
          <InputField
            label="Max Viewport"
            type="number"
            value={settings.maxWidth || ''}
            onChange={handleMaxWidthChange}
            placeholder={settings.maxUnit === 'px' ? "1440" : "90"}
            min="0"
            step={settings.minUnit === 'px' ? "1" : "0.1"}
            error={!isValidViewport(settings.maxWidth.toString()) ? "Must be a positive number" : undefined}
            helperText={`${settings.maxUnit === 'px' ? `${alternateValues.maxRem.toFixed(2)}rem` : `${alternateValues.maxPx}px`}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewportSettings;