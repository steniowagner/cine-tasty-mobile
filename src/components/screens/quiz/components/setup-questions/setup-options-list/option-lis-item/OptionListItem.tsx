import React, { memo } from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './OptionListItem.styles';

type OptionListItemProps = {
  onPress: () => void;
  isSelected: boolean;
  title: string;
};

const shouldComponentUpdate = (
  previousState: OptionListItemProps,
  nextState: OptionListItemProps,
): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

const OptionListItem = ({ isSelected, onPress, title }: OptionListItemProps) => (
  <Styles.ListItemWrapper
    isSelected={isSelected}
    onPress={onPress}
    testID="option-list-item"
  >
    <Styles.ListItemText
      testID="list-item-text"
    >
      {title}
    </Styles.ListItemText>
    {isSelected && (
      <SVGIcon
        size={metrics.getWidthFromDP('8%')}
        id="checkbox-circle"
        colorThemeRef="buttonText"
      />
    )}
  </Styles.ListItemWrapper>
);

export default memo(OptionListItem, shouldComponentUpdate);
