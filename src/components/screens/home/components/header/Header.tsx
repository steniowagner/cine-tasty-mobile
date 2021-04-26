import React, { useMemo } from 'react';

import HeaderIconButton from '@components/common/header-icon-button/HeaderIconButton';
import SVGIcon from '@components/common/svg-icon/SVGIcon';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import MediaSwitcher from '../media-switcher/MediaSwitcher';
import * as Styles from './Header.styles';

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
  const items = useMemo(
    () => [
      {
        onPress: onPressSwitchMovies,
        titlei18nRef: TRANSLATIONS.HOME_MOVIES,
      },
      {
        onPress: onPresSwitchTVShows,
        titlei18nRef: TRANSLATIONS.HOME_TV_SHOWS,
      },
    ],
    [onPressSwitchMovies, onPresSwitchTVShows],
  );

  return (
    <>
      <Styles.Wrapper
        opacity={shouldDisableActions ? 0.5 : 1}
      >
        <Styles.SettingsButton
          disabled={shouldDisableActions}
          onPress={onPressSettings}
          testID="header-icon-button-wrapper-settings"
        >
          <SVGIcon
            size={metrics.getWidthFromDP('6%')}
            id="settings"
          />
        </Styles.SettingsButton>
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
