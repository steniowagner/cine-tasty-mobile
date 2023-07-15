import metrics from '@styles/metrics';

const KEYS = {
  ONBOARDING_SHOWED: '@CINE_TASTY_ONBOARDING_SHOWED',
  IMAGES_QUALITY: '@CINE_TASTY_IMAGES_QUALITY',
  APP_THEME: '@CINE_TASTY_APP_THEME',
  LANGUAGE: '@CINE_TASTY_LANGUAGE',
  APP_STORAGE_KEY: '@CINE_TASTY',
};

const VALUES = {
  IMAGES: {
    BASE_URL: 'https://image.tmdb.org/t/p',
    THUMBNAIL_SIZE_CODE: 'w45',
    PROFILE:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/user-profile/user-profile.jpg',
  },
  FALLBACK_LANGUAGE: 'en',
  DEFAULT_SPACING: metrics.mediumSize,
  DEFAULT_ANIMATION_DURATION: 400,
  DEFAULT_SEARCH_COLOR: '#4d4d4d',
  DEFAULT_SHADOW: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export const CONSTANTS = {VALUES, KEYS};
