import React, { useRef } from 'react';
import { TouchableWithoutFeedback, Animated, View } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';
import metrics from 'styles/metrics';

import useMediaSwitcher from './useMediaSwitcher';

const WRAPPER_BORDER_RADIUS = metrics.getWidthFromDP('7.5%');
const WRAPPER_HEIGHT = metrics.getWidthFromDP('15%');
const WRAPPER_WIDTH = metrics.getWidthFromDP('15%');
const BOTTOM_VALUE = 30;
const RIGHT_VALUE = 30;

interface IconStyleProps {
  readonly name: string;
}

const MainButtonWrapper = styled(View)`
  width: ${WRAPPER_WIDTH}px;
  height: ${WRAPPER_HEIGHT}px;
  border-radius: ${WRAPPER_BORDER_RADIUS}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: ${BOTTOM_VALUE}px;
  right: ${RIGHT_VALUE}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const BackgroundView = styled(Animated.View)`
  width: ${WRAPPER_WIDTH}px;
  height: ${WRAPPER_HEIGHT}px;
  border-radius: ${WRAPPER_BORDER_RADIUS}px;
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  bottom: ${BOTTOM_VALUE}px;
  right: ${RIGHT_VALUE}px;
`;

const SwitcherOptionText = styled(Animated.Text)`
  text-align: right;
  position: absolute;
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: white;
`;

const SwitcherOptionWrapper = styled(Animated.View)`
  height: ${WRAPPER_HEIGHT}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: ${WRAPPER_BORDER_RADIUS}px;
  bottom: ${BOTTOM_VALUE}px;
  right: ${RIGHT_VALUE}px;
`;

const IconWrapper = styled(View)`
  width: ${WRAPPER_WIDTH}px;
  height: ${WRAPPER_HEIGHT}px;
  border-radius: ${WRAPPER_BORDER_RADIUS}px;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const DefaultIcon = styled(Icon).attrs(({ theme, name }) => ({
  size: theme.metrics.getWidthFromDP('7%'),
  color: '#262626',
  name,
}))<IconStyleProps>``;

const MediaSwitcher = () => {
  const switcherButtonAnimation = useRef(new Animated.Value(0)).current;

  const {
    moviesOptionAnimatedStyle,
    optionTextAnimatedStyle,
    backgroundAnimatedStyle,
    tvOptionAnimatedStyle,
    onPressSwitchButton,
    onPressMovies,
    onPressTV,
    isOpen,
    t,
  } = useMediaSwitcher({ switcherButtonAnimation });

  return (
    <>
      <BackgroundView
        style={backgroundAnimatedStyle}
      />
      <TouchableWithoutFeedback
        onPress={onPressTV}
      >
        <SwitcherOptionWrapper
          style={[tvOptionAnimatedStyle]}
        >
          <SwitcherOptionText
            style={optionTextAnimatedStyle}
          >
            {t('translations:home:tvShows')}
          </SwitcherOptionText>
          <IconWrapper>
            <DefaultIcon
              name="television"
            />
          </IconWrapper>
        </SwitcherOptionWrapper>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={onPressMovies}
      >
        <SwitcherOptionWrapper
          style={[moviesOptionAnimatedStyle]}
        >
          <SwitcherOptionText
            style={optionTextAnimatedStyle}
          >
            {t('translations:home:movies')}
          </SwitcherOptionText>
          <IconWrapper>
            <DefaultIcon
              name="movie"
            />
          </IconWrapper>
        </SwitcherOptionWrapper>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={onPressSwitchButton}
      >
        <MainButtonWrapper
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}
        >
          <DefaultIcon
            name={isOpen ? 'close' : 'tune'}
          />
        </MainButtonWrapper>
      </TouchableWithoutFeedback>
    </>
  );
};

export default MediaSwitcher;
