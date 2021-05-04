import React from 'react';

import HeaderIconButton from '@components/common/header-icon-button/HeaderIconButton';

import MediaSwitcher from '../media-switcher/MediaSwitcher';
import * as Styles from './Header.styles';
import useHeader from './hooks/useHeader';

type HeaderProps = {
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
}: HeaderProps) => {
  const { items, opacity } = useHeader({
    shouldDisableActions,
    onPresSwitchTVShows,
    onPressSwitchMovies,
  });

  return (
    <>
      <Styles.Wrapper
        style={{ opacity }}
      >
        <HeaderIconButton
          disabled={shouldDisableActions}
          onPress={onPressSettings}
          iconName="settings"
          withMarginLeft
        />
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
      </Styles.Wrapper>
      <Styles.SmokeShadow />
    </>
  );
};

export default Header;
