import React from 'react';

import { SVGIcon } from '@/components/common';

import { SetupQuestionsOptions } from '../../use-setup-questions/use-setup-questions';
import * as Styles from './ChooseOptionSection.styles';

type ChooseOptionSectionProps = {
  onPressOption: (section: SetupQuestionsOptions) => void;
  section: SetupQuestionsOptions;
  selectedOption: string;
  title: string;
};

export const ChooseOptionSection = (props: ChooseOptionSectionProps) => (
  <>
    <Styles.SectionTitle testID="section-title">
      {props.title}
    </Styles.SectionTitle>
    <Styles.InnerContentWrapper
      onPress={() => props.onPressOption(props.section)}
      testID={`dropdown-button-${props.section}`}>
      <Styles.OptionText testID={`dropdown-value-${props.section}`}>
        {props.selectedOption}
      </Styles.OptionText>
      <SVGIcon size={Styles.ICON_SIZE} id="chevron-down-box" />
    </Styles.InnerContentWrapper>
  </>
);
