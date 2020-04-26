import { ArticleLanguage } from 'types/schema';
import { NewsFilterLanguage } from 'types';

import SaudiArabia from './flags/SaudiArabia';
import Nederlands from './flags/Nederlands';
import Portugal from './flags/Portugal';
import Germany from './flags/Germany';
import Finland from './flags/Finland';
import France from './flags/France';
import Russia from './flags/Russia';
import Israel from './flags/Israel';
import Norway from './flags/Norway';
import Italy from './flags/Italy';
import China from './flags/China';
import Spain from './flags/Spain';
import UK from './flags/UK';

type Language = {
  name: NewsFilterLanguage;
  Flag: () => JSX.Element;
  id: ArticleLanguage;
};

const langauges: Language[] = [
  {
    Flag: UK,
    name: 'english',
    id: ArticleLanguage.EN,
  },
  {
    Flag: SaudiArabia,
    name: 'arabic',
    id: ArticleLanguage.AR,
  },
  {
    Flag: China,
    name: 'mandarim',
    id: ArticleLanguage.ZH,
  },
  {
    Flag: Nederlands,
    name: 'dutch',
    id: ArticleLanguage.NL,
  },
  {
    Flag: France,
    name: 'french',
    id: ArticleLanguage.FR,
  },
  {
    Flag: Germany,
    name: 'german',
    id: ArticleLanguage.DE,
  },
  {
    Flag: Israel,
    name: 'hebrew',
    id: ArticleLanguage.HE,
  },
  {
    Flag: Italy,
    name: 'italian',
    id: ArticleLanguage.IT,
  },
  {
    Flag: Norway,
    name: 'norwegian',
    id: ArticleLanguage.NO,
  },
  {
    Flag: Portugal,
    name: 'portuguese',
    id: ArticleLanguage.PT,
  },
  {
    Flag: Russia,
    name: 'russian',
    id: ArticleLanguage.RU,
  },
  {
    Flag: Finland,
    name: 'sami',
    id: ArticleLanguage.SE,
  },
  {
    Flag: Spain,
    name: 'spanish',
    id: ArticleLanguage.ES,
  },
];

export default langauges;
