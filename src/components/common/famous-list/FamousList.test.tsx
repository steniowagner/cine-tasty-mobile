import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import MockedNavigation from '@mocks/MockedNavigator';
import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';
import {setupTimeTravel} from '@mocks/timeTravel';
import {AlertMessageProvider} from '@providers';
import {Routes} from '@routes/routes';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const reactNavigationNativeModule = jest.requireActual(
    '@react-navigation/native',
  );
  return {
    ...reactNavigationNativeModule,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

import {FamousListProps, FamousList} from './FamousList';

const makeFamousList = (size: number) =>
  Array(size)
    .fill({})
    .map((_, index) => ({
      profileImage: `profilePath-${index}`,
      name: `name-${index}`,
      id: index,
    }));

const renderFamousList = (props: FamousListProps) => {
  const FamoustListComponent = () => (
    <TMDBImageQualityProvider>
      <ThemeProvider theme={theme}>
        <AlertMessageProvider>
          <FamousList
            onPressBottomReloadButton={props.onPressBottomReloadButton}
            onPressTopReloadButton={props.onPressTopReloadButton}
            hasPaginationError={props.hasPaginationError}
            onEndReached={props.onEndReached}
            isPaginating={props.isPaginating}
            isLoading={props.isLoading}
            famous={props.famous}
            error={props.error}
          />
        </AlertMessageProvider>
      </ThemeProvider>
    </TMDBImageQualityProvider>
  );
  return <MockedNavigation component={FamoustListComponent} />;
};

const mockHandlersFunctions = {
  onPressBottomReloadButton: jest.fn(),
  onPressTopReloadButton: jest.fn(),
  onEndReached: jest.fn(),
};

describe('<FamousList />', () => {
  const elements = {
    famousListItemButton: (api: RenderAPI) =>
      api.queryAllByTestId('famous-list-item-button'),
    famousList: (api: RenderAPI) => api.queryByTestId('famous-list'),
    loadingFamousList: (api: RenderAPI) =>
      api.queryByTestId('famous-loading-list'),
    topReloadButton: (api: RenderAPI) => api.queryByTestId('top-reload-button'),
    paginationFooterWrapper: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-wrapper'),
    paginationLoadingFooter: (api: RenderAPI) =>
      api.queryByTestId('pagination-loading-footer-wrapper'),
    paginationFooterReloadButton: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-reload-button'),
  };

  beforeEach(() => {
    setupTimeTravel();
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  describe('Render correctly', () => {
    it('should render the "Loading-state" when is loading the data', async () => {
      const data = {
        ...mockHandlersFunctions,
        isPaginating: false,
        isLoading: true,
        famous: [],
      };
      const component = render(renderFamousList(data));
      await waitFor(() => {
        expect(elements.loadingFamousList(component)).not.toBeNull();
        expect(elements.famousList(component)).toBeNull();
        expect(elements.topReloadButton(component)).toBeNull();
        expect(elements.paginationFooterWrapper(component)).toBeNull();
      });
    });

    it('should render correctly when has some data to show', async () => {
      const numberOfItems = randomPositiveNumber(10, 1);
      const famous = makeFamousList(numberOfItems);
      const data = {
        ...mockHandlersFunctions,
        isPaginating: false,
        isLoading: false,
        famous,
      };
      const component = render(renderFamousList(data));
      await waitFor(() => {
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.loadingFamousList(component)).toBeNull();
        expect(elements.topReloadButton(component)).toBeNull();
        expect(elements.paginationFooterWrapper(component)).toBeNull();
        expect(elements.famousListItemButton(component).length).toEqual(
          famous.length,
        );
      });
    });

    it('should render correctly when the data is an empty array', async () => {
      const data = {
        ...mockHandlersFunctions,
        isPaginating: false,
        isLoading: false,
        famous: [],
      };
      const component = render(renderFamousList(data));
      await waitFor(() => {
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.loadingFamousList(component)).toBeNull();
        expect(elements.topReloadButton(component)).toBeNull();
        expect(elements.paginationFooterWrapper(component)).toBeNull();
        expect(elements.famousListItemButton(component).length).toEqual(0);
      });
    });
  });

  describe('Pagination', () => {
    it('should show the "Footer-loading" when is paginating', async () => {
      const numberOfItems = randomPositiveNumber(10, 1);
      const famous = makeFamousList(numberOfItems);
      const data = {
        ...mockHandlersFunctions,
        isPaginating: true,
        isLoading: false,
        famous,
      };
      const component = render(renderFamousList(data));
      await waitFor(() => {
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.loadingFamousList(component)).toBeNull();
        expect(elements.topReloadButton(component)).toBeNull();
        expect(elements.paginationFooterWrapper(component)).not.toBeNull();
        expect(elements.paginationLoadingFooter(component)).not.toBeNull();
        expect(elements.paginationFooterReloadButton(component)).toBeNull();
        expect(elements.famousListItemButton(component).length).toEqual(
          famous.length,
        );
      });
    });

    it('should show the "Reload-footer-button" after a "Pagination-error"', async () => {
      const numberOfItems = randomPositiveNumber(10, 1);
      const famous = makeFamousList(numberOfItems);
      const data = {
        ...mockHandlersFunctions,
        hasPaginationError: true,
        isPaginating: false,
        error: 'SOME_ERROR',
        isLoading: false,
        famous,
      };
      const component = render(renderFamousList(data));
      await waitFor(() => {
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.loadingFamousList(component)).toBeNull();
        expect(elements.topReloadButton(component)).toBeNull();
        expect(elements.paginationFooterWrapper(component)).not.toBeNull();
        expect(elements.paginationLoadingFooter(component)).toBeNull();
        expect(elements.paginationFooterReloadButton(component)).not.toBeNull();
        expect(elements.famousListItemButton(component).length).toEqual(
          famous.length,
        );
      });
    });

    it('should call the "onPressBottomReloadButton" when the user press the "Reload-footer-button"', async () => {
      const numberOfItems = randomPositiveNumber(10, 1);
      const famous = makeFamousList(numberOfItems);
      const onPressBottomReloadButton = jest.fn();
      const data = {
        ...mockHandlersFunctions,
        onPressBottomReloadButton,
        hasPaginationError: true,
        isPaginating: false,
        error: 'SOME_ERROR',
        isLoading: false,
        famous,
      };
      const component = render(renderFamousList(data));
      await waitFor(() => {
        expect(onPressBottomReloadButton).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.paginationFooterReloadButton(component));
        expect(onPressBottomReloadButton).toHaveBeenCalledTimes(1);
      });
    });

    describe('Entry Error', () => {
      it('should call the "onPressTopReloadButton" when the user press the "Top-reload-button"', async () => {
        const onPressTopReloadButton = jest.fn();
        const data = {
          ...mockHandlersFunctions,
          onPressTopReloadButton,
          isPaginating: false,
          error: 'SOME_ERROR',
          isLoading: false,
          famous: [],
        };
        const component = render(renderFamousList(data));
        expect(onPressTopReloadButton).toHaveBeenCalledTimes(0);
        await waitFor(() => {
          fireEvent.press(elements.topReloadButton(component));
          expect(onPressTopReloadButton).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('Scrolling down the list', () => {
      it('should call the "onEndReached" when the user scrolls down to the end of the list', async () => {
        const numberOfItems = randomPositiveNumber(10, 1);
        const famous = makeFamousList(numberOfItems);
        const onEndReached = jest.fn();
        const data = {
          ...mockHandlersFunctions,
          onEndReached,
          isPaginating: false,
          isLoading: false,
          famous,
        };
        const component = render(renderFamousList(data));
        await waitFor(() => {
          expect(onEndReached).toHaveBeenCalledTimes(0);
          fireEvent(elements.famousList(component), 'onEndReached');
          expect(onEndReached).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('Press list-item', () => {
      it('should call "navigation.navigate" correctly when the user presses some list-item', async () => {
        const numberOfItems = randomPositiveNumber(10, 1);
        const indexItemSelected = randomPositiveNumber(numberOfItems - 1, 0);
        const famous = makeFamousList(numberOfItems);
        const data = {
          ...mockHandlersFunctions,
          isPaginating: false,
          isLoading: false,
          famous,
        };
        const component = render(renderFamousList(data));
        await waitFor(() => {
          expect(mockNavigate).toHaveBeenCalledTimes(0);
          fireEvent.press(
            elements.famousListItemButton(component)[indexItemSelected],
          );
          expect(mockNavigate).toHaveBeenCalledTimes(1);
          expect(mockNavigate).toHaveBeenCalledWith(Routes.Famous.DETAILS, {
            profileImage: famous[indexItemSelected].profileImage,
            name: famous[indexItemSelected].name,
            id: famous[indexItemSelected].id,
          });
        });
      });
    });
  });
});
