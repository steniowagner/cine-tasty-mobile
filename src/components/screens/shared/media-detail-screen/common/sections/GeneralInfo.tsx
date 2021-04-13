import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Section from '@components/common/Section';
import * as TRANSLATIONS from '@i18n/tags';

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const InfoCellWrapper = styled(View)`
  width: 46%;
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('1.5%')}px;
`;

const InfoTitleText = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoValueText = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.subText};
`;

type InfoItem = {
  title: string;
  value: string;
};

type Props = {
  infoItems: InfoItem[];
};

const GeneralInfo = ({ infoItems }: Props) => {
  const { t } = useTranslation();

  return (
    !!infoItems.length && (
      <Section
        title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_DETAILS)}
      >
        <Wrapper
          testID="general-info-wrapper"
        >
          {infoItems.map((infoItem) => (
            <InfoCellWrapper
              key={infoItem.title}
            >
              <InfoTitleText>{infoItem.title}</InfoTitleText>
              <InfoValueText>{infoItem.value}</InfoValueText>
            </InfoCellWrapper>
          ))}
        </Wrapper>
      </Section>
    )
  );
};

export default GeneralInfo;
