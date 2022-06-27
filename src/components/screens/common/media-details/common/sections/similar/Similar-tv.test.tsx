import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TVShowDetail_tvShow_similar} from '@schema-types';
import {TMDBImageQualityProvider} from '@providers';
import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {Similar} from './Similar';

export const similarTVShows = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      __typename: 'BaseTVShow',
      voteAverage: index,
      posterPath: `POSTER_PATH_${index}`,
      voteCount: index,
      name: `NAME_${index}`,
      id: index,
    })) as TVShowDetail_tvShow_similar[];

const renderSimilar = (
  similar: TVShowDetail_tvShow_similar[],
  onPressItem = jest.fn(),
) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <Similar similar={similar} onPressItem={onPressItem} />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<Similar /> - [TV]', () => {
  const elements = {
    sectionWrapper: (api: RenderAPI) => api.queryByTestId('section-wrapper'),
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    similarList: (api: RenderAPI) => api.queryByTestId('similar-list'),
    similarItems: (api: RenderAPI) =>
      api.queryAllByTestId('simplified-media-list-button'),
  };

  describe('Renders correctly', () => {
    afterEach(cleanup);

    it('should render correclty when it has some data to show', async () => {
      const length = randomPositiveNumber(10, 1);
      const component = render(renderSimilar(similarTVShows(length)));
      expect(elements.similarList(component)).not.toBeNull();
      expect(elements.sectionWrapper(component)).not.toBeNull();
      expect(elements.similarItems(component).length).toEqual(length);
      await waitFor(() => {});
    });

    it('should render correclty when it has no data to show', async () => {
      const component = render(renderSimilar([]));
      expect(elements.similarList(component)).not.toBeNull();
      expect(elements.sectionWrapper(component)).not.toBeNull();
      expect(elements.similarItems(component).length).toEqual(0);
      await waitFor(() => {});
    });
  });

  describe('Section Title', () => {
    afterEach(cleanup);

    it('should render the "section-title" correctly when it has some data to show', async () => {
      const length = randomPositiveNumber(10, 1);
      const component = render(renderSimilar(similarTVShows(length)));
      expect(elements.sectionTitle(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_SIMILAR,
      );
      await waitFor(() => {});
    });

    it('should render the "section-title" correctly when it has no data to show', async () => {
      const component = render(renderSimilar([]));
      expect(elements.sectionTitle(component).children[0]).toEqual(
        `${Translations.Tags.MEDIA_DETAIL_SECTIONS_SIMILAR} (0)`,
      );
      await waitFor(() => {});
    });
  });

  describe('Pressing the items', () => {
    afterEach(cleanup);

    it('should call "onPressItem" correctly when the user press smoe "similar-item"', async () => {
      const onPressItem = jest.fn();
      const length = randomPositiveNumber(10, 1);
      const indexSelectedItem = randomPositiveNumber(length - 1, 0);
      const similar = similarTVShows(length);
      const component = render(renderSimilar(similar, onPressItem));
      expect(onPressItem).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.similarItems(component)[indexSelectedItem]);
      expect(onPressItem).toHaveBeenCalledTimes(1);
      expect(onPressItem).toHaveBeenCalledWith(similar[indexSelectedItem]);
      await waitFor(() => {});
    });
  });
});
