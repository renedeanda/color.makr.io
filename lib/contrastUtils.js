// Contrast and accessibility utilities based on WCAG 2.1

import { hexToRgb } from './colorUtils';

/**
 * Calculate relative luminance
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
export const getRelativeLuminance = (r, g, b) => {
  const [rs, gs, bs] = [r, g, b].map(val => {
    val /= 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
export const getContrastRatio = (color1, color2) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if contrast meets WCAG standards
 * @param {number} ratio - Contrast ratio
 * @param {string} level - 'AA' or 'AAA'
 * @param {string} size - 'normal' or 'large'
 */
export const meetsWCAG = (ratio, level = 'AA', size = 'normal') => {
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  }
  // AA
  return size === 'large' ? ratio >= 3 : ratio >= 4.5;
};

/**
 * Get WCAG rating for a contrast ratio
 */
export const getWCAGRating = (ratio) => {
  const ratings = [];

  if (ratio >= 7) {
    ratings.push({ level: 'AAA', size: 'normal', passes: true });
    ratings.push({ level: 'AAA', size: 'large', passes: true });
  } else if (ratio >= 4.5) {
    ratings.push({ level: 'AAA', size: 'normal', passes: false });
    ratings.push({ level: 'AAA', size: 'large', passes: true });
  } else {
    ratings.push({ level: 'AAA', size: 'normal', passes: false });
    ratings.push({ level: 'AAA', size: 'large', passes: false });
  }

  if (ratio >= 4.5) {
    ratings.push({ level: 'AA', size: 'normal', passes: true });
    ratings.push({ level: 'AA', size: 'large', passes: true });
  } else if (ratio >= 3) {
    ratings.push({ level: 'AA', size: 'normal', passes: false });
    ratings.push({ level: 'AA', size: 'large', passes: true });
  } else {
    ratings.push({ level: 'AA', size: 'normal', passes: false });
    ratings.push({ level: 'AA', size: 'large', passes: false });
  }

  return ratings;
};

/**
 * Suggest an accessible color by adjusting lightness
 */
export const suggestAccessibleColor = (bgColor, fgColor, targetRatio = 4.5) => {
  const bgRgb = hexToRgb(bgColor);
  const fgRgb = hexToRgb(fgColor);

  if (!bgRgb || !fgRgb) return fgColor;

  const bgLum = getRelativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

  // Try making foreground lighter or darker
  let bestColor = fgColor;
  let bestRatio = getContrastRatio(bgColor, fgColor);

  for (let l = 0; l <= 100; l += 5) {
    const testColor = `rgb(${Math.round(fgRgb.r * l / 100)}, ${Math.round(fgRgb.g * l / 100)}, ${Math.round(fgRgb.b * l / 100)})`;
    const ratio = getContrastRatio(bgColor, testColor);

    if (ratio >= targetRatio && ratio > bestRatio) {
      bestRatio = ratio;
      bestColor = testColor;
    }
  }

  return bestColor;
};

/**
 * Get contrast score (0-100)
 */
export const getContrastScore = (ratio) => {
  // Max ratio is 21:1
  return Math.min(100, Math.round((ratio / 21) * 100));
};

/**
 * Check if color combination is readable
 */
export const isReadable = (bgColor, fgColor, minRatio = 4.5) => {
  const ratio = getContrastRatio(bgColor, fgColor);
  return ratio >= minRatio;
};

/**
 * Get description for contrast ratio
 */
export const getContrastDescription = (ratio) => {
  if (ratio >= 12) return 'Excellent';
  if (ratio >= 7) return 'Very Good';
  if (ratio >= 4.5) return 'Good';
  if (ratio >= 3) return 'Fair';
  return 'Poor';
};
