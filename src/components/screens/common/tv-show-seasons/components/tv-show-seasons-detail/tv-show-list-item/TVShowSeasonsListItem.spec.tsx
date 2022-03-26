import React from 'react';
import {fireEvent, cleanup, render, act} from '@testing-library/react-native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {ThemeContextProvider} from '@providers';
import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';
import metrics from '@styles/metrics';

import TVShowSeasonsListItem from './TVShowSeasonsListItem';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');

  return {
    ...actualNavigation,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const episodeMock: SchemaTypes.TVShowSeasonsDetail_tvShowSeason_episodes = {
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
  episode: SchemaTypes.TVShowSeasonsDetail_tvShowSeason_episodes = episodeMock,
) => (
  <TMDBImageQualityProvider>
    <ThemeContextProvider>
      <TVShowSeasonsListItem episode={episode} index={index} />
    </ThemeContextProvider>
  </TMDBImageQualityProvider>
);

describe('Testing <TVShowSeasonsListItem />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render the correctly', () => {
    const INDEX = 1;

    const {getByTestId} = render(renderTVShowSeasonsListItem(INDEX));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('episode-list-item')).not.toBeNull();

    expect(getByTestId('episode-index-text').children[0]).toEqual(
      `${INDEX + 1}`,
    );

    expect(getByTestId('episode-name-text').children[0]).toEqual(
      episodeMock.name,
    );
  });

  it('should navigate to the episode-details-modal correctly when the user press on the list-item', () => {
    const {getByTestId} = render(renderTVShowSeasonsListItem());

    act(() => {
      jest.runAllTimers();
    });

    expect(mockedNavigate).toHaveBeenCalledTimes(0);

    fireEvent.press(getByTestId('episode-list-item'));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);

    expect(mockedNavigate.mock.calls[0][0]).toEqual(
      Routes.CustomModal.CUSTOM_MODAL_STACK,
    );

    expect(mockedNavigate.mock.calls[0][1].type).toEqual(
      Types.CustomizedModalChildrenType.TV_SHOW_EPISODE_DETAILS,
    );

    expect(mockedNavigate.mock.calls[0][1].modalHeight).toEqual(
      metrics.getHeightFromDP('50%'),
    );

    expect(mockedNavigate.mock.calls[0][1].extraData.dataset).toEqual([
      episodeMock,
    ]);
  });
});
