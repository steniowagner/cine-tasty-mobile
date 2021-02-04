/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import { SearchType } from 'types/schema';
import theme from 'styles/theme';

jest.mock('../../../../../../../utils/async-storage-adapter/AsyncStorageAdapter');

import timeTravel, {
  setupTimeTravel,
} from '../../../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../../__mocks__/MockedNavigator';
import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';
import { SEARCH_PERSON } from '../../../queries';

import Search, {
  ADVISE_EMPTY_LIST_DESCRIPTION_I18N_REF,
  ADVISE_EMPTY_LIST_SUGGESTION_I18N_REF,
  ADVISE_EMPTY_LIST_TITLE_I18N_REF,
} from '../Search';

const {
  persistItemInStorage,
  getItemFromStorage,
} = require('../../../../../../../utils/async-storage-adapter/AsyncStorageAdapter');

const I18N_FAMOUS_QUERY_BY_PAGINATION_ERROR_REF = 'i18nFamousQueryByPaginationErrorRef';
const I18N_FAMOUS_QUERY_BY_TEXT_ERROR_REF = 'i18nFamousQueryByTextErrorRef';
const SOME_FAMOUS_NAME = 'SOME_FAMOUS_NAME';
const FAMOUS_COUNT = 10;

const defaultItems = Array(10)
  .fill({})
  .map((_, index) => ({
    __typename: 'BasePerson',
    profilePath: `profilePath-${index}`,
    name: `name-${index}`,
    id: index,
  }));

type Props = {
  hasMore?: boolean;
  items?: any[];
};

const getMockResolvers = ({ hasMore = false, items = defaultItems }: Props) => ({
  SearchQueryResult: () => ({
    items: () => items,
    hasMore,
  }),
});

const params = {
  i18nQueryByPaginationErrorRef: I18N_FAMOUS_QUERY_BY_PAGINATION_ERROR_REF,
  i18nQueryByTextErrorRef: I18N_FAMOUS_QUERY_BY_TEXT_ERROR_REF,
  searchType: SearchType.PERSON,
  query: SEARCH_PERSON,
};

const renderSearchFamous = (mockResolvers: IMocks = {}, navigate = jest.fn()) => {
  const SearchFamousScreen = ({ navigation, route }) => (
    <TMDBImageQualityProvider>
      <ThemeProvider theme={theme}>
        <AutoMockProvider mockResolvers={mockResolvers}>
          <Search navigation={{ ...navigation, navigate }} route={route} />
        </AutoMockProvider>
      </ThemeProvider>
    </TMDBImageQualityProvider>
  );

  return <MockedNavigation component={SearchFamousScreen} params={params} />;
};

describe('Testing <Search /> - [Famous]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly on the first render', () => {
    const { queryByTestId } = render(renderSearchFamous(getMockResolvers({})));

    expect(queryByTestId('famous-loading-list')).toBeNull();

    expect(queryByTestId('top-reload-button')).toBeNull();

    expect(queryByTestId('searchbar-wrapper')).not.toBeNull();

    expect(queryByTestId('search-famous-list')).not.toBeNull();

    expect(queryByTestId('search-famous-list').props.data.length).toEqual(0);
  });

  it('should show the loading-state after user type some text on the search-bar', () => {
    const { queryByTestId } = render(renderSearchFamous(getMockResolvers({})));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_FAMOUS_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    expect(queryByTestId('famous-loading-list')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it("should should show an advise when there's no search results", () => {
    const { queryByTestId } = render(renderSearchFamous(getMockResolvers({ items: [] })));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_FAMOUS_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('advise-wrapper')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should show the list with the items returned by the query', () => {
    const { queryByTestId } = render(renderSearchFamous(getMockResolvers({})));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_FAMOUS_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('search-famous-list').props.data.length).toEqual(FAMOUS_COUNT);
  });

  it('should show an advise when the search returns an empty array', () => {
    const { queryByTestId, getByText } = render(
      renderSearchFamous(getMockResolvers({ items: [] })),
    );

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_FAMOUS_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('advise-wrapper')).not.toBeNull();

    expect(queryByTestId('search-famous-list').props.data).toEqual([]);

    expect(getByText(ADVISE_EMPTY_LIST_DESCRIPTION_I18N_REF)).not.toBeNull();

    expect(getByText(ADVISE_EMPTY_LIST_SUGGESTION_I18N_REF)).not.toBeNull();

    expect(getByText(ADVISE_EMPTY_LIST_TITLE_I18N_REF)).not.toBeNull();
  });

  it('should navigate to tv-show-detail-screen when the user press a certain tv-show-item', () => {
    const INDEX_ITEM_SELECTED = (Math.random() * (defaultItems.length - 1 - 0 + 1)) << 0;

    const onPress = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderSearchFamous(getMockResolvers({}), onPress),
    );

    fireEvent(getByTestId('search-input'), 'onChangeText', SOME_FAMOUS_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('search-famous-list').props.data.length).toEqual(
      defaultItems.length,
    );

    fireEvent.press(getAllByTestId('famous-list-item-button')[INDEX_ITEM_SELECTED]);

    expect(onPress).toHaveBeenCalledTimes(1);

    expect(onPress).toHaveBeenCalledWith('FAMOUS_DETAIL', {
      profileImage: defaultItems[INDEX_ITEM_SELECTED].profilePath,
      name: defaultItems[INDEX_ITEM_SELECTED].name,
      id: defaultItems[INDEX_ITEM_SELECTED].id,
    });
  });

  it('should navigate to the famous-detail-screen when press some item on the RecentSearch', () => {
    const recentFamousSearched = Array(5)
      .fill({})
      .map((_, index) => ({
        image: `image-${index}`,
        title: `item-${index}`,
        id: index,
      }));

    getItemFromStorage.mockImplementationOnce(() => recentFamousSearched);

    const INDEX_ITEM_SELECTED =
      (Math.random() * (recentFamousSearched.length - 1 - 0 + 1)) << 0;

    const onPress = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderSearchFamous(getMockResolvers({}), onPress),
    );

    fireEvent(getByTestId('search-input'), 'onChangeText', '');

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('recent-searches-list')).not.toBeNull();

    fireEvent.press(
      getAllByTestId('recent-searches-list-item-button')[INDEX_ITEM_SELECTED],
    );

    expect(onPress).toHaveBeenCalledTimes(1);

    expect(onPress).toHaveBeenCalledWith('FAMOUS_DETAIL', {
      profileImage: recentFamousSearched[INDEX_ITEM_SELECTED].image,
      name: recentFamousSearched[INDEX_ITEM_SELECTED].title,
      id: recentFamousSearched[INDEX_ITEM_SELECTED].id,
    });
  });
});
