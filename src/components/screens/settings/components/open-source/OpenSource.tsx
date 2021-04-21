import React from 'react';
import { TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SvgCssUri } from 'react-native-svg';

import * as TRANSLATIONS from '@i18n/tags';
import CONSTANTS from '@utils/constants';
import metrics from '@styles/metrics';

import LinkTextButton from './link-text-button/LinkTextButton';
import * as Styles from './OpenSrouce.styles';
import libraries from './libraries';

const TMDB_LOGO_URL = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';
const GITHUB_URL = 'https://github.com/steniowagner';
const TMDB_API_URL = 'https://www.themoviedb.org/';

const OpenSource = () => {
  const { t } = useTranslation();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: CONSTANTS.VALUES.DEFAULT_SPACING,
      }}
    >
      <Styles.SectionWrapper>
        <Styles.SectionTitle>
          {t(TRANSLATIONS.OPEN_SOURCE_TMDB_TITLE)}
        </Styles.SectionTitle>
        <Styles.SectionDescrpition>
          {t(TRANSLATIONS.OPEN_SOURCE_TMDB_DESCRIPTION)}
        </Styles.SectionDescrpition>
        <SvgCssUri
          width={metrics.getWidthFromDP('50%')}
          height={metrics.getWidthFromDP('50%')}
          uri={TMDB_LOGO_URL}
        />
        <LinkTextButton
          url={TMDB_API_URL}
        />
      </Styles.SectionWrapper>
      <Styles.SectionWrapper>
        <Styles.SectionTitle>
          {t(TRANSLATIONS.OPEN_SOURCE_GITHUB_TITLE)}
        </Styles.SectionTitle>
        <Styles.SectionDescrpition>
          {t(TRANSLATIONS.OPEN_SOURCE_GITHUB_DESCRIPTION)}
        </Styles.SectionDescrpition>
        <LinkTextButton
          url={GITHUB_URL}
        />
      </Styles.SectionWrapper>
      <Styles.SectionWrapper>
        <Styles.SectionTitle>
          {t(TRANSLATIONS.OPEN_SOURCE_LIBRARIES_TITLE)}
        </Styles.SectionTitle>
        <Styles.SectionDescrpition>
          {t(TRANSLATIONS.OPEN_SOURCE_LIBRARIES_DESCRIPTION)}
        </Styles.SectionDescrpition>
        {libraries.map((library) => (
          <TouchableOpacity
            onPress={() => Linking.openURL(library.url)}
            key={library.title}
          >
            <Styles.LibraryWrapper>
              <Styles.DefaultItemText>{`${library.title}: `}</Styles.DefaultItemText>
              <Styles.DefaultItemText
                isSubtext
              >
                {library.url}
              </Styles.DefaultItemText>
            </Styles.LibraryWrapper>
          </TouchableOpacity>
        ))}
      </Styles.SectionWrapper>
    </ScrollView>
  );
};

export default OpenSource;
