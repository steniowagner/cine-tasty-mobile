import React, { useMemo } from 'react';
import { TouchableOpacity, Platform, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from 'utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';
import HeaderIconButton from 'components/common/HeaderIconButton';
import SVGIcon from 'components/common/svg-icon/SVGIcon';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

import MediaSwitcher from '../media-switcher/MediaSwitcher';

export const I18N_TV_SHOWS_KEY = 'translations:home:tvShows';
export const I18N_MOVIES_KEY = 'translations:home:movies';

const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [
    theme.colors.background,
    theme.colors.backgroundAlphax1,
    theme.colors.backgroundAlphax2,
    theme.colors.backgroundAlphax3,
    theme.colors.backgroundAlphax4,
    theme.colors.backgroundAlphax5,
  ],
}))`
  width: 100%;
  height: 15%;
`;

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => Platform.select({
    ios: isEqualsOrLargestThanIphoneX()
      ? theme.metrics.getWidthFromDP('12%')
      : theme.metrics.getWidthFromDP('7%'),
    android: theme.metrics.mediumSize,
  })}px;
  padding-bottom: ${({ theme }) => Platform.select({
    ios: theme.metrics.largeSize,
    android: theme.metrics.mediumSize,
  })}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SettingsButton = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  margin-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

type Props = {
  shouldDisableActions: boolean;
  onPresSwitchTVShows: () => void;
  onPressSwitchMovies: () => void;
  onPressSettings: () => void;
  onPressSearch: () => void;
};

const Header = ({
  shouldDisableActions,
  onPresSwitchTVShows,
  onPressSwitchMovies,
  onPressSettings,
  onPressSearch,
}: Props) => {
  const items = useMemo(
    () => [
      {
        onPress: onPressSwitchMovies,
        titlei18nRef: I18N_MOVIES_KEY,
      },
      {
        onPress: onPresSwitchTVShows,
        titlei18nRef: I18N_TV_SHOWS_KEY,
      },
    ],
    [onPressSwitchMovies, onPresSwitchTVShows],
  );

  return (
    <>
      <Wrapper>
        <SettingsButton
          disabled={shouldDisableActions}
          onPress={onPressSettings}
          testID="header-icon-button-wrapper-settings"
        >
          <SVGIcon
            size={metrics.getWidthFromDP('6%')}
            id="settings"
          />
        </SettingsButton>
        <MediaSwitcher
          isDisabled={shouldDisableActions}
          items={items}
        />
        <HeaderIconButton
          disabled={shouldDisableActions}
          onPress={onPressSearch}
          iconName="magnify"
          withMarginRight
        />
      </Wrapper>
      <SmokeShadow />
    </>
  );
};

export default Header;
