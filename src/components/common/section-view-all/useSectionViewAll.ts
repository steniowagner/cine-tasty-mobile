import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

type UseSectionViewAll = {
  withViewAll?: boolean;
};

export const useSectionViewAll = (props: UseSectionViewAll) => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      viewAll: translations.translate(Translations.Tags.HOME_VIEW_ALL),
    }),
    [],
  );

  const shouldShowViewAllButton = useMemo(
    () => props.withViewAll || typeof props.withViewAll === 'undefined',
    [props.withViewAll],
  );

  return {
    shouldShowViewAllButton,
    texts,
  };
};
