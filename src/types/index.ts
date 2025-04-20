export type CSSUnit = 'px' | 'rem' | 'em' | '%' | 'vw' | 'vh';

export type CSSProperty = 
  | 'font-size'
  | 'line-height'
  | 'margin'
  | 'margin-top'
  | 'margin-right'
  | 'margin-bottom'
  | 'margin-left'
  | 'padding'
  | 'padding-top'
  | 'padding-right'
  | 'padding-bottom'
  | 'padding-left'
  | 'width'
  | 'height'
  | 'gap'
  | 'border-radius'
  | 'custom';

export type InputMode = 'formula' | 'single-value';

export interface ViewportSettings {
  minWidth: number;
  minUnit: 'px' | 'rem';
  maxWidth: number;
  maxUnit: 'px' | 'rem';
}

export interface ClampValues {
  minValue: string;
  preferredValue: string;
  maxValue: string;
}

export interface BreakpointValue {
  viewport: number;
  computedValue: string;
}

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}