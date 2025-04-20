// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

// Check if the viewport unit is valid
export const isValidViewport = (value: string): boolean => {
  const number = parseFloat(value);
  return !isNaN(number) && number > 0;
};

// Check if a CSS value with unit is valid
export const isValidCSSValue = (value: string): boolean => {
  if (!value.trim()) return false;
  
  // Match patterns like "1px", "1.5rem", "100%", etc.
  const regex = /^[-+]?[0-9]*\.?[0-9]+([a-z%]*)$/;
  return regex.test(value);
};

// Format number with optional decimal places
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals).replace(/\.?0+$/, '');
};

// Get a human-readable string for a breakpoint
export const getBreakpointName = (width: number): string => {
  if (width <= 320) return 'Mobile S';
  if (width <= 480) return 'Mobile L';
  if (width <= 768) return 'Tablet';
  if (width <= 1024) return 'Laptop';
  if (width <= 1440) return 'Desktop';
  return 'Large Screen';
};

// Get viewport width in pixels from a value and unit
export const getViewportWidth = (value: number, unit: 'px' | 'rem'): number => {
  if (unit === 'rem') {
    return value * 16; // Assuming 1rem = 16px
  }
  return value;
};

// Generate descriptive text for the clamp function
export const getClampDescription = (
  property: string,
  minValue: string,
  maxValue: string,
  minViewport: number,
  maxViewport: number
): string => {
  return `This ${property} scales from ${minValue} at ${minViewport}px viewport to ${maxValue} at ${maxViewport}px viewport.`;
};

// Format CSS properties to display format
export const formatCSSProperty = (property: string): string => {
  return property
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};