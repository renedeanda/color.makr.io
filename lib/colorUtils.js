// Color conversion and manipulation utilities

/**
 * Convert HEX to RGB
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Convert RGB to HEX
 */
export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Convert RGB to HSL
 */
export const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

/**
 * Convert HSL to RGB
 */
export const hslToRgb = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

/**
 * Convert HEX to HSL
 */
export const hexToHsl = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
};

/**
 * Convert HSL to HEX
 */
export const hslToHex = (h, s, l) => {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
};

/**
 * Convert RGB to HSV
 */
export const rgbToHsv = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
};

/**
 * Convert HSV to RGB
 */
export const hsvToRgb = (h, s, v) => {
  h /= 360;
  s /= 100;
  v /= 100;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r, g, b;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

/**
 * Generate tints (lighter variations)
 */
export const generateTints = (hex, steps = 5) => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];

  const tints = [];
  for (let i = 1; i <= steps; i++) {
    const newL = Math.min(100, hsl.l + (i * (100 - hsl.l) / (steps + 1)));
    tints.push(hslToHex(hsl.h, hsl.s, newL));
  }
  return tints;
};

/**
 * Generate shades (darker variations)
 */
export const generateShades = (hex, steps = 5) => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];

  const shades = [];
  for (let i = 1; i <= steps; i++) {
    const newL = Math.max(0, hsl.l - (i * hsl.l / (steps + 1)));
    shades.push(hslToHex(hsl.h, hsl.s, newL));
  }
  return shades;
};

/**
 * Generate complete shade scale (Tailwind-style)
 */
export const generateShadeScale = (hex) => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];

  const scales = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  return scales.map(scale => {
    let l;
    if (scale <= 500) {
      l = 95 - (scale / 500) * (95 - hsl.l);
    } else {
      l = hsl.l - ((scale - 500) / 500) * hsl.l * 0.9;
    }
    return {
      scale,
      color: hslToHex(hsl.h, hsl.s, Math.max(0, Math.min(100, l)))
    };
  });
};

/**
 * Get complementary color
 */
export const getComplementary = (hex) => {
  const hsl = hexToHsl(hex);
  if (!hsl) return null;
  return hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
};

/**
 * Get analogous colors
 */
export const getAnalogous = (hex, angle = 30) => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];

  return [
    hslToHex((hsl.h + angle + 360) % 360, hsl.s, hsl.l),
    hex,
    hslToHex((hsl.h - angle + 360) % 360, hsl.s, hsl.l)
  ];
};

/**
 * Get triadic colors
 */
export const getTriadic = (hex) => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];

  return [
    hex,
    hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
  ];
};

/**
 * Get tetradic colors
 */
export const getTetradic = (hex) => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];

  return [
    hex,
    hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l)
  ];
};

/**
 * Get split-complementary colors
 */
export const getSplitComplementary = (hex) => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];

  const complementary = (hsl.h + 180) % 360;
  return [
    hex,
    hslToHex((complementary + 30) % 360, hsl.s, hsl.l),
    hslToHex((complementary - 30 + 360) % 360, hsl.s, hsl.l)
  ];
};

/**
 * Get monochromatic colors
 */
export const getMonochromatic = (hex, variations = 5) => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];

  const colors = [hex];
  const step = 15;

  for (let i = 1; i <= Math.floor(variations / 2); i++) {
    const lighterL = Math.min(100, hsl.l + (i * step));
    const darkerL = Math.max(0, hsl.l - (i * step));

    colors.unshift(hslToHex(hsl.h, hsl.s, lighterL));
    colors.push(hslToHex(hsl.h, hsl.s, darkerL));
  }

  return colors;
};

/**
 * Mix two colors
 */
export const mixColors = (hex1, hex2, percentage = 50) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return null;

  const p = percentage / 100;
  const r = Math.round(rgb1.r * (1 - p) + rgb2.r * p);
  const g = Math.round(rgb1.g * (1 - p) + rgb2.g * p);
  const b = Math.round(rgb1.b * (1 - p) + rgb2.b * p);

  return rgbToHex(r, g, b);
};

/**
 * Get random color
 */
export const getRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
};

/**
 * Generate random palette
 */
export const generateRandomPalette = (count = 5) => {
  return Array.from({ length: count }, () => getRandomColor());
};

/**
 * Check if color is light or dark
 */
export const isLight = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;

  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128;
};

/**
 * Get text color (black or white) for background
 */
export const getTextColor = (hex) => {
  return isLight(hex) ? '#000000' : '#ffffff';
};

/**
 * Validate hex color
 */
export const isValidHex = (hex) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};

/**
 * Normalize hex color (3-digit to 6-digit)
 */
export const normalizeHex = (hex) => {
  if (hex.length === 4) {
    return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return hex;
};
