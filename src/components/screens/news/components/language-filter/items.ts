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
  Flag: () => JSX.Element;
  name: string;
  id: string;
};

const langauges: Language[] = [
  {
    Flag: UK,
    name: 'English',
    id: 'EN',
  },
  {
    Flag: SaudiArabia,
    name: 'Arabia',
    id: 'AR',
  },
  {
    Flag: China,
    name: 'Chinese',
    id: 'ZH',
  },
  {
    Flag: Nederlands,
    name: 'Dutch',
    id: 'NL',
  },
  {
    Flag: Finland,
    name: 'Finland',
    id: 'SE',
  },
  {
    Flag: France,
    name: 'French',
    id: 'FR',
  },
  {
    Flag: Germany,
    name: 'German',
    id: 'DE',
  },
  {
    Flag: Israel,
    name: 'Hebrew',
    id: 'HE',
  },
  {
    Flag: Italy,
    name: 'Italian',
    id: 'IT',
  },
  {
    Flag: Norway,
    name: 'Norwegian',
    id: 'NO',
  },
  {
    Flag: Portugal,
    name: 'Português',
    id: 'PT',
  },
  {
    Flag: Russia,
    name: 'Russian',
    id: 'RU',
  },
  {
    Flag: Spain,
    name: 'Spanish',
    id: 'ES',
  },
];

export default langauges;
