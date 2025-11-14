// LocalStorage wrapper utilities

const STORAGE_KEYS = {
  SAVED_COLORS: 'color_makr_saved_colors',
  COLOR_HISTORY: 'color_makr_history',
  SAVED_PALETTES: 'color_makr_palettes',
  RECENT_GRADIENTS: 'color_makr_gradients',
  USER_PREFERENCES: 'color_makr_preferences'
};

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Get item from localStorage
 */
export const getItem = (key, defaultValue = null) => {
  if (!isStorageAvailable()) return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Set item in localStorage
 */
export const setItem = (key, value) => {
  if (!isStorageAvailable()) return false;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    return false;
  }
};

/**
 * Remove item from localStorage
 */
export const removeItem = (key) => {
  if (!isStorageAvailable()) return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

/**
 * Clear all localStorage
 */
export const clearAll = () => {
  if (!isStorageAvailable()) return false;

  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Specific storage functions

/**
 * Save a color to favorites
 */
export const saveColor = (color) => {
  const saved = getItem(STORAGE_KEYS.SAVED_COLORS, []);
  if (!saved.includes(color)) {
    saved.unshift(color);
    setItem(STORAGE_KEYS.SAVED_COLORS, saved.slice(0, 50)); // Keep max 50
  }
};

/**
 * Get saved colors
 */
export const getSavedColors = () => {
  return getItem(STORAGE_KEYS.SAVED_COLORS, []);
};

/**
 * Remove saved color
 */
export const removeSavedColor = (color) => {
  const saved = getItem(STORAGE_KEYS.SAVED_COLORS, []);
  const filtered = saved.filter(c => c !== color);
  setItem(STORAGE_KEYS.SAVED_COLORS, filtered);
};

/**
 * Add color to history
 */
export const addToHistory = (color) => {
  const history = getItem(STORAGE_KEYS.COLOR_HISTORY, []);
  const filtered = history.filter(c => c !== color);
  filtered.unshift(color);
  setItem(STORAGE_KEYS.COLOR_HISTORY, filtered.slice(0, 20)); // Keep last 20
};

/**
 * Get color history
 */
export const getColorHistory = () => {
  return getItem(STORAGE_KEYS.COLOR_HISTORY, []);
};

/**
 * Save a palette
 */
export const savePalette = (palette, name = 'Unnamed Palette') => {
  const palettes = getItem(STORAGE_KEYS.SAVED_PALETTES, []);
  const newPalette = {
    id: Date.now(),
    name,
    colors: palette,
    createdAt: new Date().toISOString()
  };
  palettes.unshift(newPalette);
  setItem(STORAGE_KEYS.SAVED_PALETTES, palettes.slice(0, 50)); // Keep max 50
  return newPalette;
};

/**
 * Get saved palettes
 */
export const getSavedPalettes = () => {
  return getItem(STORAGE_KEYS.SAVED_PALETTES, []);
};

/**
 * Delete a palette
 */
export const deletePalette = (id) => {
  const palettes = getItem(STORAGE_KEYS.SAVED_PALETTES, []);
  const filtered = palettes.filter(p => p.id !== id);
  setItem(STORAGE_KEYS.SAVED_PALETTES, filtered);
};

/**
 * Save gradient
 */
export const saveGradient = (gradient) => {
  const gradients = getItem(STORAGE_KEYS.RECENT_GRADIENTS, []);
  gradients.unshift(gradient);
  setItem(STORAGE_KEYS.RECENT_GRADIENTS, gradients.slice(0, 20));
};

/**
 * Get recent gradients
 */
export const getRecentGradients = () => {
  return getItem(STORAGE_KEYS.RECENT_GRADIENTS, []);
};

/**
 * Save user preferences
 */
export const savePreferences = (preferences) => {
  const current = getItem(STORAGE_KEYS.USER_PREFERENCES, {});
  setItem(STORAGE_KEYS.USER_PREFERENCES, { ...current, ...preferences });
};

/**
 * Get user preferences
 */
export const getPreferences = () => {
  return getItem(STORAGE_KEYS.USER_PREFERENCES, {
    theme: 'system',
    defaultFormat: 'hex',
    autoSaveHistory: true
  });
};
