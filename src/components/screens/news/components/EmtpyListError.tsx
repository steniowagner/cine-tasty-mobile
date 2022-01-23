import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Advise from '@components/common/advise/Advise';
import * as TRANSLATIONS from '@i18n/tags';

const EmtpyListError = () => {
  const {t} = useTranslation();

  return (
    <View testID="list-empty-component-wrapper">
      <Advise
        description={t(TRANSLATIONS.NEWS_EMPTY_LIST_DESCRIPTION)}
        suggestion={t(TRANSLATIONS.NEWS_EMPTY_LIST_SUGGESTION)}
        title={t(TRANSLATIONS.NEWS_EMPTY_LIST_TITLE)}
        icon="alert-box"
      />
    </View>
  );
};

export default EmtpyListError;
