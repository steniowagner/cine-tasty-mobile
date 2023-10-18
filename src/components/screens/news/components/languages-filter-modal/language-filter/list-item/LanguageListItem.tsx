import React, { memo } from 'react';

import { SVGIcon, FlagsIcons } from '@common-components';

import * as Styles from './LanguageListItem.styles';

type LanguageListItemProps = {
  flag: FlagsIcons;
  onPress: () => void;
  isSelected: boolean;
  title: string;
};

const LanguageListItem = (props: LanguageListItemProps) => (
  <Styles.Wrapper
    isSelected={props.isSelected}
    testID="language-filter-list-item"
    onPress={props.onPress}>
    <Styles.ContentWrapper>
      <Styles.OutterFlagWrapper
        testID="outter-flag-wrapper"
        isSelected={props.isSelected}>
        <Styles.InnerFlagWrapper>
          <SVGIcon
            size={Styles.DEFAULT_ICON_SIZE}
            id={props.flag}
            testID={`flag-svg-${props.flag}`}
          />
        </Styles.InnerFlagWrapper>
      </Styles.OutterFlagWrapper>
      <Styles.LanguageText isSelected={props.isSelected} testID="language-text">
        {props.title}
      </Styles.LanguageText>
    </Styles.ContentWrapper>
    {props.isSelected && (
      <SVGIcon
        size={Styles.DEFAULT_ICON_SIZE}
        color="primary"
        id="checkbox-circle"
      />
    )}
  </Styles.Wrapper>
);

const shouldComponentUpdate = (
  previousState: LanguageListItemProps,
  nextState: LanguageListItemProps,
): boolean =>
  (previousState.isSelected || !nextState.isSelected) &&
  (!previousState.isSelected || nextState.isSelected);

export default memo(LanguageListItem, shouldComponentUpdate);
