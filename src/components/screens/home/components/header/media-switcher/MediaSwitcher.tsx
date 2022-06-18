import React from 'react';
import {LayoutChangeEvent} from 'react-native';

import {CONSTANTS} from '@utils';

import useMediaSwitcher, {SwitchItem} from './useMediaSwitcher';
import * as Styles from './MediaSwitcher.styles';

type MediaSwitcherProps = {
  onCalcuateSwitchWidth: () => void;
  items: SwitchItem[];
  isDisabled: boolean;
};

export const MediaSwitcher = (props: MediaSwitcherProps) => {
  const mediaSwitcher = useMediaSwitcher({
    onCalcuateSwitchWidth: props.onCalcuateSwitchWidth,
    items: props.items,
  });
  return (
    <Styles.Wrapper
      width={props.items.length * mediaSwitcher.width}
      style={CONSTANTS.VALUES.DEFAULT_SHADOW}
      testID="media-switcher-wrapper">
      <Styles.SwitcherIndicator
        width={mediaSwitcher.width}
        testID="switcher-indicator"
        isDisabled={props.isDisabled}
        style={{
          transform: [
            {
              translateX: mediaSwitcher.translateX.interpolate({
                inputRange: [0, 1],
                outputRange: [0, mediaSwitcher.width],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      />
      <Styles.Row>
        {mediaSwitcher.items.map(switchItem => (
          <Styles.OptionButton
            disabled={mediaSwitcher.isSwitching || props.isDisabled}
            onPress={switchItem.onPress}
            testID={`${switchItem.title}-button`}
            width={mediaSwitcher.width}
            key={switchItem.title}>
            <Styles.OptionText
              onLayout={(event: LayoutChangeEvent) =>
                switchItem.onLayout(event)
              }
              style={{color: switchItem.textColor}}
              testID={`${switchItem.title}-text`}>
              {switchItem.title}
            </Styles.OptionText>
          </Styles.OptionButton>
        ))}
      </Styles.Row>
    </Styles.Wrapper>
  );
};
