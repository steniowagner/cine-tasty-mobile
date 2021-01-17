import React from 'react';
import { TouchableOpacity, Platform, View } from 'react-native';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from 'utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';
import HeaderIconButton from 'components/common/HeaderIconButton';
import SVGIcon from 'components/common/svg-icon/SVGIcon';
import CONSTANTS from 'utils/constants';

import MediaSwitcher from '../media-switcher/MediaSwitcher';

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
}: Props) => (
  <Wrapper>
    <SettingsButton
      disabled={shouldDisableActions}
      onPress={onPressSettings}
      testID="header-icon-button-wrapper-settings"
    >
      <SVGIcon
        id="settings"
      />
    </SettingsButton>
    <MediaSwitcher
      onSwitchToTVShows={onPresSwitchTVShows}
      onSwitchToMovies={onPressSwitchMovies}
      isDisabled={shouldDisableActions}
    />
    <HeaderIconButton
      disabled={shouldDisableActions}
      onPress={onPressSearch}
      followThemeTextColor
      iconName="magnify"
      withMarginRight
    />
  </Wrapper>
);

export default Header;
