import React from 'react';
import { Platform, View } from 'react-native';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from 'utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';
import HeaderIconButton from 'components/common/HeaderIconButton';

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
    <HeaderIconButton
      disabled={shouldDisableActions}
      onPress={onPressSettings}
      iconName="settings"
      withMarginLeft
    />
    <MediaSwitcher
      onSwitchToTVShows={onPresSwitchTVShows}
      onSwitchToMovies={onPressSwitchMovies}
      isDisabled={shouldDisableActions}
    />
    <HeaderIconButton
      disabled={shouldDisableActions}
      onPress={onPressSearch}
      iconName="magnify"
      withMarginRight
    />
  </Wrapper>
);

export default Header;
