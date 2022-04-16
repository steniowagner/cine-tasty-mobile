import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

type UseSimilarProps = {
  similarLength: number;
};

export const useSimilar = (props: UseSimilarProps) => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      section: props.similarLength
        ? translations.translate(
            Translations.Tags.MEDIA_DETAIL_SECTIONS_SIMILAR,
          )
        : `${translations.translate(
            Translations.Tags.MEDIA_DETAIL_SECTIONS_SIMILAR,
          )} (0)`,
    }),
    [translations.translate, props.similarLength],
  );

  return {
    texts,
  };
};
