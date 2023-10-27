import React, { useMemo } from 'react';

import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';
import { Typography } from '@common-components';

type HeaderTitleWithText = {
  translationTag?: Translations.Tags;
  text: string;
};

type HeaderTitleWithTranslationTag = {
  translationTag: Translations.Tags;
  text?: string;
};

type HeaderTitleProps = HeaderTitleWithText | HeaderTitleWithTranslationTag;

export const HeaderTitle = (props: HeaderTitleProps) => {
  const translation = useTranslation();

  return (
    <Typography.SmallText testID="header-title" alignment="center">
      {props.translationTag
        ? translation.translate(props.translationTag)
        : props.text}
    </Typography.SmallText>
  );
};
