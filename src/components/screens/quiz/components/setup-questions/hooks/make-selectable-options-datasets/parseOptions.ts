import * as Types from '@local-types';
import {Translations} from '@i18n/tags';

type ParseOptionsParams = {
  baseDataset: Types.QuizFilterOption[];
  i18nLabelTranslation: string;
  translate: (key: Translations.Tags) => any;
};

const isEquals =
  (option: Types.QuizFilterOption) => (other: Types.QuizFilterOption) =>
    option.id === other?.id &&
    option.option === other?.option &&
    option.value === other?.value;

export const parseOptions = (params: ParseOptionsParams) =>
  params.baseDataset.map(option => ({
    ...option,
    label: params.translate(
      `${params.i18nLabelTranslation}_${option.id}` as Translations.Tags,
    ),
    isEquals: isEquals(option),
  }));
