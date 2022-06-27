import React, {memo} from 'react';

import {SVGIcon, Icons} from '@components';

import * as Styles from './LanguageListItem.styles';

type LanguageListItemProps = {
  flag: Icons;
  onPress: () => void;
  isSelected: boolean;
  name: string;
};

const LanguageListItem = (props: LanguageListItemProps) => (
  <Styles.Wrapper testID="language-filter-list-item" onPress={props.onPress}>
    <Styles.ContentWrapper>
      <Styles.OutterFlagWrapper
        testID="outter-flag-wrapper"
        isSelected={props.isSelected}>
        <Styles.InnerFlagWrapper>
          <SVGIcon size={Styles.DEFAULT_ICON_SIZE} id={props.flag} />
        </Styles.InnerFlagWrapper>
      </Styles.OutterFlagWrapper>
      <Styles.LanguageText testID="language-text">
        {props.name}
      </Styles.LanguageText>
    </Styles.ContentWrapper>
    {props.isSelected && (
      <SVGIcon
        size={Styles.DEFAULT_ICON_SIZE}
        colorThemeRef="primary"
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
