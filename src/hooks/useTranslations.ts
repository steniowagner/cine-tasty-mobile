import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';

type Options = {
  value: number;
};

export const useTranslations = () => {
  const i18next = useTranslation();

  const translate = useCallback(
    (key: Translations.Tags, options?: Options) => i18next.t(key, options),
    [i18next.t],
  );

  const language = useMemo(() => {
    switch (i18next.i18n.language) {
      case 'en':
        return SchemaTypes.ISO6391Language.EN;

      case 'es':
        return SchemaTypes.ISO6391Language.ES;

      case 'ptPT':
        return SchemaTypes.ISO6391Language.PT;

      case 'ptBR':
        return SchemaTypes.ISO6391Language.PTBR;

      default:
        return SchemaTypes.ISO6391Language.EN;
    }
  }, [i18next.i18n.language]);

  return {
    translate,
    language,
  };
};
