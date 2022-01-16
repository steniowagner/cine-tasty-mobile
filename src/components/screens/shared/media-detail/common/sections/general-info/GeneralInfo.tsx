import React from 'react';
import { useTranslation } from 'react-i18next';

import Section from '@components/common/section/Section';
import * as TRANSLATIONS from '@i18n/tags';

import * as Styles from './GeneralInfo.styles';

type InfoItem = {
  title: string;
  value: string;
};

type GeneralInfoProps = {
  infoItems: InfoItem[];
};

const GeneralInfo = ({ infoItems }: GeneralInfoProps) => {
  const { t } = useTranslation();

  return (
    !!infoItems.length && (
      <Section
        title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_DETAILS)}
      >
        <Styles.Wrapper
          testID="general-info-wrapper"
        >
          {infoItems.map((infoItem) => (
            <Styles.InfoCellWrapper
              key={infoItem.title}
            >
              <Styles.InfoTitleText>{infoItem.title}</Styles.InfoTitleText>
              <Styles.InfoValueText>{infoItem.value}</Styles.InfoValueText>
            </Styles.InfoCellWrapper>
          ))}
        </Styles.Wrapper>
      </Section>
    )
  );
};

export default GeneralInfo;
