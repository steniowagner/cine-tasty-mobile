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
    PAGINATION_QUERY_ERROR = 'translations:news:errors:pagination',
    ENTRY_QUERY_ERROR = 'translations:news:errors:entry',
  }

  export enum Time {
    TIME_YEAR_PLURAL = 'translations:time:year_plural',
    TIME_YEAR = 'translations:time:year',
    TIME_MONTH_PLURAL = 'translations:time:month_plural',
    TIME_MONTH = 'translations:time:month',
    TIME_DAY_PLURAL = 'translations:time:day_plural',
    TIME_DAY = 'translations:time:day',
    TIME_HOUR_PLURAL = 'translations:time:hour_plural',
    TIME_HOUR = 'translations:time:hour',
    TIME_MINUTE_PLURAL = 'translations:time:minute:plural',
    TIME_MINUTE = 'translations:time:minute',
    TIME_SECOND_PLURAL = 'translations:time:second_plural',
    TIME_SECOND = 'translations:time:second',
  }

  export type Tags = Tabs | News | Time;
}
