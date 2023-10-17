import { TabRouteIds } from '@/navigation/components/tab-navigator/tabs';
import { NewsFilterLanguage } from '@app-types';

export type Locale = {
  tabs: Record<TabRouteIds, string>;
  news: {
    filterLanguagesModal: {
      ctaTitle: string;
      title: string;
    };
    languages: Record<NewsFilterLanguage, string>;
  };
};
