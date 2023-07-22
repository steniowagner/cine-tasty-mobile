import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';

type Options = {
  value: number;
};

const LANGUAGES = ['en', 'es', 'ptBR'];

export const useTranslations = () => {
  const i18next = useTranslation();

  const translate = useCallback(
    (key: Translations.Tags, options?: Options) => i18next.t(key, options),
    [i18next.t],
  );

  const language = useMemo(() => {
    switch (i18next.i18n.language) {
      case LANGUAGES[0]:
        return SchemaTypes.ISO6391Language.EN;

      case LANGUAGES[1]:
        return SchemaTypes.ISO6391Language.ES;

      case LANGUAGES[2]:
        return SchemaTypes.ISO6391Language.PTBR;

      default:
        return SchemaTypes.ISO6391Language.EN;
    }
  }, [i18next.i18n.language]);

  return {
    languages: LANGUAGES,
    translate,
    language,
  };
};
