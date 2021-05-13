import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { DefaultTheme, withTheme } from 'styled-components';

import useMediaSwitcher, { SwitchItem } from './useMediaSwitcher';
import * as Styles from './MediaSwitcher.styles';

type MediaSwitcherProps = {
  onCalcuateSwitchWidth: () => void;
  theme: DefaultTheme;
  items: SwitchItem[];
  isDisabled: boolean;
};

const MediaSwitcher = (props: MediaSwitcherProps) => {
  const mediaSwitcher = useMediaSwitcher({
    onCalcuateSwitchWidth: props.onCalcuateSwitchWidth,
    theme: props.theme,
    items: props.items,
  });

  return (
    <Styles.Wrapper
      width={props.items.length * mediaSwitcher.switchItemWidth}
      style={{
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      testID="media-switcher-wrapper"
    >
      <Styles.SwitcherIndicator
        width={mediaSwitcher.switchItemWidth}
        testID="switcher-indicator"
        style={{
          opacity: props.isDisabled ? 0.5 : 1,
          transform: [
            {
              translateX: mediaSwitcher.translateX.interpolate({
                inputRange: [0, 1],
                outputRange: [0, mediaSwitcher.switchItemWidth],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      />
      <Styles.Row>
        {mediaSwitcher.switchItems.map((switchItem) => (
          <Styles.OptionButton
            disabled={mediaSwitcher.isSwitching || props.isDisabled}
            width={mediaSwitcher.switchItemWidth}
            testID={`${switchItem.title}-button`}
            onPress={switchItem.onPress}
            key={switchItem.title}
          >
            <Styles.OptionText
              onLayout={(event: LayoutChangeEvent) => switchItem.onLayout(event)}
              style={{ color: switchItem.textColor }}
              testID={`${switchItem.title}-text`}
            >
              {switchItem.title}
            </Styles.OptionText>
          </Styles.OptionButton>
        ))}
      </Styles.Row>
    </Styles.Wrapper>
  );
};

export default withTheme(MediaSwitcher);
