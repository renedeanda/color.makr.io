// Color blindness simulation utilities
// Based on http://www.daltonize.org/

import { hexToRgb, rgbToHex } from './colorUtils';

/**
 * Simulate color blindness types
 */
const colorBlindnessMatrices = {
  protanopia: [ // Red-blind
    [0.567, 0.433, 0.000],
    [0.558, 0.442, 0.000],
    [0.000, 0.242, 0.758]
  ],
  protanomaly: [ // Red-weak
    [0.817, 0.183, 0.000],
    [0.333, 0.667, 0.000],
    [0.000, 0.125, 0.875]
  ],
  deuteranopia: [ // Green-blind
    [0.625, 0.375, 0.000],
    [0.700, 0.300, 0.000],
    [0.000, 0.300, 0.700]
  ],
  deuteranomaly: [ // Green-weak
    [0.800, 0.200, 0.000],
    [0.258, 0.742, 0.000],
    [0.000, 0.142, 0.858]
  ],
  tritanopia: [ // Blue-blind
    [0.950, 0.050, 0.000],
    [0.000, 0.433, 0.567],
    [0.000, 0.475, 0.525]
  ],
  tritanomaly: [ // Blue-weak
    [0.967, 0.033, 0.000],
    [0.000, 0.733, 0.267],
    [0.000, 0.183, 0.817]
  ],
  achromatopsia: [ // Complete color blindness
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114]
  ],
  achromatomaly: [ // Incomplete color blindness
    [0.618, 0.320, 0.062],
    [0.163, 0.775, 0.062],
    [0.163, 0.320, 0.516]
  ]
};

/**
 * Apply color blindness matrix to RGB color
 */
const applyMatrix = (rgb, matrix) => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const newR = Math.min(255, Math.max(0, Math.round((r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2]) * 255)));
  const newG = Math.min(255, Math.max(0, Math.round((r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2]) * 255)));
  const newB = Math.min(255, Math.max(0, Math.round((r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2]) * 255)));

  return { r: newR, g: newG, b: newB };
};

/**
 * Simulate color blindness for a hex color
 */
export const simulateColorBlindness = (hex, type) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const matrix = colorBlindnessMatrices[type];
  if (!matrix) return hex;

  const newRgb = applyMatrix(rgb, matrix);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
};

/**
 * Simulate color blindness for an array of colors
 */
export const simulatePalette = (colors, type) => {
  return colors.map(color => simulateColorBlindness(color, type));
};

/**
 * Get all color blindness types with descriptions
 */
export const colorBlindnessTypes = [
  {
    id: 'normal',
    name: 'Normal Vision',
    description: 'No color blindness',
    prevalence: '~96% of population'
  },
  {
    id: 'protanopia',
    name: 'Protanopia',
    description: 'Red-blind (no red cones)',
    prevalence: '~1% of males'
  },
  {
    id: 'protanomaly',
    name: 'Protanomaly',
    description: 'Red-weak (anomalous red cones)',
    prevalence: '~1% of males'
  },
  {
    id: 'deuteranopia',
    name: 'Deuteranopia',
    description: 'Green-blind (no green cones)',
    prevalence: '~1% of males'
  },
  {
    id: 'deuteranomaly',
    name: 'Deuteranomaly',
    description: 'Green-weak (most common)',
    prevalence: '~5% of males, 0.4% of females'
  },
  {
    id: 'tritanopia',
    name: 'Tritanopia',
    description: 'Blue-blind (no blue cones)',
    prevalence: '~0.001% of population'
  },
  {
    id: 'tritanomaly',
    name: 'Tritanomaly',
    description: 'Blue-weak',
    prevalence: '~0.01% of population'
  },
  {
    id: 'achromatopsia',
    name: 'Achromatopsia',
    description: 'Complete color blindness (monochromacy)',
    prevalence: '~0.003% of population'
  },
  {
    id: 'achromatomaly',
    name: 'Achromatomaly',
    description: 'Incomplete color blindness',
    prevalence: 'Very rare'
  }
];

/**
 * Check if colors are distinguishable for color blind users
 */
export const areColorsDistinguishable = (color1, color2, type, threshold = 30) => {
  const sim1 = simulateColorBlindness(color1, type);
  const sim2 = simulateColorBlindness(color2, type);

  const rgb1 = hexToRgb(sim1);
  const rgb2 = hexToRgb(sim2);

  if (!rgb1 || !rgb2) return false;

  // Calculate color distance
  const distance = Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );

  return distance > threshold;
};
