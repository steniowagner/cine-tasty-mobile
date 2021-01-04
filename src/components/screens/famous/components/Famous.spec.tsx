import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import { DEFAULT_ANIMATION_DURATION } from 'components/common/popup-advice/PopupAdvice';
import { SEARCH_PERSON } from 'components/screens/shared/search/queries';
import { SearchType } from 'types/schema';
import theme from 'styles/theme';

import timeTravel, { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import { I18N_ENTRY_QUERY_ERROR_REF, GET_FAMOUS } from './useFamous';
import Famous, {
  QUERY_BY_PAGINATION_ERROR_I18N_REF,
  SEARCH_BAR_PLACEHOLER_I18N_REF,
  QUERY_BY_TEXT_ERROR_I18N_REF,
} from './Famous';

type FamousScreenProps = {
  navigate?: typeof jest.fn;
  mockResolvers?: IMocks;
};

const famouseItems = Array(5)
  .fill({})
  .map((_, index) => ({
    profilePath: `profilePath-${index}`,
    name: `name-${index}`,
    id: index,
    __typename: 'BasePerson',
  }));

const renderFamousScreen = ({ mockResolvers, navigate }: FamousScreenProps) => {
  const FamousScreen = ({ navigation }) => (
    <TMDBImageQualityProvider>
      <ThemeProvider theme={theme}>
        <AutoMockProvider mockResolvers={mockResolvers}>
          <Famous navigation={{ ...navigation, navigate }} />
        </AutoMockProvider>
      </ThemeProvider>
    </TMDBImageQualityProvider>
  );

  return <MockedNavigation component={FamousScreen} />;
};

describe('Testing <Famous />', () => {
  afterEach(cleanup);

  beforeEach(setupTimeTravel);

  it('should render the loading state when the screen is mounted', () => {
    const { queryByTestId } = render(renderFamousScreen({}));

    expect(queryByTestId('famous-loading-list')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should navigate to the search-screen when the user press the magnify-icon-button', () => {
    const navigate = jest.fn();

    const { queryByTestId } = render(renderFamousScreen({ navigate }));

    expect(queryByTestId('header-icon-button-wrapper-magnify')).not.toBeNull();

    fireEvent.press(queryByTestId('header-icon-button-wrapper-magnify'));

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('SEARCH', {
      i18nQueryByPaginationErrorRef: QUERY_BY_PAGINATION_ERROR_I18N_REF,
      i18nSearchBarPlaceholderRef: SEARCH_BAR_PLACEHOLER_I18N_REF,
      i18nQueryByTextErrorRef: QUERY_BY_TEXT_ERROR_I18N_REF,
      searchType: SearchType.PERSON,
      query: SEARCH_PERSON,
    });

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should navigate to the famous-detail-screen when the user press some item on the famous-list', () => {
    const INDEX_ITEM_SELECTED = 2;
    const navigate = jest.fn();

    const mockResolvers = {
      PeopleQueryResult: () => ({
        items: () => famouseItems,
      }),
    };

    const { queryAllByTestId } = render(renderFamousScreen({ mockResolvers, navigate }));

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(queryAllByTestId('famous-list-item-button')[INDEX_ITEM_SELECTED]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('FAMOUS_DETAIL', {
      profileImage: famouseItems[INDEX_ITEM_SELECTED].profilePath,
      name: famouseItems[INDEX_ITEM_SELECTED].name,
      id: famouseItems[INDEX_ITEM_SELECTED].id,
    });
  });

  it('should render the list of famous when the loading is over', () => {
    const ITEMS_COUNT = 10;

    const mockResolvers = {
      PeopleQueryResult: () => ({
        items: () => new MockList(ITEMS_COUNT),
      }),
    };

    const { queryByTestId } = render(renderFamousScreen({ mockResolvers }));

    expect(queryByTestId('famous-loading-list')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('famous-loading-list')).toBeNull();

    expect(queryByTestId('famous-list')).not.toBeNull();

    expect(queryByTestId('famous-list').props.data.length).toEqual(ITEMS_COUNT);
  });

  it('should show an error-message when some error occurs on the first query', () => {
    const mockResolvers = {
      PeopleQueryResult: () => new Error(),
    };

    const { getByTestId } = render(renderFamousScreen({ mockResolvers }));

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(getByTestId('popup-advice-wrapper')).not.toBeNull();

    expect(getByTestId('popup-advice-message').children[0]).toEqual(
      I18N_ENTRY_QUERY_ERROR_REF,
    );

    expect(getByTestId('top-reload-button')).not.toBeNull();
  });

  it("should perform the entry query after the entry-error when the error doesn't exist anymore", () => {
    const ITEMS_COUNT = 10;

    const mockResolversWithError = {
      PeopleQueryResult: () => new Error(),
    };

    const { getByTestId, queryByTestId, rerender } = render(
      renderFamousScreen({ mockResolvers: mockResolversWithError }),
    );

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(getByTestId('popup-advice-wrapper')).not.toBeNull();

    expect(getByTestId('popup-advice-message').children[0]).toEqual(
      I18N_ENTRY_QUERY_ERROR_REF,
    );

    expect(getByTestId('top-reload-button')).not.toBeNull();

    fireEvent.press(getByTestId('top-reload-button'));

    const mockResolvers = {
      PeopleQueryResult: () => ({
        items: () => new MockList(ITEMS_COUNT),
      }),
    };

    rerender(renderFamousScreen({ mockResolvers }));

    expect(getByTestId('famous-loading-list')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('famous-list')).not.toBeNull();

    expect(queryByTestId('famous-list').props.data.length).toEqual(ITEMS_COUNT);
  });
});
