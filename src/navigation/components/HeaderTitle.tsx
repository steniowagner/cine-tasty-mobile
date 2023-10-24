import React from 'react';

import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';
import { Typography } from '@common-components';

type HeaderTitleProps = {
  translationTag: Translations.Tags;
};

export const HeaderTitle = (props: HeaderTitleProps) => {
  const translation = useTranslation();

  return (
    <Typography.SmallText alignment="center">
      {translation.translate(props.translationTag)}
    </Typography.SmallText>
  );
};
