import {Icons} from '@components';

type SocialNetwork = {
  icon: Icons;
  url: string;
  color: string;
};

const socialNetworks: SocialNetwork[] = [
  {
    url: 'https://www.linkedin.com/in/steniowagner',
    icon: 'linkedin',
    color: '#0077B5',
  },
  {
    url: 'https://github.com/steniowagner',
    icon: 'github',
    color: '#333333',
  },
  {
    url: 'https://twitter.com/swhimself',
    icon: 'twitter',
    color: '#08A0E9',
  },
];

export default socialNetworks;
