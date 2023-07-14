import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';

export const settingsModalOptions = [
  {
    id: 'images-quality',
    route: Routes.Home.SETTINGS_IMAGES_QUALITY,
    titleTag: Translations.Tags.SETTINGS_IMAGES_QUALITY,
    icon: 'image',
  },
  {
    id: 'language',
    route: Routes.Home.SETTINGS_LANGUAGE,
    titleTag: Translations.Tags.SETTINGS_LANGUAGE,
    icon: 'language',
  },
  {
    id: 'theme',
    route: Routes.Home.SETTINGS_THEME,
    titleTag: Translations.Tags.SETTINGS_THEME,
    icon: 'theme',
  },
  {
    id: 'open-source',
    route: Routes.Home.SETTINGS_OPEN_SOURCE,
    titleTag: Translations.Tags.SETTINGS_OPEN_SOURCE,
    icon: 'openSource',
  },
  {
    id: 'about',
    route: Routes.Home.SETTINGS_ABOUT,
    titleTag: Translations.Tags.SETTINGS_ABOUT,
    icon: 'about',
  },
];
