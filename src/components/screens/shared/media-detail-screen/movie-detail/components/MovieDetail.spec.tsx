import React from 'react';
import { TouchableOpacity } from 'react-native';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import * as TRANSLATIONS from '@i18n/tags';
import theme from '@styles/theme';

import AutoMockProvider from '../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../__mocks__/MockedNavigator';
import { setupTimeTravel } from '../../../../../../../__mocks__/timeTravel';

import { NUMBER_ITEMS } from '../../common/sections/tags/Tags';
import MovieDetail from './MovieDetail';

const baseParams = {
  posterPath: 'posterPath',
  title: 'title',
  id: 123,
};

const cast = [
  {
    voteAverage: 79.24046692747518,
    posterPath: 'Hello World',
    voteCount: -50.84916555615129,
    name: 'Hello World',
    id: '1',
    __typename: 'CastItem',
  },
  {
    voteAverage: 92.31814886121063,
    posterPath: 'Hello World',
    voteCount: 1.4805898520850604,
    name: 'Hello World',
    id: '2',
    __typename: 'CastItem',
  },
];

const crew = [
  {
    voteAverage: 79.24046692747518,
    posterPath: 'Hello World',
    voteCount: -50.84916555615129,
    name: 'Hello World',
    id: '1',
    __typename: 'CrewItem',
  },
  {
    voteAverage: 92.31814886121063,
    posterPath: 'Hello World',
    voteCount: 1.4805898520850604,
    name: 'Hello World',
    id: '2',
    __typename: 'CrewItem',
  },
];

const similar = [
  {
    __typename: 'BaseMovie',
    voteAverage: 1.0,
    posterPath: 'posterPath',
    voteCount: 2,
    genreIds: ['genre01'],
    title: 'title',
    id: 1,
  },
  {
    __typename: 'BaseMovie',
    voteAverage: 1.0,
    posterPath: 'posterPath',
    voteCount: 2,
    genreIds: ['genre01'],
    title: 'title',
    id: 2,
  },
];

const reviews = [
  {
    __typename: 'Review',
    author: 'author01',
    content: 'content01',
    id: 'review01',
  },
  {
    __typename: 'Review',
    author: 'author02',
    content: 'content02',
    id: 'review02',
  },
];

const getNavigation = (push = () => {}, navigate = () => {}) => ({
  setOptions: () => ({
    // eslint-disable-next-line react/display-name
    headerRight: () => <TouchableOpacity onPress={jest.fn} />,
  }),
  navigate,
  push,
});

type RenderMovieDetailProps = {
  mockResolvers?: IMocks;
  navigation?: {
    navigate: (route: string, params: any) => void;
    setOptions: () => {
      headerRight: () => React.ReactNode;
    };
  };
  route: {
    params: typeof baseParams;
  };
};

const renderMovieDetail = ({
  mockResolvers,
  navigation = getNavigation(),
  route,
}: RenderMovieDetailProps) => {
  const MovieDetailScreen = () => (
    <TMDBImageQualityProvider>
      <ThemeProvider theme={theme}>
        <AutoMockProvider mockResolvers={mockResolvers}>
          <MovieDetail navigation={navigation} route={route} />
        </AutoMockProvider>
      </ThemeProvider>
    </TMDBImageQualityProvider>
  );

  return <MockedNavigation component={MovieDetailScreen} />;
};

