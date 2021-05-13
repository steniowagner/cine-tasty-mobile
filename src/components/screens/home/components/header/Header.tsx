import React from 'react';

import HeaderIconButton from '@components/common/header-icon-button/HeaderIconButton';

import MediaSwitcher from './media-switcher/MediaSwitcher';
import * as Styles from './Header.styles';
import useHeader from './hooks/useHeader';

type HeaderProps = {
  onPresSwitchTVShows: () => void;
  onPressSwitchMovies: () => void;
  shouldDisableActions: boolean;
  onPressSettings: () => void;
  onPressSearch: () => void;
};

const Header = (props: HeaderProps) => {
  const header = useHeader({
    shouldDisableActions: props.shouldDisableActions,
    onPresSwitchTVShows: props.onPresSwitchTVShows,
    onPressSwitchMovies: props.onPressSwitchMovies,
  });

  return (
    <>
      <Styles.Wrapper
        style={{ opacity: header.opacity }}
      >
        <HeaderIconButton
          disabled={props.shouldDisableActions}
          onPress={props.onPressSettings}
          iconName="settings"
          withMarginLeft
        />
        <MediaSwitcher
          onCalcuateSwitchWidth={header.onCalcuateSwitchWidth}
          isDisabled={props.shouldDisableActions}
          items={header.items}
        />
        <HeaderIconButton
          disabled={props.shouldDisableActions}
          onPress={props.onPressSearch}
          iconName="magnify"
          withMarginRight
        />
      </Styles.Wrapper>
      <Styles.SmokeShadow />
    </>
  );
};

export default Header;
