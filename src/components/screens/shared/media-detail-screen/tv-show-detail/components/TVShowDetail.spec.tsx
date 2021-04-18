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
import TVShowDetail from './TVShowDetail';

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

const createdBy = [
  {
    id: 'id1',
    creditId: 'creditId1',
    name: 'name1',
    gender: 1,
    profilePath: 'profilePath1',
  },
  {
    id: 'id2',
    creditId: 'creditId2',
    name: 'name2',
    gender: 2,
    profilePath: 'profilePath2',
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
    name: 'name',
    id: 1,
  },
  {
    __typename: 'BaseMovie',
    voteAverage: 1.0,
    posterPath: 'posterPath',
    voteCount: 2,
    genreIds: ['genre01'],
    name: 'name',
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

type RenderTVShowDetailProps = {
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

const renderTVShowDetail = ({
  mockResolvers,
  navigation = getNavigation(),
  route,
}: RenderTVShowDetailProps) => {
  const TVShowDetailScreen = () => (
    <TMDBImageQualityProvider>
      <ThemeProvider theme={theme}>
        <AutoMockProvider mockResolvers={mockResolvers}>
          <TVShowDetail navigation={navigation} route={route} />
        </AutoMockProvider>
      </ThemeProvider>
    </TMDBImageQualityProvider>
  );

  return <MockedNavigation component={TVShowDetailScreen} />;
};

describe('Testing <TVShowDetail />', () => {
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

    const { getByTestId, getByText } = render(renderTVShowDetail({ route }));

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
      renderTVShowDetail({ route }),
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

    const mockResolvers = {
      TVShow: () => ({
        numberOfSeasons: 2,
      }),
    };

    const { queryByTestId, getByText, getByTestId } = render(
      renderTVShowDetail({ mockResolvers, route }),
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

    expect(getByTestId('general-info-wrapper').children.length).toEqual(8);

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE)).not.toBeNull();

    expect(
      getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE),
    ).not.toBeNull();

    expect(
      getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES),
    ).not.toBeNull();

    expect(
      getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS),
    ).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME)).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY)).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE)).not.toBeNull();

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE)).not.toBeNull();

    // See seasons

    expect(getByTestId('rounded-button')).not.toBeNull();

    // Created by

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREATED_BY)).not.toBeNull();

    expect(getByTestId('people-list-creator')).not.toBeNull();

    // Crew

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREW)).not.toBeNull();

    expect(getByTestId('people-list-crew')).not.toBeNull();

    // Cast section

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CAST)).not.toBeNull();

    expect(getByTestId('people-list-cast')).not.toBeNull();

    // Images section

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_IMAGES)).not.toBeNull();

    expect(getByTestId('images-list')).not.toBeNull();

    // Videos section

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_VIDEOS)).not.toBeNull();

    expect(getByTestId('videos-list')).not.toBeNull();

    // Networks

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NETWORKS)).not.toBeNull();

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
      TVShow: () => new Error(),
    };

    const { getByTestId, getByText } = render(
      renderTVShowDetail({
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
      TVShow: () => ({
        cast,
      }),
    };

    const push = jest.fn();

    const { getAllByTestId } = render(
      renderTVShowDetail({
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

  it('should call push with the correct params when press a Created-By-item', () => {
    const INDEX_CREATED_BY_SELECTED = 0;

    const mockResolvers = {
      TVShow: () => ({
        createdBy,
        crew,
      }),
    };

    const push = jest.fn();

    const { getAllByTestId } = render(
      renderTVShowDetail({
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

    fireEvent.press(getAllByTestId('button-wrapper-creator')[INDEX_CREATED_BY_SELECTED]);

    expect(push).toHaveBeenCalledTimes(1);

    expect(push).toHaveBeenCalledWith('FAMOUS_DETAIL', {
      profileImage: createdBy[INDEX_CREATED_BY_SELECTED].profilePath,
      id: Number(createdBy[INDEX_CREATED_BY_SELECTED].id),
      name: createdBy[INDEX_CREATED_BY_SELECTED].name,
    });
  });

  it('should call push with the correct params when press a Crew-item', () => {
    const INDEX_CREW_ITEM_SELECTED = 0;

    const mockResolvers = {
      TVShow: () => ({
        crew,
      }),
    };

    const push = jest.fn();

    const { getAllByTestId } = render(
      renderTVShowDetail({
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
      TVShow: () => ({
        similar,
      }),
    };

    const push = jest.fn();

    const { getAllByTestId } = render(
      renderTVShowDetail({
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

    expect(push).toHaveBeenCalledWith('TV_SHOW_DETAIL', {
      voteAverage: similar[INDEX_SIMILAR_ITEM_SELECTED].voteAverage,
      posterPath: similar[INDEX_SIMILAR_ITEM_SELECTED].posterPath,
      voteCount: similar[INDEX_SIMILAR_ITEM_SELECTED].voteCount,
      title: similar[INDEX_SIMILAR_ITEM_SELECTED].name,
      id: similar[INDEX_SIMILAR_ITEM_SELECTED].id,
    });
  });

  it('should call navigate with the correct params when press "ViewAll" Reviews', () => {
    const name = 'tv-show-name';

    const mockResolvers = {
      TVShow: () => ({
        reviews,
        name,
      }),
    };

    const navigate = jest.fn();

    const { getByTestId } = render(
      renderTVShowDetail({
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
      mediaTitle: name,
      reviews,
    });
  });

  it('should call navigate with the correct params when press "See All Seasons"', () => {
    const name = 'tv-show-name';
    const numberOfSeasons = 2;
    const id = '123';

    const mockResolvers = {
      TVShow: () => ({
        numberOfSeasons: numberOfSeasons,
        name,
        id,
      }),
    };

    const navigate = jest.fn();

    const { getByTestId } = render(
      renderTVShowDetail({
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

    fireEvent.press(getByTestId('rounded-button'));

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('TV_SHOW_SEASONS', {
      numberOfSeasons,
      title: name,
      id,
    });
  });
});
