import React from 'react';
import {
  fireEvent,
  cleanup,
  render,
  act,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {dark as theme} from '@styles/themes/dark';

import {SWITCH_ANIMATION_DURATION_MS} from './useMediaSwitcher';
import {MediaSwitcher} from './MediaSwitcher';

const labels = ['MOVIES', 'TV_SHOWS'];

const renderMediaSwitcher = (
  onPressMovies = jest.fn(),
  onPressTVShows = jest.fn(),
  isDisabled = false,
) => {
  const items = [
    {title: labels[0], onPress: onPressMovies},
    {title: labels[1], onPress: onPressTVShows},
  ];
  return (
    <ThemeProvider theme={theme}>
      <MediaSwitcher
        onCalcuateSwitchWidth={jest.fn()}
        isDisabled={isDisabled}
        items={items}
      />
    </ThemeProvider>
  );
};

describe('<MediaSwitcher />', () => {
  const elements = {
    indicator: (api: RenderAPI) => api.getByTestId('switcher-indicator'),
    moviesButton: (api: RenderAPI) => api.getByTestId(`${labels[0]}-button`),
    moviesText: (api: RenderAPI) => api.getByTestId(`${labels[0]}-text`),
    tvShowsButton: (api: RenderAPI) => api.getByTestId(`${labels[1]}-button`),
    tvShowsText: (api: RenderAPI) => api.getByTestId(`${labels[1]}-text`),
  };

  describe('UI', () => {
    describe('When "isDisabled" is "true"', () => {
      it('should render all the items correclty', () => {
        const component = render(
          renderMediaSwitcher(undefined, undefined, true),
        );
        expect(elements.indicator(component)).not.toBeNull();
        expect(elements.moviesButton(component)).not.toBeNull();
        expect(elements.moviesText(component)).not.toBeNull();
        expect(elements.tvShowsButton(component)).not.toBeNull();
        expect(elements.tvShowsText(component)).not.toBeNull();
      });

      it('should render the switch-items-style correctly', () => {
        const component = render(
          renderMediaSwitcher(undefined, undefined, true),
        );
        expect(
          elements.indicator(component).props.style.backgroundColor,
        ).toEqual(theme.colors.primary);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
      });

      it('should render with the correct opacity', () => {
        const component = render(
          renderMediaSwitcher(undefined, undefined, true),
        );
        expect(elements.indicator(component).props.style.opacity).toEqual(0.5);
      });

      it('should render the switch-items-content correctly', () => {
        const component = render(
          renderMediaSwitcher(undefined, undefined, true),
        );
        expect(elements.moviesText(component).children[0]).toEqual(labels[0]);
        expect(elements.tvShowsText(component).children[0]).toEqual(labels[1]);
      });
    });

    describe('When "isDisabled" is "false"', () => {
      beforeEach(setupTimeTravel);

      afterEach(cleanup);

      it('should render all the items correclty', () => {
        const component = render(renderMediaSwitcher());
        expect(elements.indicator(component)).not.toBeNull();
        expect(elements.moviesButton(component)).not.toBeNull();
        expect(elements.moviesText(component)).not.toBeNull();
        expect(elements.tvShowsButton(component)).not.toBeNull();
        expect(elements.tvShowsText(component)).not.toBeNull();
      });

      it('should render the switch-items-style correctly', () => {
        const component = render(renderMediaSwitcher());
        expect(
          elements.indicator(component).props.style.backgroundColor,
        ).toEqual(theme.colors.primary);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
      });

      it('should render with the correct opacity', () => {
        const component = render(renderMediaSwitcher());
        expect(elements.indicator(component).props.style.opacity).toEqual(1);
      });

      it('should render the switch-items-content correctly', () => {
        const component = render(renderMediaSwitcher());
        expect(elements.moviesText(component).children[0]).toEqual(labels[0]);
        expect(elements.tvShowsText(component).children[0]).toEqual(labels[1]);
      });

      it('should render the components correctly when the user transition from "Movies" to "TV Shows"', async () => {
        const component = render(renderMediaSwitcher());
        // default-state (movies-selected)
        expect(elements.indicator(component).props.style.opacity).toEqual(1);
        expect(
          elements.indicator(component).props.style.transform[0].translateX,
        ).toEqual(0);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
        fireEvent.press(elements.tvShowsButton(component));
        // transitioning
        waitFor(() => {
          expect(elements.indicator(component).props.style.opacity).toEqual(
            0.5,
          );
        });
        act(() => {
          timeTravel(SWITCH_ANIMATION_DURATION_MS);
        });
        // tv-show selected
        expect(
          elements.indicator(component).props.style.transform[0].translateX,
        ).toEqual(750);
        expect(elements.indicator(component).props.style.opacity).toEqual(1);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
      });

      it('should render the components correctly when the user transition from "TV Shows" to "Movies"', async () => {
        const component = render(renderMediaSwitcher());
        // default-state - "Movies" selected
        expect(elements.indicator(component).props.style.opacity).toEqual(1);
        expect(
          elements.indicator(component).props.style.transform[0].translateX,
        ).toEqual(0);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
        fireEvent.press(elements.tvShowsButton(component));
        // transitioning from "Movies" to "TV-Shows"
        waitFor(() => {
          expect(elements.indicator(component).props.style.opacity).toEqual(
            0.5,
          );
        });
        act(() => {
          timeTravel(SWITCH_ANIMATION_DURATION_MS);
        });
        // "TV-Shows" selected
        expect(
          elements.indicator(component).props.style.transform[0].translateX,
        ).toEqual(750);
        expect(elements.indicator(component).props.style.opacity).toEqual(1);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
        // transitioning from "TV-Shows" to "Movies"
        fireEvent.press(elements.moviesButton(component));
        waitFor(() => {
          expect(elements.indicator(component).props.style.opacity).toEqual(
            0.5,
          );
        });
        act(() => {
          timeTravel(SWITCH_ANIMATION_DURATION_MS);
        });
        // "Movies" selected
        expect(
          elements.indicator(component).props.style.transform[0].translateX,
        ).toEqual(0);
        expect(elements.indicator(component).props.style.opacity).toEqual(1);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
      });

      it('should render the components correctly when "Movies" is selected and the user press the "Movies" switch', () => {
        const component = render(renderMediaSwitcher());
        // default-state (movies-selected)
        expect(elements.indicator(component).props.style.opacity).toEqual(1);
        expect(
          elements.indicator(component).props.style.transform[0].translateX,
        ).toEqual(0);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
        // Trying to transition to "Movies"
        fireEvent.press(elements.moviesButton(component));
        act(() => {
          timeTravel(SWITCH_ANIMATION_DURATION_MS);
        });
        // Style-state is the same
        expect(elements.indicator(component).props.style.opacity).toEqual(1);
        expect(
          elements.indicator(component).props.style.transform[0].translateX,
        ).toEqual(0);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
      });

      it('should render the components correctly when "TV-Shows" is selected and the user press the "TV-Shows" switch', () => {
        const component = render(renderMediaSwitcher());
        // default-state - "Movies" selected
        expect(elements.indicator(component).props.style.opacity).toEqual(1);
        expect(
          elements.indicator(component).props.style.transform[0].translateX,
        ).toEqual(0);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
        // transitioning to "TV-Shows"
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(SWITCH_ANIMATION_DURATION_MS);
        });
        expect(elements.indicator(component).props.style.opacity).toEqual(1);
        expect(
          elements.indicator(component).props.style.transform[0].translateX,
        ).toEqual(750);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
        // Trying to transition to "TV Shows"
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(SWITCH_ANIMATION_DURATION_MS);
        });
        // Style-state is the same
        expect(elements.indicator(component).props.style.opacity).toEqual(1);
        expect(
          elements.indicator(component).props.style.transform[0].translateX,
        ).toEqual(750);
        expect(elements.moviesText(component).props.style[1].color).toEqual(
          theme.colors.text,
        );
        expect(elements.tvShowsText(component).props.style[1].color).toEqual(
          theme.colors.buttonText,
        );
      });
    });
  });

  describe('Pressing switch-items', () => {
    describe('When "isDisabled" is "true"', () => {
      it('should not call "onPressMovies" when the user press the "Movies" switch', () => {
        const onPressMovies = jest.fn();
        const component = render(
          renderMediaSwitcher(onPressMovies, undefined, true),
        );
        expect(onPressMovies).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.moviesButton(component));
        expect(onPressMovies).toHaveBeenCalledTimes(0);
      });

      it('should not call "onPressTVShows" when the user press the "TV Shows" switch', () => {
        const onPressTVShows = jest.fn();
        const component = render(
          renderMediaSwitcher(undefined, onPressTVShows, true),
        );
        expect(onPressTVShows).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.tvShowsButton(component));
        expect(onPressTVShows).toHaveBeenCalledTimes(0);
      });
    });

    describe('When "isDisabled" is "false"', () => {
      beforeEach(setupTimeTravel);

      afterEach(cleanup);

      it('should not call "onPressMovies" when the user press the "Movies"', () => {
        const onPressMovies = jest.fn();
        const component = render(renderMediaSwitcher(onPressMovies));
        expect(onPressMovies).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.moviesButton(component));
        expect(onPressMovies).toHaveBeenCalledTimes(0);
      });

      it('should call "onPressTVShows" when the user press the "TV Shows" switch', () => {
        const onPressTVShows = jest.fn();
        const component = render(
          renderMediaSwitcher(undefined, onPressTVShows),
        );
        expect(onPressTVShows).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(SWITCH_ANIMATION_DURATION_MS);
        });
        expect(onPressTVShows).toHaveBeenCalledTimes(1);
      });

      it('should call "onPressMovies" when "TV Shows" is selected and the user press the "Movies" switch', () => {
        const onPressMovies = jest.fn();
        const component = render(renderMediaSwitcher(onPressMovies));
        expect(onPressMovies).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(SWITCH_ANIMATION_DURATION_MS);
        });
        expect(onPressMovies).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.moviesButton(component));
        act(() => {
          timeTravel(SWITCH_ANIMATION_DURATION_MS);
        });
        expect(onPressMovies).toHaveBeenCalledTimes(1);
      });
    });
  });
});
