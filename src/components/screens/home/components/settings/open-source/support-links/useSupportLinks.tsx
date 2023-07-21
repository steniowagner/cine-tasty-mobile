import {useMemo} from 'react';

import {useTranslations} from '@hooks';

import {supportLinksItems} from './support-links-items';

export const useSupportLinks = () => {
  const translations = useTranslations();

  const items = useMemo(
    () =>
      supportLinksItems.map(supportLink => ({
        ...supportLink,
        description: translations.translate(supportLink.description),
        title: translations.translate(supportLink.title),
      })),
    [],
  );

  return {
    items,
  };
};