describe('Testing <MovieDetail />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render the loading-state correctly when has Tags on the route prop', () => {
    const genreIds = ['genre01', 'genre02'];

    const route = {
      params: {
        ...baseParams,
        voteAverage: 1.0,
        voteCount: 1,
        genreIds,
      },
    };

    const { getByTestId, getByText } = render(renderMovieDetail({ route }));

    expect(getByTestId('background-image-loading')).not.toBeNull();

    expect(getByTestId('loading-overview')).not.toBeNull();

    expect(getByTestId('media-info-wrapper')).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_OVERVIEW)).not.toBeNull();

    expect(getByTestId('tags')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('tags').children.length).toEqual(genreIds.length + 2);
  });

  it('should render the loading-state correctly when Tags on the route prop is undefined', () => {
    const route = {
      params: {
        ...baseParams,
        voteAverage: 1.0,
        voteCount: 1,
      },
    };

    const { queryByTestId, getByTestId, getByText } = render(
      renderMovieDetail({ route }),
    );

    expect(getByTestId('background-image-loading')).not.toBeNull();

    expect(getByTestId('loading-overview')).not.toBeNull();

    expect(getByTestId('media-info-wrapper')).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_OVERVIEW)).not.toBeNull();

    expect(queryByTestId('tags')).toBeNull();

    expect(getByTestId('tags-loading')).not.toBeNull();

    expect(getByTestId('tags-loading').children.length).toEqual(NUMBER_ITEMS);

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should render the content correctly when all the data is returned', () => {
    const genreIds = ['genre01', 'genre02'];

    const route = {
      params: {
        ...baseParams,
        voteAverage: 1.0,
        voteCount: 1,
        genreIds,
      },
    };

    const { queryByTestId, getByText, getByTestId } = render(
      renderMovieDetail({ route }),
    );

    act(() => {
      jest.runAllTimers();
    });

    // BackgroundImage

    expect(queryByTestId('background-image-loading')).toBeNull();

    expect(getByTestId('background-image-wrapper')).not.toBeNull();

    // MediaInfo (Header)

    expect(getByTestId('media-info-wrapper')).not.toBeNull();

    // Tags

    expect(queryByTestId('tags-loading')).toBeNull();

    expect(getByTestId('tags')).not.toBeNull();

    expect(getByTestId('tags').children.length).toEqual(genreIds.length + 2);

    // Overview section

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_OVERVIEW)).not.toBeNull();

    expect(getByTestId('media-item-description-wrapper')).not.toBeNull();

    // General-info section

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_DETAILS)).not.toBeNull();

    expect(getByTestId('general-info-wrapper')).not.toBeNull();

    expect(getByTestId('general-info-wrapper').children.length).toEqual(6);

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE)).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_RELEASE_DATE)).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_BUDGET)).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_REVENUE)).not.toBeNull();

    expect(
      getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_PRODUCTION_COUNTRIES),
    ).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SPOKEN_LANGUAGES)).not.toBeNull();

    // Cast section

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CAST)).not.toBeNull();

    expect(getByTestId('people-list-cast')).not.toBeNull();

    // Crew section

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREW)).not.toBeNull();

    expect(getByTestId('people-list-crew')).not.toBeNull();

    // Images section

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_IMAGES)).not.toBeNull();

    expect(getByTestId('images-list')).not.toBeNull();

    // Videos section

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_VIDEOS)).not.toBeNull();

    expect(getByTestId('videos-list')).not.toBeNull();

    // Reviews section

    expect(getByTestId('reviews-content-wrapper')).not.toBeNull();

    // Production-Companies section

    expect(
      getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES),
    ).not.toBeNull();

    // Similar section

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SIMILAR)).not.toBeNull();
  });

  it('should render the Advise component when some error occur', () => {
    const mockResolverErrorMovie = {
      Movie: () => new Error(),
    };

    const { getByTestId, getByText } = render(
      renderMovieDetail({
        mockResolvers: mockResolverErrorMovie,
        route: {
          params: baseParams,
        },
      }),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('advise-wrapper')).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_ERROR_DESCRIPTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_ERROR_SUGGESTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_ERROR_TITLE)).not.toBeNull();
  });

  it('should call navigate with the correct params when press a Cast-item', () => {
    const INDEX_CAST_ITEM_SELECTED = 0;

    const mockResolvers = {
      Movie: () => ({
        cast,
      }),
    };

    const push = jest.fn();

    const { getAllByTestId } = render(
      renderMovieDetail({
        navigation: getNavigation(push),
        mockResolvers,
        route: {
          params: baseParams,
        },
      }),
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getAllByTestId('button-wrapper-cast')[INDEX_CAST_ITEM_SELECTED]);

    expect(push).toHaveBeenCalledTimes(1);

    expect(push).toHaveBeenCalledWith('FAMOUS_DETAIL', {
      profileImage: cast[INDEX_CAST_ITEM_SELECTED].posterPath,
      id: Number(cast[INDEX_CAST_ITEM_SELECTED].id),
      name: cast[INDEX_CAST_ITEM_SELECTED].name,
    });
  });

  it('should call push with the correct params when press a Crew-item', () => {
    const INDEX_CREW_ITEM_SELECTED = 0;

    const mockResolvers = {
      Movie: () => ({
        crew,
      }),
    };

    const push = jest.fn();

    const { getAllByTestId } = render(
      renderMovieDetail({
        navigation: getNavigation(push),
        mockResolvers,
        route: {
          params: baseParams,
        },
      }),
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getAllByTestId('button-wrapper-crew')[INDEX_CREW_ITEM_SELECTED]);

    expect(push).toHaveBeenCalledTimes(1);

    expect(push).toHaveBeenCalledWith('FAMOUS_DETAIL', {
      profileImage: cast[INDEX_CREW_ITEM_SELECTED].posterPath,
      id: Number(cast[INDEX_CREW_ITEM_SELECTED].id),
      name: cast[INDEX_CREW_ITEM_SELECTED].name,
    });
  });

  it('should call push with the correct params when press a Similar-item', () => {
    const INDEX_SIMILAR_ITEM_SELECTED = 0;

    const mockResolvers = {
      Movie: () => ({
        similar,
      }),
    };

    const push = jest.fn();

    const { getAllByTestId } = render(
      renderMovieDetail({
        navigation: getNavigation(push),
        mockResolvers,
        route: {
          params: baseParams,
        },
      }),
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(
      getAllByTestId('simplified-media-list-button')[INDEX_SIMILAR_ITEM_SELECTED],
    );

    expect(push).toHaveBeenCalledTimes(1);

    expect(push).toHaveBeenCalledWith('MOVIE_DETAIL', {
      voteAverage: similar[INDEX_SIMILAR_ITEM_SELECTED].voteAverage,
      posterPath: similar[INDEX_SIMILAR_ITEM_SELECTED].posterPath,
      voteCount: similar[INDEX_SIMILAR_ITEM_SELECTED].voteCount,
      title: similar[INDEX_SIMILAR_ITEM_SELECTED].title,
      id: similar[INDEX_SIMILAR_ITEM_SELECTED].id,
    });
  });

  it('should call navigate with the correct params when press "ViewAll" Reviews', () => {
    const title = 'movie-title';

    const mockResolvers = {
      Movie: () => ({
        reviews,
        title,
      }),
    };

    const navigate = jest.fn();

    const { getByTestId } = render(
      renderMovieDetail({
        navigation: getNavigation(undefined, navigate),
        mockResolvers,
        route: {
          params: baseParams,
        },
      }),
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('view-all-button-reviews'));

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('REVIEWS', {
      mediaTitle: title,
      reviews,
    });
  });
});
