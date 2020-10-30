import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { TVShowSeasonsDetail_tvShowSeason_episodes as Episode } from 'types/schema';
import { dark } from 'styles/themes';

import { AIR_DATE_I18N_REF } from './episode-detail/EpisodeDetail';
import TVShowSeasonsListItem from './TVShowSeasonsListItem';

const episodeMock: Episode = {
  __typename: 'TVShowSeasonEpisode',
  stillPath: 'stillPath',
  voteAverage: 1,
  voteCount: 1,
  airDate: '02-21-1994',
  id: 'id',
  name: 'name',
  overview: 'overview',
};

const renderTVShowSeasonsListItem = (
  index: number = 0,
  episode: Episode = episodeMock,
) => (
  <ThemeProvider theme={dark}>
    <TVShowSeasonsListItem episode={episode} index={index} />
  </ThemeProvider>
);

describe('Testing <TVShowSeasonsListItem />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render the correctly', () => {
    const INDEX = 1;

    const { getByTestId } = render(renderTVShowSeasonsListItem(INDEX));

    expect(getByTestId('episode-list-item')).not.toBeNull();

    expect(getByTestId('episode-index-text').children[0]).toEqual(`${INDEX + 1}`);

    expect(getByTestId('episode-name-text').children[0]).toEqual(episodeMock.name);
  });

  it('should show the episode-details-modal correctly when the user press on the list-item', () => {
    const { getByTestId } = render(renderTVShowSeasonsListItem());

    fireEvent.press(getByTestId('episode-list-item'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('modal-wrapper')).not.toBeNull();

    expect(getByTestId('episode-title-text').children[0]).toEqual(episodeMock.name);

    expect(getByTestId('air-date-text').children[0]).toEqual(
      `${AIR_DATE_I18N_REF} ${episodeMock.airDate}`,
    );

    expect(getByTestId('overview-text').children[0]).toEqual(episodeMock.overview);
  });

  it('should close the modal when press the close-modal-button', () => {
    const { queryByTestId, getByTestId } = render(renderTVShowSeasonsListItem());

    fireEvent.press(getByTestId('episode-list-item'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('modal-wrapper')).not.toBeNull();

    fireEvent.press(getByTestId('close-modal-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('modal-wrapper')).toBeNull();
  });
});
