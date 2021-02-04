import React from 'react';
import { cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import theme from 'styles/theme';

import AutoMockProvider from '../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../__mocks__/MockedNavigator';
import TVShowSeasonsDetail, {
  EPISODES_ERROR_DESCRIPTION_I18N_REF,
  EPISODES_ERROR_SUGGESTION_I18N_REF,
  EPISODES_ERROR_TITLE_I18N_REF,
  EPISODES_SECTION_I18N_REF,
} from './TVShowSeasonsDetail';

const params = {
  season: 1,
  id: '123',
};

const getMockedTVShowSeason = (numberOfEpisodes: number) => ({
  seasonNumber: 1,
  posterPath: 'posterPath',
  overview: 'overview',
  id: 'season-id',
  episodes: Array(numberOfEpisodes)
    .fill({
      voteAverage: 1,
      stillPath: 'stillPath',
      voteCount: 1,
      overview: 'overview',
      airDate: '1994-02-21',
      name: 'name',
      __typename: 'TVShowSeasonEpisode',
    })
    .map((item, index) => ({
      ...item,
      id: `episode-${index}`,
    })),
  __typename: 'TVShowSeason',
});

const renderTVShowSeasonsDetail = (mockResolvers?: IMocks) => {
  const FamousScreen = () => (
    <TMDBImageQualityProvider>
      <ThemeProvider theme={theme}>
        <AutoMockProvider mockResolvers={mockResolvers}>
          <TVShowSeasonsDetail route={{ params }} />
        </AutoMockProvider>
      </ThemeProvider>
    </TMDBImageQualityProvider>
  );

  return <MockedNavigation component={FamousScreen} />;
};

describe('Testing <TVShowSeasonsDetail />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render the loading state when the screen is mounted', () => {
    const { getByTestId, queryByTestId } = render(renderTVShowSeasonsDetail());

    expect(getByTestId('loading-content-indicator')).not.toBeNull();

    expect(queryByTestId('advise-wrapper')).toBeNull();

    expect(queryByTestId('season-detail')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should render the content correctly', () => {
    const EPISODES_COUNT = 10;

    const mockResolvers = {
      TVShowSeason: () => getMockedTVShowSeason(EPISODES_COUNT),
    };

    const { getAllByTestId, queryByTestId, getByTestId, getByText } = render(
      renderTVShowSeasonsDetail(mockResolvers),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('loading-content-indicator')).toBeNull();

    expect(getByTestId('season-detail')).not.toBeNull();

    expect(getByTestId('season-detail').props.data.length).toEqual(EPISODES_COUNT);

    expect(getAllByTestId('episode-list-item').length).toEqual(EPISODES_COUNT);

    expect(getByTestId('header-wrapper')).not.toBeNull();

    expect(getByText(EPISODES_SECTION_I18N_REF)).not.toBeNull();
  });

  it('should render an advise when some error occurs', () => {
    const mockResolvers = {
      TVShowSeason: () => new Error(),
    };

    const { queryByTestId, getByTestId, getByText } = render(
      renderTVShowSeasonsDetail(mockResolvers),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('loading-content-indicator')).toBeNull();

    expect(queryByTestId('season-detail')).toBeNull();

    expect(getByTestId('advise-wrapper')).not.toBeNull();

    expect(getByText(EPISODES_ERROR_DESCRIPTION_I18N_REF)).not.toBeNull();

    expect(getByText(EPISODES_ERROR_SUGGESTION_I18N_REF)).not.toBeNull();

    expect(getByText(EPISODES_ERROR_TITLE_I18N_REF)).not.toBeNull();
  });
});
