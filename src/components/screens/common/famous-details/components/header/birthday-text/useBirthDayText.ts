import {useCallback, useMemo} from 'react';

import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

type UseBirthDayTextProps = {
  rawDateString: string;
};

const useBirthDayText = (props: UseBirthDayTextProps) => {
  const translations = useTranslations();

  const parse = useCallback(() => {
    const [year, month, day] = props.rawDateString.split('-');
    const monthText = translations.translate(
      `${Translations.Tags.MONTHS}.${Number(month) - 1}` as Translations.Tags,
    );
    switch (translations.language as string) {
      case SchemaTypes.ISO6391Language.PTBR:
      case SchemaTypes.ISO6391Language.PT:
      case SchemaTypes.ISO6391Language.ES:
        return `${day} de ${monthText.toLowerCase()} de ${year}`;
      case SchemaTypes.ISO6391Language.EN:
        return `${monthText} ${day}, ${year}`;
      default:
        return '-';
    }
  }, [translations.translate, translations.language, props.rawDateString]);

  const parseRawDateToLocaleDateText = useCallback(() => {
    const rawDate = new Date(props.rawDateString);
    const isInvalidDate = Number.isNaN(rawDate.getTime());
    if (isInvalidDate) {
      return '-';
    }
    return parse();
  }, [props.rawDateString, parse]);

  const text = useMemo(() => {
    if (!props.rawDateString) {
      return '-';
    }
    return parseRawDateToLocaleDateText();
  }, [parseRawDateToLocaleDateText, props.rawDateString]);

  return {
    text,
  };
};

export default useBirthDayText;
