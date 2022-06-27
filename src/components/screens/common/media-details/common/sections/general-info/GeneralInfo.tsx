import React from 'react';

import {Section} from '@components';

import {useGeneralInfo} from './useGeneralInfo';
import * as Styles from './GeneralInfo.styles';

export type InfoItem = {
  title: string;
  value: string;
};

type GeneralInfoProps = {
  infoItems: InfoItem[];
};

export const GeneralInfo = (props: GeneralInfoProps) => {
  const generalInfo = useGeneralInfo();

  if (!props.infoItems.length) {
    return null;
  }

  return (
    <Section title={generalInfo.texts.sectionTitle}>
      <Styles.Wrapper testID="general-info-wrapper">
        {props.infoItems.map((infoItem, index) => (
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
