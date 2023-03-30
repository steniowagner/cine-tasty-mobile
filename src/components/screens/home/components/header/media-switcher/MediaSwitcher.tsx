import React from 'react';

import {CONSTANTS} from '@utils';

import {useMediaSwitcher} from './useMediaSwitcher';
import * as Styles from './MediaSwitcher.styles';
import {LayoutChangeEvent} from 'react-native';

type MediaSwitcherProps = {
  onCalcuateSwitchWidth: () => void;
  onPresSwitchTVShows: () => void;
  onPressSwitchMovies: () => void;
  isDisabled: boolean;
};

export const MediaSwitcher = (props: MediaSwitcherProps) => {
  const mediaSwitcher = useMediaSwitcher({
    onCalcuateSwitchWidth: props.onCalcuateSwitchWidth,
    onPressSwitchMovies: props.onPressSwitchMovies,
    onPresSwitchTVShows: props.onPresSwitchTVShows,
  });

  return (
    <Styles.Wrapper
      width={mediaSwitcher.items.length * mediaSwitcher.width}
      style={CONSTANTS.VALUES.DEFAULT_SHADOW}
      testID="media-switcher-wrapper">
      <Styles.SwitcherIndicator
        width={mediaSwitcher.width}
        testID="switcher-indicator"
        isDisabled={props.isDisabled}
        style={mediaSwitcher.animatedStyle}
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
                switchItem.onLayout(event.nativeEvent.layout.width)
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
