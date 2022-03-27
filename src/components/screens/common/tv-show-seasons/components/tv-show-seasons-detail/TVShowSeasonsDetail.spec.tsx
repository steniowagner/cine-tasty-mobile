import React from 'react';
import { cleanup, render, act } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import AutoMockProvider from '@mocks/AutoMockedProvider';
import { getMockedTVShowSeason } from '@mocks/fixtures';
import MockedNavigation from '@mocks/MockedNavigator';
import { navigation } from '@mocks/navigationMock';
import { ThemeContextProvider } from '@providers';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import TVShowSeasonsDetail from './TVShowSeasonsDetail';

const renderTVShowSeasonsDetail = (mockResolvers?: IMocks) => {
  const FamousScreen = () => (
    <TMDBImageQualityProvider>
      <ThemeContextProvider>
        <AutoMockProvider mockResolvers={mockResolvers}>
          <TVShowSeasonsDetail
            route={{
              key: `${Routes.TVShow.SEASONS_TABS}-key`,
              name: Routes.TVShow.SEASONS_TABS,
              params: {
                tvShowTitle: 'tvshowtitle',
                season: 1,
                id: '1',
              },
            }}
            navigation={navigation}
          />
        </AutoMockProvider>
      </ThemeContextProvider>
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

    expect(
      getByText(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_EPISODE),
    ).not.toBeNull();
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

    expect(
      getByText(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_ERRORS_DESCRIPTION),
    ).not.toBeNull();

    expect(
      getByText(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_ERRORS_SUGGESTION),
    ).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_ERRORS_TITLE)).not.toBeNull();
  });
});