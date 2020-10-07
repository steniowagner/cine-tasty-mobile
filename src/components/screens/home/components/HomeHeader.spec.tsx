import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { SEARCH_TV_SHOWS, SEARCH_MOVIES } from 'components/screens/shared/search/queries';
import { SearchType } from 'types/schema';

import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import {
  SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF,
  SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF,
  SEARCH_MOVIE_PLACEHOLDER_I18N_REF,
  SEARCH_TV_SHOWS_QUERY_BY_TEXT_ERROR_I18N_REF,
  SEARCH_TV_SHOWS_PAGINATION_ERROR_I18N_REF,
  SEARCH_TV_SHOWS_PLACEHOLDER_I18N_REF,
} from './hooks/usePressMapping';
import Home from './Home';

type RenderHomeProps = {
  isMovieSelectedInitially?: boolean;
  navigate?: jest.FunctionLike;
  mockResolvers?: IMocks;
};

const renderHome = ({
  isMovieSelectedInitially = true,
  navigate = jest.fn,
  mockResolvers,
}: RenderHomeProps) => {
  const HomeScreen = ({ navigation }) => {
    return (
      <AutoMockProvider mockResolvers={mockResolvers}>
        <Home
          navigation={{ ...navigation, navigate }}
          isMovieSelectedInitially={isMovieSelectedInitially}
        />
      </AutoMockProvider>
    );
  };

  return <MockedNavigation component={HomeScreen} />;
};

describe('Testing the Home Header', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should call navigate to "SearchMovieScreen" when the user seleted "movies" and press the "search" button', () => {
    const navigate = jest.fn();

    const { getByTestId } = render(renderHome({ navigate }));

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

  it('should call navigate to "SearchTVShowScreen" when the user seleted "tv-shows" and press the "search" button', () => {
    const navigate = jest.fn();

    const { getByTestId } = render(
      renderHome({ isMovieSelectedInitially: false, navigate }),
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('header-icon-button-wrapper-magnify'));

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('SEARCH', {
      i18nQueryByPaginationErrorRef: SEARCH_TV_SHOWS_PAGINATION_ERROR_I18N_REF,
      i18nQueryByTextErrorRef: SEARCH_TV_SHOWS_QUERY_BY_TEXT_ERROR_I18N_REF,
      i18nSearchBarPlaceholderRef: SEARCH_TV_SHOWS_PLACEHOLDER_I18N_REF,
      searchType: SearchType.TV,
      query: SEARCH_TV_SHOWS,
    });
  });
});
