import React from 'react';
import {LayoutChangeEvent} from 'react-native';
import {DefaultTheme, withTheme} from 'styled-components/native';

import useMediaSwitcher, {SwitchItem} from './useMediaSwitcher';
import * as Styles from './MediaSwitcher.styles';

type MediaSwitcherProps = {
  onCalcuateSwitchWidth: () => void;
  theme: DefaultTheme;
  items: SwitchItem[];
  isDisabled: boolean;
};

const MediaSwitcher = ({
  onCalcuateSwitchWidth,
  isDisabled,
  items,
  theme,
}: MediaSwitcherProps) => {
  const {switchItemWidth, translateX, switchItems, isSwitching} =
    useMediaSwitcher({
      onCalcuateSwitchWidth,
      theme,
      items,
    });

  return (
    <Styles.Wrapper
      width={items.length * switchItemWidth}
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
      testID="media-switcher-wrapper">
      <Styles.SwitcherIndicator
        width={switchItemWidth}
        testID="switcher-indicator"
        style={{
          opacity: isDisabled ? 0.5 : 1,
          transform: [
            {
              translateX: translateX.interpolate({
                inputRange: [0, 1],
                outputRange: [0, switchItemWidth],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      />
      <Styles.Row>
        {switchItems.map(switchItem => (
          <Styles.OptionButton
            disabled={isSwitching || isDisabled}
            onPress={switchItem.onPress}
            testID={`${switchItem.title}-button`}
            width={switchItemWidth}
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

export default withTheme(MediaSwitcher);
