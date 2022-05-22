export namespace Routes {
  export enum InitialScreenChecking {
    INITIAL_SCREEN = 'APP/INITIAL_SCREEN',
  }

  export enum Onboarding {
    ONBOARDING = 'APP/ONBOARDING',
  }

  export enum Tabs {
    TABS = 'APP/TABS',
    HOME = 'APP/TABS/HOME',
    FAMOUS = 'APP/TABS/FAMOUS',
    QUIZ = 'APP/TABS/QUIZ',
    NEWS = 'APP/TABS/NEWS',
  }

  export enum ImagesGallery {
    IMAGES_GALLERY = 'APP/IMAGES_GALLERY',
  }

  export enum CustomModal {
    CUSTOM_MODAL_STACK = 'APP/CUSTOM_MODAL_STACK',
    CUSTOM_MODAL = 'APP/CUSTOM_MODAL',
  }

  export enum Search {
    SEARCH_STACK = 'APP/SEARCH_STACK',
    SEARCH = 'APP/SEARCH_STACK/SEARCH',
  }

  export enum Home {
    HOME = 'APP/HOME',
    MEDIA_DETAILS_VIEW_ALL = 'APP/HOME/MEDIA_DETAILS_VIEW_ALL',
  }

  export enum Settings {
    SETTINGS = 'APP/SETTINGS',
    IMAGES_QUALITY = 'APP/SETTINGS/IMAGES_QUALITY',
    OPEN_SOURCE = 'APP/SETTINGS/OPEN_SOURCE',
    LANGUAGE = 'APP/SETTINGS/LANGUAGE',
    THEME = 'APP/SETTINGS/THEME',
    ABOUT = 'APP/SETTINGS/ABOUT',
  }

  export enum TVShow {
    DETAILS = 'APP/TV_SHOW/DETAILS',
    SEASONS = 'APP/TV_SHOW/SEASONS',
  }

  export enum Movie {
    DETAILS = 'APP/MOVIE/DETAILS',
  }

  export enum MediaDetail {
    REVIEWS = 'APP/MEDIA_DETAILS/REVIEWS',
  }

  export enum Famous {
    FAMOUS = 'APP/FAMOUS',
    DETAILS = 'APP/FAMOUS/DETAILS',
  }

  export enum Quiz {
    QUIZ = 'APP/QUIZ',
    SETUP_QUESTIONS = 'APP/QUIZ/SETUP_QUESTIONS',
    QUESTIONS = 'APP/QUIZ/QUESTIONS',
    RESULTS = 'APP/QUIZ/RESULTS',
  }

  export enum News {
    NEWS = 'APP/NEWS',
  }
}
