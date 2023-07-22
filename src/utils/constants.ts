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
  LINKS: {
    GITHUB_REPOSITORY: 'https://github.com/steniowagner/cine-tasty-mobile',
    TMDB_LOGO:
      'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg',
    TMBD: 'https://www.themoviedb.org/',
    OPEN_TRIVIA_API: 'https://opentdb.com/',
    NEWS_API: 'https://newsapi.org/',
  },
  THEME: {
    MIN_SUPPORTED_ANDROID_API_VERSION: 29,
    MIN_SUPPORTED_IOS_VERSION: 13,
  },
};

export const CONSTANTS = {VALUES, KEYS};
