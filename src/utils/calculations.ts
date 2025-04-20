import { CSSUnit, ViewportSettings, ClampValues, BreakpointValue } from '../types';

// Convert any CSS unit to px at a given viewport width
export const convertToPx = (value: string, viewportWidth: number): number => {
  if (!value) return 0;
  
  const numericValue = parseFloat(value);
  
  if (isNaN(numericValue)) return 0;
  
  if (value.endsWith('px')) {
    return numericValue;
  } else if (value.endsWith('rem')) {
    return numericValue * 16; // Assuming 1rem = 16px
  } else if (value.endsWith('em')) {
    return numericValue * 16; // Simplified, in reality would depend on parent
  } else if (value.endsWith('%')) {
    return (numericValue / 100) * viewportWidth;
  } else if (value.endsWith('vw')) {
    return (numericValue / 100) * viewportWidth;
  } else if (value.endsWith('vh')) {
    // For simplicity, treating vh as vw in this context
    return (numericValue / 100) * viewportWidth;
  }
  
  return numericValue; // If no unit, assume px
};

// Parse a value with unit to extract numeric value and unit
export const parseValueWithUnit = (value: string): { value: number; unit: CSSUnit | '' } => {
  const match = value.match(/^([-+]?[0-9]*\.?[0-9]+)([a-z%]*)$/);
  
  if (!match) {
    return { value: 0, unit: '' };
  }
  
  return {
    value: parseFloat(match[1]),
    unit: match[2] as CSSUnit
  };
};

// Calculate the slope for the preferred value
export const calculateSlope = (
  minViewport: number,
  maxViewport: number,
  minSize: number,
  maxSize: number
): number => {
  return (maxSize - minSize) / (maxViewport - minViewport);
};

// Generate the clamp() expression
export const generateClampExpression = (
  viewportSettings: ViewportSettings,
  clampValues: ClampValues
): string => {
  // Parse min and max values to extract numbers and units
  const minParsed = parseValueWithUnit(clampValues.minValue);
  const maxParsed = parseValueWithUnit(clampValues.maxValue);
  
  // Convert viewport values to px if they're in rem
  const minViewportPx = viewportSettings.minUnit === 'rem' 
    ? viewportSettings.minWidth * 16 
    : viewportSettings.minWidth;
    
  const maxViewportPx = viewportSettings.maxUnit === 'rem'
    ? viewportSettings.maxWidth * 16
    : viewportSettings.maxWidth;
    
  // Convert min and max values to px for calculation
  const minValuePx = convertToPx(clampValues.minValue, minViewportPx);
  const maxValuePx = convertToPx(clampValues.maxValue, maxViewportPx);
  
  // Calculate the slope and intercept for the linear equation
  const slope = calculateSlope(minViewportPx, maxViewportPx, minValuePx, maxValuePx);
  const intercept = minValuePx - slope * minViewportPx;
  
  // Format slope to 5 decimal places for readability
  const slopeFormatted = slope.toFixed(5).replace(/\.?0+$/, '');
  
  // Format intercept to 2 decimal places for readability
  const interceptFormatted = intercept.toFixed(2).replace(/\.?0+$/, '');
  
  // Generate preferred value (the fluid scaling part)
  let preferredValue: string;
  
  if (clampValues.preferredValue) {
    // If preferred value is provided directly
    preferredValue = clampValues.preferredValue;
  } else {
    // Calculate the fluid scaling formula
    preferredValue = `calc(${interceptFormatted}px + ${slopeFormatted} * 100vw)`;
  }
  
  // Construct the clamp() expression
  return `clamp(${clampValues.minValue}, ${preferredValue}, ${clampValues.maxValue})`;
};

// Calculate values at specific breakpoints
export const calculateBreakpointValues = (
  clampExpression: string,
  breakpoints: number[] = [320, 480, 768, 1024, 1440]
): BreakpointValue[] => {
  // Extract the min, preferred, and max values from the clamp expression
  const clampMatch = clampExpression.match(/clamp\(([^,]+),\s*([^,]+),\s*([^)]+)\)/);
  
  if (!clampMatch) {
    return breakpoints.map(bp => ({ viewport: bp, computedValue: 'Error' }));
  }
  
  const minValue = clampMatch[1].trim();
  const preferredValue = clampMatch[2].trim();
  const maxValue = clampMatch[3].trim();
  
  // Calculate the value at each breakpoint
  return breakpoints.map(viewport => {
    // Convert min and max to px at this viewport
    const minValuePx = convertToPx(minValue, viewport);
    const maxValuePx = convertToPx(maxValue, viewport);
    
    // Calculate the preferred value at this viewport
    let preferredValuePx: number;
    
    if (preferredValue.includes('calc')) {
      // Extract the intercept and slope from the calc() expression
      const calcMatch = preferredValue.match(/calc\(([^+]+)\s*\+\s*([^*]+)\s*\*\s*100vw\)/);
      
      if (calcMatch) {
        const intercept = parseFloat(calcMatch[1]);
        const slope = parseFloat(calcMatch[2]);
        preferredValuePx = intercept + slope * viewport;
      } else {
        preferredValuePx = 0; // Fallback
      }
    } else {
      preferredValuePx = convertToPx(preferredValue, viewport);
    }
    
    // Apply clamp logic: value is between min and max
    const clampedValue = Math.max(minValuePx, Math.min(preferredValuePx, maxValuePx));
    
    // Format the result
    return {
      viewport,
      computedValue: `${clampedValue.toFixed(2)}px`
    };
  });
};

// Check if font size is within accessible range
export const checkFontSizeAccessibility = (
  breakpointValues: BreakpointValue[]
): { tooSmall: boolean; tooLarge: boolean } => {
  const minAccessibleSize = 16; // 1rem = 16px
  const maxAccessibleSize = 80; // 5rem = 80px
  
  const hasSmallFonts = breakpointValues.some(bp => {
    const size = parseFloat(bp.computedValue);
    return !isNaN(size) && size < minAccessibleSize;
  });
  
  const hasLargeFonts = breakpointValues.some(bp => {
    const size = parseFloat(bp.computedValue);
    return !isNaN(size) && size > maxAccessibleSize;
  });
  
  return {
    tooSmall: hasSmallFonts,
    tooLarge: hasLargeFonts
  };
};

// Generate the full CSS snippet
export const generateCSSSnippet = (
  property: string,
  clampExpression: string,
  selector = '.element'
): string => {
  return `${selector} {
  ${property}: ${clampExpression};
}`;
};