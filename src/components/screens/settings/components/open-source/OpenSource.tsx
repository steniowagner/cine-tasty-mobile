import React from 'react';
import {
  TouchableOpacity, ScrollView, Linking, Text, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SvgCssUri } from 'react-native-svg';
import styled from 'styled-components';

import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

import libraries from './libraries';

const GITHUB_URL = 'https://github.com/steniowagner';
const TMDB_API_URL = 'https://www.themoviedb.org/';

type DefaultItemTextStyleProps = {
  isSubtext?: boolean;
};

const SectionWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
`;

const SectionTitle = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Bold;
`;

const SectionDescrpition = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-family: CircularStd-Bold;
`;

const DefaultItemText = styled(Text)<DefaultItemTextStyleProps>`
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  color: ${({ isSubtext, theme }) => (isSubtext ? theme.colors.subText : theme.colors.text)};
  font-family: CircularStd-Bold;
`;

const LibraryWrapper = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const LinkButtonWrapper = styled(TouchableOpacity)`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;

type LinkButtonProps = {
  url: string;
};

const LinkButton = ({ url }: LinkButtonProps) => (
  <LinkButtonWrapper
    onPress={() => Linking.openURL(url)}
  >
    <DefaultItemText>{url}</DefaultItemText>
  </LinkButtonWrapper>
);

const OpenSource = () => {
  const { t } = useTranslation();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: CONSTANTS.VALUES.DEFAULT_SPACING,
      }}
    >
      <SectionWrapper>
        <SectionTitle>{t('translations:openSource:tmdb:title')}</SectionTitle>
        <SectionDescrpition>
          {t('translations:openSource:tmdb:description')}
        </SectionDescrpition>
        <SvgCssUri
          width={metrics.getWidthFromDP('50%')}
          height={metrics.getWidthFromDP('50%')}
          uri="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        />
        <LinkButton
          url={TMDB_API_URL}
        />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle>{t('translations:openSource:github:title')}</SectionTitle>
        <SectionDescrpition>
          {t('translations:openSource:github:description')}
        </SectionDescrpition>
        <LinkButton
          url={GITHUB_URL}
        />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle>{t('translations:openSource:libraries:title')}</SectionTitle>
        <SectionDescrpition>
          {t('translations:openSource:libraries:description')}
        </SectionDescrpition>
        {libraries.map((library) => (
          <TouchableOpacity
            onPress={() => Linking.openURL(library.url)}
            key={library.title}
          >
            <LibraryWrapper>
              <DefaultItemText>{`${library.title}: `}</DefaultItemText>
              <DefaultItemText
                isSubtext
              >
                {library.url}
              </DefaultItemText>
            </LibraryWrapper>
          </TouchableOpacity>
        ))}
      </SectionWrapper>
    </ScrollView>
  );
};

export default OpenSource;
