import { NewsLanguage } from '@schema-types';
import { NewsFilterLanguage } from '@app-types';

import { FlagsIcons } from '@common-components';

export type Language = {
  name: NewsFilterLanguage;
  id: NewsLanguage;
  flag: FlagsIcons;
};

export const languages: Language[] = [
  {
    flag: 'uk',
    name: 'english',
    id: NewsLanguage.EN,
  },
  {
    flag: 'saudi-arabia',
    name: 'arabic',
    id: NewsLanguage.AR,
  },
  {
    flag: 'china',
    name: 'mandarim',
    id: NewsLanguage.ZH,
  },
  {
    flag: 'nederlands',
    name: 'dutch',
    id: NewsLanguage.NL,
  },
  {
    flag: 'france',
    name: 'french',
    id: NewsLanguage.FR,
  },
  {
    flag: 'germany',
    name: 'german',
    id: NewsLanguage.DE,
  },
  {
    flag: 'israel',
    name: 'hebrew',
    id: NewsLanguage.HE,
  },
  {
    flag: 'italy',
    name: 'italian',
    id: NewsLanguage.IT,
  },
  {
    flag: 'norway',
    name: 'norwegian',
    id: NewsLanguage.NO,
  },
  {
    flag: 'brazil',
    name: 'portuguese',
    id: NewsLanguage.PT,
  },
  {
    flag: 'russia',
    name: 'russian',
    id: NewsLanguage.RU,
  },
  {
    flag: 'finland',
    name: 'finnish',
    id: NewsLanguage.SE,
  },
  {
    flag: 'spain',
    name: 'spanish',
    id: NewsLanguage.ES,
  },
];
