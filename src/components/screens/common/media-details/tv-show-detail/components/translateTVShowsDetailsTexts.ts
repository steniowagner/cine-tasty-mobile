import {Translations} from '@i18n/tags';

type TranslateFunction = (tag: Translations.Tags) => string;

export const translateTVShowsDetailsTexts = (translate: TranslateFunction) => ({
  tvTag: translate(Translations.Tags.MEDIA_DETAIL_TV_SHOWS_TITLE),
  seeSeasons: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_SEASONS),
  sections: {
    createdBy: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_CREATED_BY),
    cast: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_CAST),
    crew: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_CREW),
    images: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_IMAGES),
    networks: translate(Translations.Tags.MEDIA_DETAIL_SECTIONS_NETWORKS),
    productionCompanies: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES,
    ),
  },
  info: {
    originalTitle: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
    ),
    originalLanguage: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE,
    ),
    numberOfEpisodes: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES,
    ),
    numberOfSeasons: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS,
    ),
    episodeRuntime: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME,
    ),
    originalCountry: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY,
    ),
    firstAirDate: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE,
    ),
    lastAirDate: translate(
      Translations.Tags.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE,
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
