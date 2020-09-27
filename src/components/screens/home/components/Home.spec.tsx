import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { MockList, IMocks } from 'graphql-tools';

import { SEARCH_MOVIES } from 'components/screens/shared/search/queries';
import { SearchType } from 'types/schema';

import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import {
  SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF,
  SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF,
  SEARCH_MOVIE_PLACEHOLDER_I18N_REF,
} from './use-home/useHome';
import Home from './Home';

const renderHome = (mockResolvers?: IMocks, navigate = jest.fn) => {
  const HomeScreen = ({ navigation }) => {
    return (
      <AutoMockProvider mockResolvers={mockResolvers}>
        <Home navigation={{ ...navigation, navigate }} />
      </AutoMockProvider>
    );
  };

  return <MockedNavigation component={HomeScreen} />;
};

describe('Testing <Famous />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render the loading state when the screen is mounted', () => {
    const { queryByTestId } = render(renderHome());

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it("should render the content properly when the query-result isnt' null", () => {
    const mockResolvers = {
      TrendingMoviesQueryResult: () => ({
        items: () => new MockList(1),
      }),
    };

    const { queryByTestId, queryAllByTestId } = render(renderHome(mockResolvers));

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('loading-home')).toBeNull();

    expect(queryByTestId('top3-list')).not.toBeNull();

    expect(queryAllByTestId('section-wrapper').length).toEqual(4);

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should render popup-message with an error when the query-result has an error', () => {
    const mockResolvers = {
      TrendingMovies: () => new Error(),
    };

    const { queryByTestId, queryAllByTestId } = render(renderHome(mockResolvers));

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });

    expect(queryByTestId('popup-advice-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-home')).toBeNull();

    expect(queryByTestId('top3-list')).toBeNull();

    expect(queryAllByTestId('scrollview-content')).toEqual([]);
  });

  it('should call navigate to "SearchMovieScreen" when the user seleted "movies" and press the "search" button', () => {
    const navigate = jest.fn();

    const { getByTestId } = render(renderHome(undefined, navigate));

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('header-icon-button-wrapper-magnify'));

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('SEARCH', {
      i18nQueryByPaginationErrorRef: SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF,
      i18nQueryByTextErrorRef: SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF,
      i18nSearchBarPlaceholderRef: SEARCH_MOVIE_PLACEHOLDER_I18N_REF,
      searchType: SearchType.MOVIE,
      query: SEARCH_MOVIES,
    });
  });
});
