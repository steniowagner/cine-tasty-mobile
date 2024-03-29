import React, { memo } from 'react';

import { SVGIcon } from '@common-components';
import metrics from '@/styles/metrics';

import * as Styles from './OptionListItem.styles';

type OptionListItemProps = {
  onPress: () => void;
  isSelected: boolean;
  title: string;
};

const OptionListItem = (props: OptionListItemProps) => (
  <Styles.ListItemWrapper
    isSelected={props.isSelected}
    onPress={props.onPress}
    testID="option-list-item-button">
    <Styles.ListItemText
      testID="option-list-item-text"
      isSelected={props.isSelected}>
      {props.title}
    </Styles.ListItemText>
    {props.isSelected && (
      <SVGIcon
        size={metrics.getWidthFromDP('8')}
        id="checkbox-circle"
        color="primary"
      />
    )}
  </Styles.ListItemWrapper>
);

const shouldComponentUpdate = (
  previousState: OptionListItemProps,
  nextState: OptionListItemProps,
): boolean =>
  (previousState.isSelected || !nextState.isSelected) &&
  (!previousState.isSelected || nextState.isSelected);

export default memo(OptionListItem, shouldComponentUpdate);
