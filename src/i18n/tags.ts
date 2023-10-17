export namespace Translations {
  export enum Tabs {
    TABS = 'translations:tabs',
    TABS_HOME = 'translations:tabs:home',
    TABS_QUIZ = 'translations:tabs:quiz',
    TABS_NEWS = 'translations:tabs:news',
    TABS_FAMOUS = 'translations:tabs:famous',
  }

  export enum News {
    FILTER_LANGUAGES_CTA_TITLE = 'translations:news:filterLanguagesModal:ctaTitle',
    FILTER_LANGUAGES_TITLE = 'translations:news:filterLanguagesModal:title',
    LANGUAGES = 'translations:news:languages',
  }

  export type Tags = Tabs | News;
}
