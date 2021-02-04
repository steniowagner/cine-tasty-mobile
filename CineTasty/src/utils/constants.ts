import metrics from 'styles/metrics';

const KEYS = {
  IMAGES_QUALITY: '@CINE_TASTY_IMAGES_QUALITY',
  APP_THEME: '@CINE_TASTY_APP_THEME',
  LANGUAGE: '@CINE_TASTY_LANGUAGE',
  APP_STORAGE_KEY: '@CINE_TASTY',
};

const VALUES = {
  IMAGES: {
    BASE_URL: 'https://image.tmdb.org/t/p',
    LARGE_SIZE_CODE: 'w500',
    MEDIA_POSTER_SIZE_CODE: 'w185',
    RECENT_SEARCH_SIZE_CODE: 'w92',
    PROFILE_SIZE_CODE: 'w154',
    THUMBNAIL_SIZE_CODE: 'w45',
    LARGE_IMAGE_SIZE_CODE: 'w342',
  },
  FALLBACK_LANGUAGE: 'en',
  DEFAULT_SPACING: metrics.mediumSize,
};

export default {
  VALUES,
  KEYS,
};
