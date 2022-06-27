import React from 'react';

import metrics from '@styles/metrics';
import {SVGIcon} from '@components';

import {useSectionViewAll} from './useSectionViewAll';
import * as Styles from './SectionViewAll.styles';

type SectionViewAllProps = {
  onPressViewAll: () => void;
  withViewAll?: boolean;
  sectionTitle: string;
  id: string;
};

export const SectionViewAll = (props: SectionViewAllProps) => {
  const sectionViewAll = useSectionViewAll({withViewAll: props.withViewAll});
  return (
    <Styles.SectionTextContentWrapper>
      <Styles.SectionTitle testID="section-title">
        {props.sectionTitle}
      </Styles.SectionTitle>
      {sectionViewAll.shouldShowViewAllButton && (
        <Styles.ViewAllWrapper
          testID={`view-all-button-${props.id}`}
          onPress={props.onPressViewAll}>
          <Styles.ViewAllText testID="view-all-text">
            {sectionViewAll.texts.viewAll}
          </Styles.ViewAllText>
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
