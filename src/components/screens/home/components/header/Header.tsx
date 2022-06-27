import React from 'react';

import {HeaderIconButton} from '@components';

import {MediaSwitcher} from './media-switcher/MediaSwitcher';
import * as Styles from './Header.styles';
import {useHeader} from './useHeader';

type HeaderProps = {
  shouldDisableActions: boolean;
  onPresSwitchTVShows: () => void;
  onPressSwitchMovies: () => void;
  onPressSettings: () => void;
  onPressSearch: () => void;
};

export const Header = (props: HeaderProps) => {
  const header = useHeader({
    shouldDisableActions: props.shouldDisableActions,
    onPresSwitchTVShows: props.onPresSwitchTVShows,
    onPressSwitchMovies: props.onPressSwitchMovies,
  });
  return (
    <>
      <Styles.Wrapper testID="header-wrapper" style={{opacity: header.opacity}}>
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
