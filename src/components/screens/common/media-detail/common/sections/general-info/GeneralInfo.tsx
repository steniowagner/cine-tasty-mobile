import React from 'react';
import {useTranslation} from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';
import {Section} from '@components';

import * as Styles from './GeneralInfo.styles';

export type InfoItem = {
  title: string;
  value: string;
};

type GeneralInfoProps = {
  infoItems: InfoItem[];
};

export const GeneralInfo = ({infoItems}: GeneralInfoProps) => {
  const {t} = useTranslation();

  if (!infoItems.length) {
    return null;
  }

  return (
    <Section title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_DETAILS)}>
      <Styles.Wrapper testID="general-info-wrapper">
        {infoItems.map((infoItem, index) => (
          <Styles.InfoCellWrapper
            testID={`general-info-wrapper-${index}`}
            key={infoItem.title}>
            <Styles.InfoTitleText testID={`general-info-title-${index}`}>
              {infoItem.title}
            </Styles.InfoTitleText>
            <Styles.InfoValueText testID={`general-info-value-${index}`}>
              {infoItem.value}
            </Styles.InfoValueText>
          </Styles.InfoCellWrapper>
        ))}
      </Styles.Wrapper>
    </Section>
  );
};
