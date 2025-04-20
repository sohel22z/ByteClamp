import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  endAdornment?: React.ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, helperText, className, endAdornment, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200
              ${error 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
              }
              ${className || ''}
              dark:bg-gray-700 dark:text-white`}
            {...props}
          />
          {endAdornment && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {endAdornment}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;