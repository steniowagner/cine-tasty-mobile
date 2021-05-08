import metrics from '@styles/metrics';

const KEYS = {
  IMAGES_QUALITY: '@CINE_TASTY_IMAGES_QUALITY',
  APP_THEME: '@CINE_TASTY_APP_THEME',
  LANGUAGE: '@CINE_TASTY_LANGUAGE',
  APP_STORAGE_KEY: '@CINE_TASTY',
};

const VALUES = {
  IMAGES: {
    BASE_URL: 'https://image.tmdb.org/t/p',
    THUMBNAIL_SIZE_CODE: 'w45',
  },
  FALLBACK_LANGUAGE: 'en',
  DEFAULT_SPACING: metrics.mediumSize,
  DEFAULT_ANIMATION_DURATION: 400,
  DEFAULT_SEARCH_COLOR: '#4d4d4d',
};

export default {
  VALUES,
  KEYS,
};
