import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import MediaSwitcher, { I18N_TV_SHOWS_KEY, I18N_MOVIES_KEY } from './MediaSwitcher';

const renderMediaSwitcher = ({
  onSwitchToTVShows = jest.fn,
  onSwitchToMovies = jest.fn,
  isDisabled = false,
}) => (
  <ThemeProvider theme={dark}>
    <MediaSwitcher
      onSwitchToTVShows={onSwitchToTVShows}
      onSwitchToMovies={onSwitchToMovies}
      isDisabled={isDisabled}
    />
  </ThemeProvider>
);

describe('Testing <MediaSwitcher />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render correctly on the first render', () => {
    const { getByTestId, getByText } = render(renderMediaSwitcher({}));

    expect(getByText(I18N_TV_SHOWS_KEY)).not.toBeNull();

    expect(getByText(I18N_MOVIES_KEY)).not.toBeNull();

    expect(getByTestId('media-switcher-movies-text').props.isSelected).toEqual(true);

    expect(getByTestId('media-switcher-tv-shows-text').props.isSelected).toEqual(false);

    expect(getByTestId('media-switcher-wrapper').props.isDisabled).toEqual(false);
  });

  it('should render movies "selected" and the tv-shows "unselected" on the first render', () => {
    const { getByTestId } = render(renderMediaSwitcher({}));

    expect(getByTestId('media-switcher-movies-text').props.isSelected).toEqual(true);

    expect(getByTestId('media-switcher-tv-shows-text').props.isSelected).toEqual(false);
  });

  it('should switch the selection from the "movies" to "tv-shows"', () => {
    const { getByTestId } = render(renderMediaSwitcher({}));

    expect(getByTestId('media-switcher-movies-text').props.isSelected).toEqual(true);

    expect(getByTestId('media-switcher-tv-shows-text').props.isSelected).toEqual(false);

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('media-switcher-movies-text').props.isSelected).toEqual(false);

    expect(getByTestId('media-switcher-tv-shows-text').props.isSelected).toEqual(true);
  });

  it('should switch the selection from the "movies" to "tv-shows" and to "movies" again', () => {
    const { getByTestId } = render(renderMediaSwitcher({}));

    expect(getByTestId('media-switcher-movies-text').props.isSelected).toEqual(true);

    expect(getByTestId('media-switcher-tv-shows-text').props.isSelected).toEqual(false);

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('media-switcher-movies-text').props.isSelected).toEqual(false);

    expect(getByTestId('media-switcher-tv-shows-text').props.isSelected).toEqual(true);

    fireEvent.press(getByTestId('media-switcher-movies-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('media-switcher-movies-text').props.isSelected).toEqual(true);

    expect(getByTestId('media-switcher-tv-shows-text').props.isSelected).toEqual(false);
  });

  it('should not change the selection-state when the current selection is "movies" and the movies button is pressed', () => {
    const { getByTestId } = render(renderMediaSwitcher({}));

    expect(getByTestId('media-switcher-movies-text').props.isSelected).toEqual(true);

    expect(getByTestId('media-switcher-tv-shows-text').props.isSelected).toEqual(false);

    fireEvent.press(getByTestId('media-switcher-movies-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('media-switcher-movies-text').props.isSelected).toEqual(true);

    expect(getByTestId('media-switcher-tv-shows-text').props.isSelected).toEqual(false);
  });

  it('should not change the selection-state when the current selection is "tv-shows" and the tv-shows button is pressed', () => {
    const { getByTestId } = render(renderMediaSwitcher({}));

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('media-switcher-tv-shows-text').props.isSelected).toEqual(true);

    expect(getByTestId('media-switcher-movies-text').props.isSelected).toEqual(false);

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('media-switcher-tv-shows-text').props.isSelected).toEqual(true);

    expect(getByTestId('media-switcher-movies-text').props.isSelected).toEqual(false);
  });

  it('should call the "onSwitchToTVShows" when the user press the "tv-shows" button', () => {
    const onSwitchToTVShows = jest.fn();

    const { getByTestId } = render(renderMediaSwitcher({ onSwitchToTVShows }));

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    expect(onSwitchToTVShows).toHaveBeenCalledTimes(1);

    expect(onSwitchToTVShows).toHaveBeenCalledWith();
  });

  it('should call the "onSwitchToMovies" when the user press the "movies" button', () => {
    const onSwitchToMovies = jest.fn();

    const { getByTestId } = render(renderMediaSwitcher({ onSwitchToMovies }));

    fireEvent.press(getByTestId('media-switcher-movies-button'));

    expect(onSwitchToMovies).toHaveBeenCalledTimes(1);

    expect(onSwitchToMovies).toHaveBeenCalledWith();
  });

  it('should render the component with a lower opacity when the "isDisabled" is "true"', () => {
    const { getByTestId } = render(renderMediaSwitcher({ isDisabled: true }));

    expect(getByTestId('media-switcher-wrapper').props.isDisabled).toEqual(true);
  });
});
