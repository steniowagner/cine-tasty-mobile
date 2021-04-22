import React from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';
import { DefaultTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import Advise from '@components/common/advise/Advise';
import * as TRANSLATIONS from '@i18n/tags';

type MediaDetailErrorProps = {
  barStyle: StatusBarStyle;
  theme: DefaultTheme;
};

const MediaDetailError = ({ barStyle, theme }: MediaDetailErrorProps) => {
  const { t } = useTranslation();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle={barStyle}
        animated
      />
      <Advise
        description={t(TRANSLATIONS.MEDIA_DETAIL_ERROR_DESCRIPTION)}
        suggestion={t(TRANSLATIONS.MEDIA_DETAIL_ERROR_SUGGESTION)}
        title={t(TRANSLATIONS.MEDIA_DETAIL_ERROR_TITLE)}
        icon="alert-box"
      />
    </>
  );
};

export default MediaDetailError;
