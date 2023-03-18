import {Translations} from '@i18n/tags';

type TranslateFunction = (tag: Translations.Tags) => string;

export const translateMoviesDetailsTexts = (translate: TranslateFunction) => ({
  movieTag: translate(Translations.Tags.MEDIA_DETAIL_MOVIE_TITLE),
  sections: {
    cast: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_CAST),
    crew: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_CREW),
    images: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_IMAGES),
    videos: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_VIDEOS),
    productionCompanies: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES,
    ),
  },
  info: {
    originalTitle: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
    ),
    releaseDate: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_RELEASE_DATE,
    ),
    budget: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_BUDGET),
    revenue: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_REVENUE),
    productionCountries: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COUNTRIES,
    ),
    spokenLanguages: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_SPOKEN_LANGUAGES,
    ),
  },
  languageAlert: {
    description: translate(
      Translations.Tags.LANGUAGE_WARNING_MEDIA_DESCRIPTION,
    ),
    positiveActionTitle: translate(
      Translations.Tags.LANGUAGE_WARNING_MEDIA_POSITIVE_ACTION,
    ),
    title: translate(Translations.Tags.LANGUAGE_WARNING_MEDIA_TITLE),
  },
});
