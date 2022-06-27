import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import {randomPositiveNumber, randomArrayIndex} from '@mocks/utils';
import {castTVShows} from '@mocks/fixtures/tv-shows';
import {TMDBImageQualityProvider} from '@providers';
import {dark as theme} from '@styles/themes/dark';
import {Routes} from '@routes/routes';

import {MediaHorizontalList} from './MediaHorizontalList';
import {
  UseMediaHorizontalListProps,
  MediaHorizontalItem,
} from './useMediaHorizontalList';

const SECTION_TITLE = 'SECTION_TITLE';
const mockNavigation = {
  push: jest.fn(),
};
const castMovies = (size: number) =>
  Array(size)
    .fill({})
    .map((_, index) => ({
      __typename: 'CastMovie',
      profilePath: `POSTER_PATH_${index}`,
      character: `CHARACTER_${index}`,
      id: index,
      voteAverage: index + 1,
      voteCount: index + 1,
      title: `TITLE_${index}`,
    }));

jest.mock('@react-navigation/native', () => {
  const actualReactNavigationNative = jest.requireActual(
    '@react-navigation/native',
  );
  return {
    ...actualReactNavigationNative,
    useNavigation: () => mockNavigation,
  };
});

const renderMediaHorizontalList = (
  props: UseMediaHorizontalListProps & {
    title: string;
  },
) => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualityProvider>
      <MediaHorizontalList {...props} />
    </TMDBImageQualityProvider>
  </ThemeProvider>
);

describe('<MediaHorizontalList />', () => {
  const elements = {
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    moviesList: (api: RenderAPI) =>
      api.queryByTestId('media-horizontal-list-MOVIE'),
    tvShowsList: (api: RenderAPI) =>
      api.queryByTestId('media-horizontal-list-TV_SHOW'),
    listItems: (api: RenderAPI) =>
      api.queryAllByTestId('simplified-media-list-button'),
  };

  describe('Movies List', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('Renders correctly', () => {
      it('should render correctly when it has some movies to show', async () => {
        const numberOfItems = randomPositiveNumber(10, 1);
        const component = render(
          renderMediaHorizontalList({
            dataset: castMovies(numberOfItems) as MediaHorizontalItem[],
            title: SECTION_TITLE,
            type: 'MOVIE',
          }),
        );
        expect(elements.sectionTitle(component).children[0]).toEqual(
          SECTION_TITLE,
        );
        expect(elements.moviesList(component)).not.toBeNull();
        expect(elements.tvShowsList(component)).toBeNull();
        expect(elements.listItems(component).length).toBeGreaterThan(0);
        await waitFor(() => {});
      });

      it('should render correctly when doesnt have movies to show', async () => {
        const component = render(
          renderMediaHorizontalList({
            dataset: [],
            title: SECTION_TITLE,
            type: 'MOVIE',
          }),
        );
        expect(elements.sectionTitle(component).children[0]).toEqual(
          SECTION_TITLE,
        );
        expect(elements.moviesList(component)).not.toBeNull();
        expect(elements.tvShowsList(component)).toBeNull();
        expect(elements.listItems(component).length).toEqual(0);
        await waitFor(() => {});
      });
    });

    describe('Touch-press correctly', () => {
      it('should call navigate to the correct screen when the user press on of the list-items', async () => {
        const numberOfItems = randomPositiveNumber(10, 1);
        const dataset = castMovies(numberOfItems) as MediaHorizontalItem[];
        const itemSelected = randomArrayIndex(dataset);
        const component = render(
          renderMediaHorizontalList({
            title: SECTION_TITLE,
            type: 'MOVIE',
            dataset,
          }),
        );
        expect(mockNavigation.push).toBeCalledTimes(0);
        fireEvent.press(elements.listItems(component)[itemSelected]);
        expect(mockNavigation.push).toBeCalledTimes(1);
        expect(mockNavigation.push).toBeCalledWith(Routes.Movie.DETAILS, {
          voteAverage: dataset[itemSelected].voteAverage,
          posterPath: dataset[itemSelected].posterPath,
          voteCount: dataset[itemSelected].voteCount,
          title: dataset[itemSelected].title,
          id: dataset[itemSelected].id,
        });
        await waitFor(() => {});
      });
    });
  });

  describe('Tv-Shows List', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('Renders correctly', () => {
      it('should render correctly when it has some tv-shows to show', async () => {
        const numberOfItems = randomPositiveNumber(10, 1);
        const component = render(
          renderMediaHorizontalList({
            dataset: castTVShows(numberOfItems) as MediaHorizontalItem[],
            title: SECTION_TITLE,
            type: 'TV_SHOW',
          }),
        );
        expect(elements.sectionTitle(component).children[0]).toEqual(
          SECTION_TITLE,
        );
        expect(elements.moviesList(component)).toBeNull();
        expect(elements.tvShowsList(component)).not.toBeNull();
        expect(elements.listItems(component).length).toBeGreaterThan(0);
        await waitFor(() => {});
      });

      it('should render correctly when doesnt have tv-shows to show', async () => {
        const component = render(
          renderMediaHorizontalList({
            dataset: [],
            title: SECTION_TITLE,
            type: 'TV_SHOW',
          }),
        );
        expect(elements.sectionTitle(component).children[0]).toEqual(
          SECTION_TITLE,
        );
        expect(elements.moviesList(component)).toBeNull();
        expect(elements.tvShowsList(component)).not.toBeNull();
        expect(elements.listItems(component).length).toEqual(0);
        await waitFor(() => {});
      });
    });

    describe('Touch-press correctly', () => {
      it('should call navigate to the correct screen when the user press on of the list-items', async () => {
        const numberOfItems = randomPositiveNumber(10, 1);
        const dataset = castTVShows(numberOfItems) as MediaHorizontalItem[];
        const itemSelected = randomArrayIndex(dataset);
        const component = render(
          renderMediaHorizontalList({
            title: SECTION_TITLE,
            type: 'TV_SHOW',
            dataset,
          }),
        );
        expect(mockNavigation.push).toBeCalledTimes(0);
        fireEvent.press(elements.listItems(component)[itemSelected]);
        expect(mockNavigation.push).toBeCalledTimes(1);
        expect(mockNavigation.push).toBeCalledWith(Routes.TVShow.DETAILS, {
          voteAverage: dataset[itemSelected].voteAverage,
          posterPath: dataset[itemSelected].posterPath,
          voteCount: dataset[itemSelected].voteCount,
          title: dataset[itemSelected].name,
          id: dataset[itemSelected].id,
        });
        await waitFor(() => {});
      });
    });
  });
});
