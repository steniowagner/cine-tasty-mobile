import {Icons} from '@components';
import {dark} from '@styles/themes';

type SocialNetwork = {
  color: string;
  icon: Icons;
  url: string;
};

export const socialNetworks: SocialNetwork[] = [
  {
    url: 'https://www.linkedin.com/in/steniowagner',
    icon: 'linkedin',
    color: dark.colors.linkedin,
  },
  {
    url: 'https://github.com/steniowagner',
    icon: 'github',
    color: dark.colors.github,
  },
  {
    url: 'https://www.instagram.com/swhimself/',
    icon: 'instagram',
    color: dark.colors.instagram,
  },
];
