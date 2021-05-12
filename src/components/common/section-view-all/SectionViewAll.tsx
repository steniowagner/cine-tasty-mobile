import React from 'react';
import { useTranslation } from 'react-i18next';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import * as Styles from './SectionViewAll.styles';

type SectionViewAllProps = {
  onPressViewAll: () => void;
  withViewAll: boolean;
  sectionTitle: string;
  id: string;
};

const SectionViewAll = (props: SectionViewAllProps) => {
  const { t } = useTranslation();

  return (
    <Styles.SectionTextContentWrapper>
      <Styles.SectionTitle
        testID="section-title"
      >
        {props.sectionTitle}
      </Styles.SectionTitle>
      {props.withViewAll && (
        <Styles.ViewAllWrapper
          testID={`view-all-button-${props.id}`}
          onPress={props.onPressViewAll}
        >
          <Styles.ViewAllText>{t(TRANSLATIONS.HOME_VIEW_ALL)}</Styles.ViewAllText>
          <SVGIcon
            size={metrics.getWidthFromDP('7%')}
            colorThemeRef="buttonText"
            id="chevron-right"
          />
        </Styles.ViewAllWrapper>
      )}
    </Styles.SectionTextContentWrapper>
  );
};

export default SectionViewAll;
