import { ArticleLanguage } from 'types/schema';
import { NewsFilterLanguage } from 'types';

import { SupportedIcons } from 'components/common/svg-icon/getXML';

type Language = {
  name: NewsFilterLanguage;
  flag: SupportedIcons;
  id: ArticleLanguage;
};

const langauges: Language[] = [
  {
    flag: 'uk',
    name: 'english',
    id: ArticleLanguage.EN,
  },
  {
    flag: 'saudi-arabia',
    name: 'arabic',
    id: ArticleLanguage.AR,
  },
  {
    flag: 'china',
    name: 'mandarim',
    id: ArticleLanguage.ZH,
  },
  {
    flag: 'nederlands',
    name: 'dutch',
    id: ArticleLanguage.NL,
  },
  {
    flag: 'france',
    name: 'french',
    id: ArticleLanguage.FR,
  },
  {
    flag: 'germany',
    name: 'german',
    id: ArticleLanguage.DE,
  },
  {
    flag: 'israel',
    name: 'hebrew',
    id: ArticleLanguage.HE,
  },
  {
    flag: 'italy',
    name: 'italian',
    id: ArticleLanguage.IT,
  },
  {
    flag: 'norway',
    name: 'norwegian',
    id: ArticleLanguage.NO,
  },
  {
    flag: 'portugal',
    name: 'portuguese',
    id: ArticleLanguage.PT,
  },
  {
    flag: 'russia',
    name: 'russian',
    id: ArticleLanguage.RU,
  },
  {
    flag: 'finland',
    name: 'sami',
    id: ArticleLanguage.SE,
  },
  {
    flag: 'spain',
    name: 'spanish',
    id: ArticleLanguage.ES,
  },
];

export default langauges;
