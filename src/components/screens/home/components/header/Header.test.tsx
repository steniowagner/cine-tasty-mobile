import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import {Header} from './Header';

const switchTVShowsTitle = 'translations:home:tvShows';
const switchMoviesTitle = 'translations:home:movies';

const renderHeader = ({
  onPresSwitchTVShows = jest.fn(),
  onPressSwitchMovies = jest.fn(),
  shouldDisableActions = false,
  onPressSettings = jest.fn(),
  onPressSearch = jest.fn(),
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

describe('<Header />', () => {
  const elements = {
    settings: (api: RenderAPI) =>
      api.getByTestId('header-icon-button-wrapper-settings'),
    search: (api: RenderAPI) =>
      api.getByTestId('header-icon-button-wrapper-magnify'),
    wrapper: (api: RenderAPI) => api.getByTestId('media-switcher-wrapper'),
    tvShowsSwitchText: (api: RenderAPI) =>
      api.getByTestId(`${switchTVShowsTitle}-text`),
    moviesSwitchText: (api: RenderAPI) =>
      api.getByTestId(`${switchMoviesTitle}-text`),
  };

  describe('UI', () => {
    it('should render correctly', () => {
      const component = render(renderHeader({}));
      expect(elements.settings(component)).not.toBeNull();
      expect(elements.search(component)).not.toBeNull();
      expect(elements.wrapper(component)).not.toBeNull();
    });

    it('should render the switch-items with the correct labels', () => {
      const component = render(renderHeader({}));
      expect(elements.tvShowsSwitchText(component)).not.toBeNull();
      expect(elements.tvShowsSwitchText(component).children[0]).toEqual(
        switchTVShowsTitle,
      );
      expect(elements.moviesSwitchText(component)).not.toBeNull();
      expect(elements.moviesSwitchText(component).children[0]).toEqual(
        switchMoviesTitle,
      );
    });
  });

  describe('Pressing header-action-buttons', () => {
    it('should call "onPressSettings" when the "settings" button is pressed', () => {
      const onPressSettings = jest.fn();
      const component = render(renderHeader({onPressSettings}));
      expect(onPressSettings).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.settings(component));
      expect(onPressSettings).toHaveBeenCalledTimes(1);
    });

    it('should not-call "onPressSettings" when the "settings" button is pressed and the "shouldDisableActions" is "true"', () => {
      const onPressSettings = jest.fn();
      const component = render(
        renderHeader({onPressSettings, shouldDisableActions: true}),
      );
      expect(onPressSettings).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.settings(component));
      expect(onPressSettings).toHaveBeenCalledTimes(0);
    });

    it('should call "onPressSearch" when the "search" button is pressed', () => {
      const onPressSearch = jest.fn();
      const component = render(renderHeader({onPressSearch}));
      expect(onPressSearch).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.search(component));
      expect(onPressSearch).toHaveBeenCalledTimes(1);
    });

    it('should not-call "onPressSearch" when the "search" button is pressed and the "shouldDisableActions" is "true"', () => {
      const onPressSearch = jest.fn();
      const component = render(
        renderHeader({onPressSearch, shouldDisableActions: true}),
      );
      expect(onPressSearch).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.settings(component));
      expect(onPressSearch).toHaveBeenCalledTimes(0);
    });
  });
});
