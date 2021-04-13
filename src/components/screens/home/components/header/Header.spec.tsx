import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from '@styles/theme';

import Header from './Header';

const renderHeader = ({
  onPresSwitchTVShows = jest.fn,
  onPressSwitchMovies = jest.fn,
  shouldDisableActions = false,
  onPressSettings = jest.fn,
  onPressSearch = jest.fn,
}) => (
  <ThemeProvider theme={theme}>
    <Header
      shouldDisableActions={shouldDisableActions}
      onPresSwitchTVShows={onPresSwitchTVShows}
      onPressSwitchMovies={onPressSwitchMovies}
      onPressSettings={onPressSettings}
      onPressSearch={onPressSearch}
    />
  </ThemeProvider>
);

describe('Testing <Header />', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByTestId } = render(renderHeader({}));

    expect(queryByTestId('header-icon-button-wrapper-settings')).not.toBeNull();

    expect(queryByTestId('header-icon-button-wrapper-magnify')).not.toBeNull();

    expect(queryByTestId('media-switcher-wrapper')).not.toBeNull();
  });

  it('should call "onPressSettings" when the "settings" button is pressed', () => {
    const onPressSwitchMovies = jest.fn();
    const onPresSwitchTVShows = jest.fn();
    const onPressSettings = jest.fn();
    const onPressSearch = jest.fn();

    const { queryByTestId } = render(
      renderHeader({ onPressSwitchMovies, onPressSettings, onPressSearch }),
    );

    fireEvent.press(queryByTestId('header-icon-button-wrapper-settings'));

    expect(onPressSwitchMovies).toHaveBeenCalledTimes(0);

    expect(onPresSwitchTVShows).toHaveBeenCalledTimes(0);

    expect(onPressSettings).toHaveBeenCalledTimes(1);

    expect(onPressSearch).toHaveBeenCalledTimes(0);
  });

  it('should not-call "onPressSettings" when the "settings" button is pressed and the "shouldDisableActions" is "true"', () => {
    const onPressSwitchMovies = jest.fn();
    const onPresSwitchTVShows = jest.fn();
    const onPressSettings = jest.fn();
    const onPressSearch = jest.fn();

    const { queryByTestId } = render(
      renderHeader({
        shouldDisableActions: true,
        onPressSwitchMovies,
        onPressSettings,
        onPressSearch,
      }),
    );

    fireEvent.press(queryByTestId('header-icon-button-wrapper-settings'));

    expect(onPressSwitchMovies).toHaveBeenCalledTimes(0);

    expect(onPresSwitchTVShows).toHaveBeenCalledTimes(0);

    expect(onPressSettings).toHaveBeenCalledTimes(0);

    expect(onPressSearch).toHaveBeenCalledTimes(0);
  });

  it('should call "onPressSearch" when the "search" button is pressed', () => {
    const onPressSwitchMovies = jest.fn();
    const onPresSwitchTVShows = jest.fn();
    const onPressSettings = jest.fn();
    const onPressSearch = jest.fn();

    const { getByTestId } = render(
      renderHeader({
        shouldDisableActions: true,
        onPressSwitchMovies,
        onPressSettings,
        onPressSearch,
      }),
    );

    fireEvent.press(getByTestId('header-icon-button-wrapper-magnify'));

    expect(onPressSwitchMovies).toHaveBeenCalledTimes(0);

    expect(onPresSwitchTVShows).toHaveBeenCalledTimes(0);

    expect(onPressSettings).toHaveBeenCalledTimes(0);

    expect(onPressSearch).toHaveBeenCalledTimes(0);
  });
});
