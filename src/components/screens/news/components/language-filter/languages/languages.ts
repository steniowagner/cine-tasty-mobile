import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

import {FlagsIcons} from '@components';

export type Language = {
  id: SchemaTypes.ArticleLanguage;
  name: Types.NewsFilterLanguage;
  flag: FlagsIcons;
};

export const languages: Language[] = [
  {
    flag: 'uk',
    name: 'english',
    id: SchemaTypes.ArticleLanguage.EN,
  },
  {
    flag: 'saudi-arabia',
    name: 'arabic',
    id: SchemaTypes.ArticleLanguage.AR,
  },
  {
    flag: 'china',
    name: 'mandarim',
    id: SchemaTypes.ArticleLanguage.ZH,
  },
  {
    flag: 'nederlands',
    name: 'dutch',
    id: SchemaTypes.ArticleLanguage.NL,
  },
  {
    flag: 'france',
    name: 'french',
    id: SchemaTypes.ArticleLanguage.FR,
  },
  {
    flag: 'germany',
    name: 'german',
    id: SchemaTypes.ArticleLanguage.DE,
  },
  {
    flag: 'israel',
    name: 'hebrew',
    id: SchemaTypes.ArticleLanguage.HE,
  },
  {
    flag: 'italy',
    name: 'italian',
    id: SchemaTypes.ArticleLanguage.IT,
  },
  {
    flag: 'norway',
    name: 'norwegian',
    id: SchemaTypes.ArticleLanguage.NO,
  },
  {
    flag: 'brazil',
    name: 'portuguese',
    id: SchemaTypes.ArticleLanguage.PT,
  },
  {
    flag: 'russia',
    name: 'russian',
    id: SchemaTypes.ArticleLanguage.RU,
  },
  {
    flag: 'finland',
    name: 'sami',
    id: SchemaTypes.ArticleLanguage.SE,
  },
  {
    flag: 'spain',
    name: 'spanish',
    id: SchemaTypes.ArticleLanguage.ES,
  },
];
