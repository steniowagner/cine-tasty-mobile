import {useTranslation} from 'react-i18next';

import * as SchemaTypes from '@schema-types';
import {useMemo} from 'react';

export const useGetCurrentISO6391Language = () => {
  const {i18n} = useTranslation();

  const currentISO6391Language = useMemo(() => {
    switch (i18n.language) {
      case 'en':
        return SchemaTypes.ISO6391Language.EN;

      case 'es':
        return SchemaTypes.ISO6391Language.ES;

      case 'ptPT':
        return SchemaTypes.ISO6391Language.PT;

      case 'pt':
        return SchemaTypes.ISO6391Language.PTBR;

      default:
        return SchemaTypes.ISO6391Language.EN;
    }
  }, [i18n.language]);

  return {
    currentISO6391Language,
  };
};
