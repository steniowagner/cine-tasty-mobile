import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import timeTravel, { setupTimeTravel } from '../../../../../../__mocks__/timeTravel';
import MediaSwitcher, { I18N_TV_SHOWS_KEY, I18N_MOVIES_KEY } from './MediaSwitcher';
import { ANIMATION_DURATION } from './useMediaSwitcher';

const PRIMARY_COLOR_RGBA = 'rgba(255, 215, 0, 1)';
const CONTRAST_COLOR_RGBA = 'rgba(77, 77, 77, 1)';
const TEXT_RGBA = 'rgba(255, 255, 255, 1)';
const BUTTON_TEXT_RGBA = 'rgba(38, 38, 38, 1)';

const renderMediaSwitcher = ({
  onSwitchToTVShows = jest.fn,
  onSwitchToMovies = jest.fn,
  isDisabled = false,
}) => (
  <ThemeProvider theme={theme}>
    <MediaSwitcher
      onSwitchToTVShows={onSwitchToTVShows}
      onSwitchToMovies={onSwitchToMovies}
      isDisabled={isDisabled}
    />
  </ThemeProvider>
);

describe('Testing <MediaSwitcher />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly on the first render', () => {
    const { getByTestId, getByText } = render(renderMediaSwitcher({}));

    expect(getByText(I18N_TV_SHOWS_KEY)).not.toBeNull();

    expect(getByText(I18N_MOVIES_KEY)).not.toBeNull();

    expect(
      getByTestId('media-switcher-movies-button').props.style.backgroundColor,
    ).toEqual(PRIMARY_COLOR_RGBA);

    expect(getByTestId('media-switcher-movies-text').props.style.color).toEqual(
      BUTTON_TEXT_RGBA,
    );

    expect(
      getByTestId('media-switcher-tv-shows-button').props.style.backgroundColor,
    ).toEqual(CONTRAST_COLOR_RGBA);

    expect(getByTestId('media-switcher-tv-shows-text').props.style.color).toEqual(
      TEXT_RGBA,
    );
  });

  it('should switch the selection from the "movies" to "tv-shows when the "tv-shows" button is pressed', () => {
    const onSwitchToTVShows = jest.fn();
    const { getByTestId } = render(renderMediaSwitcher({ onSwitchToTVShows }));

    expect(
      getByTestId('media-switcher-movies-button').props.style.backgroundColor,
    ).toEqual(PRIMARY_COLOR_RGBA);

    expect(getByTestId('media-switcher-movies-text').props.style.color).toEqual(
      BUTTON_TEXT_RGBA,
    );

    expect(
      getByTestId('media-switcher-tv-shows-button').props.style.backgroundColor,
    ).toEqual(CONTRAST_COLOR_RGBA);

    expect(getByTestId('media-switcher-tv-shows-text').props.style.color).toEqual(
      TEXT_RGBA,
    );

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(ANIMATION_DURATION);
    });

    expect(
      getByTestId('media-switcher-movies-button').props.style.backgroundColor,
    ).toEqual(CONTRAST_COLOR_RGBA);

    expect(getByTestId('media-switcher-movies-text').props.style.color).toEqual(
      TEXT_RGBA,
    );

    expect(
      getByTestId('media-switcher-tv-shows-button').props.style.backgroundColor,
    ).toEqual(PRIMARY_COLOR_RGBA);

    expect(getByTestId('media-switcher-tv-shows-text').props.style.color).toEqual(
      BUTTON_TEXT_RGBA,
    );
  });

  it('should switch the selection from the "movies" to "tv-shows" and then back to "movies" again when the user press on the "tv-shows" button and then press "movies" button', () => {
    const { getByTestId } = render(renderMediaSwitcher({}));

    expect(
      getByTestId('media-switcher-movies-button').props.style.backgroundColor,
    ).toEqual(PRIMARY_COLOR_RGBA);

    expect(getByTestId('media-switcher-movies-text').props.style.color).toEqual(
      BUTTON_TEXT_RGBA,
    );

    expect(
      getByTestId('media-switcher-tv-shows-button').props.style.backgroundColor,
    ).toEqual(CONTRAST_COLOR_RGBA);

    expect(getByTestId('media-switcher-tv-shows-text').props.style.color).toEqual(
      TEXT_RGBA,
    );

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(ANIMATION_DURATION);
    });

    expect(
      getByTestId('media-switcher-movies-button').props.style.backgroundColor,
    ).toEqual(CONTRAST_COLOR_RGBA);

    expect(getByTestId('media-switcher-movies-text').props.style.color).toEqual(
      TEXT_RGBA,
    );

    expect(
      getByTestId('media-switcher-tv-shows-button').props.style.backgroundColor,
    ).toEqual(PRIMARY_COLOR_RGBA);

    expect(getByTestId('media-switcher-tv-shows-text').props.style.color).toEqual(
      BUTTON_TEXT_RGBA,
    );

    fireEvent.press(getByTestId('media-switcher-movies-button'));

    act(() => {
      timeTravel(ANIMATION_DURATION);
    });

    expect(
      getByTestId('media-switcher-movies-button').props.style.backgroundColor,
    ).toEqual(PRIMARY_COLOR_RGBA);

    expect(getByTestId('media-switcher-movies-text').props.style.color).toEqual(
      BUTTON_TEXT_RGBA,
    );

    expect(
      getByTestId('media-switcher-tv-shows-button').props.style.backgroundColor,
    ).toEqual(CONTRAST_COLOR_RGBA);

    expect(getByTestId('media-switcher-tv-shows-text').props.style.color).toEqual(
      TEXT_RGBA,
    );
  });

  it('should not change the selection-state when the current selection is "movies" and the movies button is pressed', () => {
    const onSwitchToMovies = jest.fn();

    const { getByTestId } = render(renderMediaSwitcher({ onSwitchToMovies }));

    expect(
      getByTestId('media-switcher-movies-button').props.style.backgroundColor,
    ).toEqual(PRIMARY_COLOR_RGBA);

    expect(getByTestId('media-switcher-movies-text').props.style.color).toEqual(
      BUTTON_TEXT_RGBA,
    );

    expect(
      getByTestId('media-switcher-tv-shows-button').props.style.backgroundColor,
    ).toEqual(CONTRAST_COLOR_RGBA);

    expect(getByTestId('media-switcher-tv-shows-text').props.style.color).toEqual(
      TEXT_RGBA,
    );

    fireEvent.press(getByTestId('media-switcher-movies-button'));

    act(() => {
      timeTravel(ANIMATION_DURATION);
    });

    expect(
      getByTestId('media-switcher-movies-button').props.style.backgroundColor,
    ).toEqual(PRIMARY_COLOR_RGBA);

    expect(getByTestId('media-switcher-movies-text').props.style.color).toEqual(
      BUTTON_TEXT_RGBA,
    );

    expect(
      getByTestId('media-switcher-tv-shows-button').props.style.backgroundColor,
    ).toEqual(CONTRAST_COLOR_RGBA);

    expect(getByTestId('media-switcher-tv-shows-text').props.style.color).toEqual(
      TEXT_RGBA,
    );

    expect(onSwitchToMovies).toHaveBeenCalledTimes(0);
  });

  it('should not change the selection-state when the current selection is "tv-shows" and the tv-shows button is pressed', () => {
    const onSwitchToTVShows = jest.fn();

    const { getByTestId } = render(renderMediaSwitcher({ onSwitchToTVShows }));

    expect(
      getByTestId('media-switcher-movies-button').props.style.backgroundColor,
    ).toEqual(PRIMARY_COLOR_RGBA);

    expect(getByTestId('media-switcher-movies-text').props.style.color).toEqual(
      BUTTON_TEXT_RGBA,
    );

    expect(
      getByTestId('media-switcher-tv-shows-button').props.style.backgroundColor,
    ).toEqual(CONTRAST_COLOR_RGBA);

    expect(getByTestId('media-switcher-tv-shows-text').props.style.color).toEqual(
      TEXT_RGBA,
    );

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(ANIMATION_DURATION);
    });

    expect(
      getByTestId('media-switcher-movies-button').props.style.backgroundColor,
    ).toEqual(CONTRAST_COLOR_RGBA);

    expect(getByTestId('media-switcher-movies-text').props.style.color).toEqual(
      TEXT_RGBA,
    );

    expect(
      getByTestId('media-switcher-tv-shows-button').props.style.backgroundColor,
    ).toEqual(PRIMARY_COLOR_RGBA);

    expect(getByTestId('media-switcher-tv-shows-text').props.style.color).toEqual(
      BUTTON_TEXT_RGBA,
    );

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(ANIMATION_DURATION);
    });

    expect(
      getByTestId('media-switcher-movies-button').props.style.backgroundColor,
    ).toEqual(CONTRAST_COLOR_RGBA);

    expect(getByTestId('media-switcher-movies-text').props.style.color).toEqual(
      TEXT_RGBA,
    );

    expect(
      getByTestId('media-switcher-tv-shows-button').props.style.backgroundColor,
    ).toEqual(PRIMARY_COLOR_RGBA);

    expect(getByTestId('media-switcher-tv-shows-text').props.style.color).toEqual(
      BUTTON_TEXT_RGBA,
    );

    expect(onSwitchToTVShows).toHaveBeenCalledTimes(1);
  });

  it('should call the "onSwitchToTVShows" when the user press the "tv-shows" button', () => {
    const onSwitchToTVShows = jest.fn();

    const { getByTestId } = render(renderMediaSwitcher({ onSwitchToTVShows }));

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(ANIMATION_DURATION + 1);
    });

    expect(onSwitchToTVShows).toHaveBeenCalledTimes(1);

    expect(onSwitchToTVShows).toHaveBeenCalledWith();
  });

  it('should call the "onSwitchToMovies" when the user press the "movies" button when the seleted-button is "tv-shows" button', () => {
    const onSwitchToMovies = jest.fn();

    const { getByTestId } = render(renderMediaSwitcher({ onSwitchToMovies }));

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(ANIMATION_DURATION + 1);
    });

    fireEvent.press(getByTestId('media-switcher-movies-button'));

    act(() => {
      timeTravel(ANIMATION_DURATION + 1);
    });

    expect(onSwitchToMovies).toHaveBeenCalledTimes(1);

    expect(onSwitchToMovies).toHaveBeenCalledWith();
  });

  it('should not call the "onSwitchToTVShows" when the user press the "tv-shows" button and the "isDisabled" is "true"', () => {
    const onSwitchToTVShows = jest.fn();

    const { getByTestId } = render(
      renderMediaSwitcher({ onSwitchToTVShows, isDisabled: true }),
    );

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(ANIMATION_DURATION + 1);
    });

    expect(onSwitchToTVShows).toHaveBeenCalledTimes(0);
  });

  it('should not call the "onSwitchToMovies" when the user press the "movies" button and the "isDisabled" is "true"', () => {
    const onSwitchToMovies = jest.fn();

    const { getByTestId } = render(
      renderMediaSwitcher({ onSwitchToMovies, isDisabled: true }),
    );

    fireEvent.press(getByTestId('media-switcher-movies-button'));

    act(() => {
      timeTravel(ANIMATION_DURATION + 1);
    });

    expect(onSwitchToMovies).toHaveBeenCalledTimes(0);
  });

  it('should render the component with a lower opacity when the "isDisabled" is "true"', () => {
    const { getByTestId } = render(renderMediaSwitcher({ isDisabled: true }));

    expect(getByTestId('media-switcher-wrapper').props.isDisabled).toEqual(true);
  });
});
