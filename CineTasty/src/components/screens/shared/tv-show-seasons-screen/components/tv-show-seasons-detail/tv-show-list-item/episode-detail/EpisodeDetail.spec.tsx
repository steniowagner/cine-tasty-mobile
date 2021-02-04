import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import { TVShowSeasonsDetail_tvShowSeason_episodes as Episode } from 'types/schema';
import theme from 'styles/theme';

import EpisodeDetail from './EpisodeDetail';

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

const renderEpisodeDetail = (episode: Episode = episodeMock) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <EpisodeDetail episode={episode} />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('Testing <EpisodeDetail />', () => {
  afterEach(cleanup);

  it('should render the episode-detail-image correctly when the "stillPath" is provided', () => {
    const { queryByTestId, getByTestId } = render(renderEpisodeDetail());

    expect(getByTestId('episode-image')).not.toBeNull();

    expect(queryByTestId('episode-image-fallback')).toBeNull();
  });

  it('should render the episode-detail-image correctly when the "stillPath" is not provided', () => {
    const { queryByTestId, getByTestId } = render(
      renderEpisodeDetail({
        ...episodeMock,
        stillPath: undefined,
      }),
    );

    expect(getByTestId('episode-image-fallback')).not.toBeNull();

    expect(queryByTestId('episode-image')).toBeNull();
  });
});
