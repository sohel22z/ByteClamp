import React from 'react';
import InputField from './InputField';
import { ClampValues as ClampValuesType, InputMode } from '../types';
import { isValidCSSValue } from '../utils/helpers';

interface ClampValuesProps {
  values: ClampValuesType;
  onChange: (values: ClampValuesType) => void;
  mode: InputMode;
}

const ClampValues: React.FC<ClampValuesProps> = ({ values, onChange, mode }) => {
  const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...values, minValue: e.target.value });
  };

  const handlePreferredValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...values, preferredValue: e.target.value });
  };

  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...values, maxValue: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {mode === 'formula' ? 'Clamp Values' : 'Value at Breakpoints'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label={mode === 'formula' ? "Min Value" : "Value at Min Viewport"}
          type="text"
          value={values.minValue}
          onChange={handleMinValueChange}
          placeholder="16px"
          error={values.minValue && !isValidCSSValue(values.minValue) ? "Invalid CSS value" : undefined}
          helperText="e.g., 1rem, 16px, 2em"
        />
        
        {mode === 'single-value' && (
          <InputField
            label="Value at Mid Viewport"
            type="text"
            value={values.preferredValue}
            onChange={handlePreferredValueChange}
            placeholder="18px"
            error={values.preferredValue && !isValidCSSValue(values.preferredValue) ? "Invalid CSS value" : undefined}
            helperText="Leave empty to calculate"
          />
        )}
        
        <InputField
          label={mode === 'formula' ? "Max Value" : "Value at Max Viewport"}
          type="text"
          value={values.maxValue}
          onChange={handleMaxValueChange}
          placeholder="24px"
          error={values.maxValue && !isValidCSSValue(values.maxValue) ? "Invalid CSS value" : undefined}
          helperText="e.g., 3rem, 48px, 5vw"
        />
      </div>
    </div>
  );
};

export default ClampValues;