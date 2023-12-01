export namespace Routes {
  export enum Tabs {
    TABS = 'APP/TABS',
    HOME = 'APP/TABS/HOME',
    FAMOUS = 'APP/TABS/FAMOUS',
    QUIZ = 'APP/TABS/QUIZ',
    NEWS = 'APP/TABS/NEWS',
  }

  export enum Home {
    HOME = 'APP/HOME',
    MEDIA_DETAILS_VIEW_ALL = 'APP/HOME/MEDIA_DETAILS_VIEW_ALL',
    IMAGES_GALLERY = 'APP/HOME/IMAGES_GALLERY',
    TV_SHOW_DETAILS = 'APP/HOME/TV_SHOW_DETAILS',
    TV_SHOW_SEASON = 'APP/HOME/TV_SHOW/SEASON',
    MOVIE_DETAILS = 'APP/HOME/MOVIE/DETAILS',
    FAMOUS_DETAILS = 'APP/HOME/FAMOUS/DETAILS',
    MEDIA_REVIEWS = 'APP/HOME/MEDIA_REVIEWS',
    SEARCH_MOVIE = 'APP/HOME/SEARCH_MOVIE',
    SEARCH_TV_SHOW = 'APP/HOME/SEARCH_TV_SHOW',
    SETTINGS_IMAGES_QUALITY = 'APP/HOME/SETTINGS/IMAGES_QUALITY',
    SETTINGS_OPEN_SOURCE = 'APP/HOME/SETTINGS/OPEN_SOURCE',
    SETTINGS_LANGUAGE = 'APP/HOME/SETTINGS/LANGUAGE',
    SETTINGS_THEME = 'APP/HOME/SETTINGS/THEME',
    SETTINGS_ABOUT = 'APP/HOME/SETTINGS/ABOUT',
  }

  export enum Famous {
    TRENDING_FAMOUS = 'APP/FAMOUS/TRENDING_FAMOUS',
    DETAILS = 'APP/FAMOUS/DETAILS',
    IMAGES_GALLERY = 'APP/FAMOUS/IMAGES_GALLERY',
    TV_SHOW_DETAILS = 'APP/FAMOUS/TV_SHOW/DETAILS',
    TV_SHOW_SEASON = 'APP/FAMOUS/TV_SHOW/SEASON',
    MOVIE_DETAILS = 'APP/FAMOUS/MOVIE/DETAILS',
    MEDIA_REVIEWS = 'APP/FAMOUS/MEDIA_REVIEWS',
    SEARCH_FAMOUS = 'APP/FAMOUS/SEARCH',
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
