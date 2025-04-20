import React, { useState, useEffect, useMemo } from 'react';
import ViewportSettings from './ViewportSettings';
import ClampValues from './ClampValues';
import PropertySelector from './PropertySelector';
import ModeToggle from './ModeToggle';
import PreviewSection from './PreviewSection';

import {
  ViewportSettings as ViewportSettingsType,
  ClampValues as ClampValuesType,
  CSSProperty,
  InputMode
} from '../types';

import {
  generateClampExpression,
  calculateBreakpointValues,
  checkFontSizeAccessibility,
  generateCSSSnippet
} from '../utils/calculations';

const ClampCalculator: React.FC = () => {
  // State for viewport settings
  const [viewportSettings, setViewportSettings] = useState<ViewportSettingsType>({
    minWidth: 320,
    minUnit: 'px',
    maxWidth: 1440,
    maxUnit: 'px'
  });

  // State for clamp values
  const [clampValues, setClampValues] = useState<ClampValuesType>({
    minValue: '16px',
    preferredValue: '',
    maxValue: '24px'
  });

  // State for CSS property
  const [cssProperty, setCssProperty] = useState<CSSProperty>('font-size');
  const [customProperty, setCustomProperty] = useState<string>('');

  // State for input mode
  const [inputMode, setInputMode] = useState<InputMode>('formula');

  // Generate clamp expression
  const clampExpression = useMemo(() => {
    if (!clampValues.minValue || !clampValues.maxValue) {
      return '';
    }

    return generateClampExpression(viewportSettings, clampValues);
  }, [viewportSettings, clampValues]);

  // Calculate breakpoint values
  const breakpointValues = useMemo(() => {
    if (!clampExpression) {
      return [];
    }

    return calculateBreakpointValues(clampExpression);
  }, [clampExpression]);

  // Check for accessibility warnings for font size
  const { tooSmall, tooLarge } = useMemo(() => {
    if (cssProperty !== 'font-size' || !breakpointValues.length) {
      return { tooSmall: false, tooLarge: false };
    }

    return checkFontSizeAccessibility(breakpointValues);
  }, [cssProperty, breakpointValues]);

  // Generate full CSS snippet
  const fullCSSSnippet = useMemo(() => {
    if (!clampExpression) {
      return '';
    }

    const property = cssProperty === 'custom' ? customProperty : cssProperty;
    return generateCSSSnippet(property, clampExpression);
  }, [clampExpression, cssProperty, customProperty]);

  // Update preferred value in single-value mode
  useEffect(() => {
    if (inputMode === 'single-value' && !clampValues.preferredValue) {
      // Calculate a reasonable default for preferred value
      const minVal = parseFloat(clampValues.minValue) || 0;
      const maxVal = parseFloat(clampValues.maxValue) || 0;

      if (minVal && maxVal) {
        const preferredVal = (minVal + maxVal) / 2;
        const unit = clampValues.minValue.replace(/[\d.-]/g, '') || 'px';
        setClampValues({
          ...clampValues,
          preferredValue: `${preferredVal}${unit}`
        });
      }
    }
  }, [inputMode, clampValues]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-2">
            <ViewportSettings
              settings={viewportSettings}
              onChange={setViewportSettings}
            />
          </div>

          <div>
            <PropertySelector
              value={cssProperty}
              onChange={setCssProperty}
              customProperty={customProperty}
              onCustomPropertyChange={setCustomProperty}
            />

            <div className="mt-6">
              <ModeToggle
                mode={inputMode}
                onChange={setInputMode}
              />
            </div>
          </div>
        </div>

        <ClampValues
          values={clampValues}
          onChange={setClampValues}
          mode={inputMode}
        />

        {clampExpression && (
          <>
            <PreviewSection
              clampExpression={clampExpression}
              cssProperty={cssProperty === 'custom' ? customProperty : cssProperty}
              fullCSS={fullCSSSnippet}
              hasSmallFontWarning={tooSmall}
              hasLargeFontWarning={tooLarge}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ClampCalculator;