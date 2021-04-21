import React, { memo } from 'react';

import { SupportedIcons } from '@components/common/svg-icon/getXML';
import SVGIcon from '@components/common/svg-icon/SVGIcon';

import * as Styles from './LanguageListItem.styles';

type LanguageListItemProps = {
  flag: SupportedIcons;
  onPress: () => void;
  isSelected: boolean;
  name: string;
};

const LanguageListItem = ({
  isSelected, onPress, name, flag,
}: LanguageListItemProps) => (
  <Styles.Wrapper
    testID="language-filter-list-item"
    onPress={onPress}
  >
    <Styles.ContentWrapper>
      <Styles.OutterFlagWrapper
        testID="outter-flag-wrapper"
        isSelected={isSelected}
      >
        <Styles.InnerFlagWrapper>
          <SVGIcon
            size={Styles.DEFAULT_ICON_SIZE}
            id={flag}
          />
        </Styles.InnerFlagWrapper>
      </Styles.OutterFlagWrapper>
      <Styles.LanguageText
        testID="language-text"
      >
        {name}
      </Styles.LanguageText>
    </Styles.ContentWrapper>
    {isSelected && (
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
): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

export default memo(LanguageListItem, shouldComponentUpdate);
