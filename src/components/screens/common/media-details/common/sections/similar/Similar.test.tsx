jest.unmock('react-native-reanimated');
import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {
  TVShowDetail_tvShow_similar,
  MovieDetail_movie_similar,
} from '@schema-types';
import {TMDBImageQualitiesProvider} from '@providers';
import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {Similar as SimilarType} from './useSimilar';
import {Similar} from './Similar';

const makeSimilarTVShows = (length: number) =>
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

const makeSimilarMovies = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      __typename: 'BaseMovie',
      voteAverage: index,
      posterPath: `POSTER_PATH_${index}`,
      voteCount: index,
      title: `TITLE_${index}`,
      id: index,
    })) as MovieDetail_movie_similar[];

const renderSimilar = (similar: SimilarType[], onPressItem = jest.fn()) => (
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={theme}>
      <Similar similar={similar} onPressItem={onPressItem} />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
);

describe('<Similar />', () => {
  const elements = {
    sectionWrapper: (api: RenderAPI) => api.queryByTestId('section-wrapper'),
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    similarList: (api: RenderAPI) => api.queryByTestId('similar-list'),
    similarItems: (api: RenderAPI) =>
      api.queryAllByTestId('simplified-media-list-button'),
  };

  describe('When the "media" is "tv-show"', () => {
    describe('Renders correctly', () => {
      afterEach(cleanup);

      it('should render correclty when it has some data to show', async () => {
        const length = randomPositiveNumber(10, 1);
        const component = render(renderSimilar(makeSimilarTVShows(length)));
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
        const component = render(renderSimilar(makeSimilarTVShows(length)));
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
        const similar = makeSimilarTVShows(length);
        const component = render(renderSimilar(similar, onPressItem));
        expect(onPressItem).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.similarItems(component)[indexSelectedItem]);
        expect(onPressItem).toHaveBeenCalledTimes(1);
        expect(onPressItem).toHaveBeenCalledWith({
          __typename: similar[indexSelectedItem].__typename,
          voteAverage: similar[indexSelectedItem].voteAverage,
          posterPath: similar[indexSelectedItem].posterPath,
          voteCount: similar[indexSelectedItem].voteCount,
          id: similar[indexSelectedItem].id,
          title: similar[indexSelectedItem].name,
        });
        await waitFor(() => {});
      });
    });
  });

  describe('When the "media" is "movies', () => {
    describe('Renders correctly', () => {
      afterEach(cleanup);

      it('should render correclty when it has some data to show', async () => {
        const length = randomPositiveNumber(10, 1);
        const component = render(renderSimilar(makeSimilarMovies(length)));
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
        const component = render(renderSimilar(makeSimilarMovies(length)));
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
        const similar = makeSimilarMovies(length);
        const component = render(renderSimilar(similar, onPressItem));
        expect(onPressItem).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.similarItems(component)[indexSelectedItem]);
        expect(onPressItem).toHaveBeenCalledTimes(1);
        expect(onPressItem).toHaveBeenCalledWith(similar[indexSelectedItem]);
        await waitFor(() => {});
      });
    });
  });
});
