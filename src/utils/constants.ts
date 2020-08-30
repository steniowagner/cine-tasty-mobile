const KEYS = {
  FIRST_TIME_RUNNING_APP: 'FIRST_TIME_RUNNING_APP',
  APP_STORAGE_KEY: '@CINE_TASTY',
  APP_THEME: 'APP_THEME',
  LANGUAGE: 'LANGUAGE',
};

const VALUES = {
  IMAGES: {
    BASE_URL: 'https://image.tmdb.org/t/p',
    MEDIA_POSTER_SIZE_CODE: 'w185',
    RECENT_SEARCH_SIZE_CODE: 'w92',
    PROFILE_SIZE_CODE: 'w154',
  },
  FALLBACK_LANGUAGE: 'en',
};

const ERROR_MESSAGES = {
  NETWORK_FAILED_CONNECTION: 'Network error: Network request failed',
};

export default {
  ERROR_MESSAGES,
  VALUES,
  KEYS,
};
