import React from 'react';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';

import TextIconButton from '../text-icon-button/TextIconButton';
import * as OpenSourceStyles from '../OpenSource.styles';
import * as Styles from './SupportLibraries.styles';
import libraries from '../libraries';

const SupportLibraries = () => {
  const { t } = useTranslation();

  return (
    <>
      <OpenSourceStyles.SectionTitle>
        {t(TRANSLATIONS.OPEN_SOURCE_LIBRARIES_TITLE)}
      </OpenSourceStyles.SectionTitle>
      <OpenSourceStyles.SectionDescrpition>
        {t(TRANSLATIONS.OPEN_SOURCE_LIBRARIES_DESCRIPTION)}
      </OpenSourceStyles.SectionDescrpition>
      <Styles.Wrapper>
        {libraries.map((library) => (
          <TextIconButton
            text={library.title}
            url={library.url}
            key={library.title}
          />
        ))}
      </Styles.Wrapper>
    </>
  );
};

export default SupportLibraries;
