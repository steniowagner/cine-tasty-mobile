import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import RoundedButton from 'components/common/RoundedButton';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  padding-vertical: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LargeText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Black;
  text-align: center;
`;

const SubText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-family: CircularStd-Bold;
  text-align: center;
`;

const Quiz = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <LargeText>{t('translations:quiz:welcome')}</LargeText>
      <SubText>{t('translations:quiz:decription')}</SubText>
      <LargeText>{t('translations:quiz:challenge')}</LargeText>
      <RoundedButton
        onPress={() => {}}
        text={t('translations:quiz:startButtonText')}
      />
    </Wrapper>
  );
};

export default Quiz;
