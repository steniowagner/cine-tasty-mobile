import React from 'react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import { AlertMessageProvider } from '@/providers';
import { Translations } from '@/i18n/tags';
import { SearchType } from '@/components/stacks/common-screens/search/types';
import { Routes } from '@/navigation';

import {
  mockTrendingFamousEntryQuerySuccessResponse,
  mockTrendingFamousEntryQueryErrorResponse,
  mockTrendingFamousPaginationQuerySuccessResponse,
  mockTrendingFamousPaginationQueryErrorResponse,
  TRENDING_FAMOUS_ITEMS_PER_PAGE,
  trendingFamousList,
  randomPositiveNumber,
  getErrorType,
} from '../../../../../../__mocks__';
import { FamousNavigationProp } from '../../routes/route-params-types';
import { MockedNavigator } from '../../../../../../__mocks__';
import { TrendingFamous } from './TrendingFamous';

type TrendingFamousComponent = {
  navigation: FamousNavigationProp;
};

const renderTrendingFamous = (
  mocks: readonly MockedResponse<Record<string, any>>[],
  navigate = jest.fn(),
) => {
  const TrendingFamousComponent = (props: TrendingFamousComponent) => (
    <MockedProvider
      mocks={mocks}
      defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
      }}>
      <AlertMessageProvider>
        <TrendingFamous navigation={{ ...props.navigation, navigate }} />
      </AlertMessageProvider>
    </MockedProvider>
  );
  return <MockedNavigator component={TrendingFamousComponent} />;
};

describe('Stacks/News/Screens/TrendingFamous', () => {
  const elements = {
    trendingFamousListItems: (component: RenderAPI) =>
      component.queryAllByTestId('trending-famous-list-item-button'),
    trendingFamousList: (component: RenderAPI) =>
      component.getByTestId('trending-famous-list'),
    headerCTA: (component: RenderAPI) =>
      component.getByTestId('header-icon-button-wrapper-magnify'),
    loading: (api: RenderAPI) => api.queryByTestId('default-tmdb-list-loading'),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
    alertMessageWrapper: (api: RenderAPI) =>
      api.queryByTestId('alert-message-wrapper'),
    alertMessageIcon: (api: RenderAPI) =>
      api.queryByTestId('alert-message-icon'),
    paginationFooter: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-wrapper'),
    paginationLoading: (api: RenderAPI) =>
      api.queryByTestId('pagination-loading-footer-wrapper'),
    paginationReload: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-reload-button'),
    topReloadButton: (api: RenderAPI) => api.queryByTestId('top-reload-button'),
    famousNames: (api: RenderAPI) => api.queryAllByTestId('title-text'),
  };

  describe('Entry-query', () => {
    it('should show the "loading-state" by default', () => {
      const component = render(
        renderTrendingFamous(mockTrendingFamousEntryQuerySuccessResponse()),
      );
      expect(elements.loading(component)).not.toBeNull();
    });

    describe('When querying successfuly', () => {
      it('should show the items received', async () => {
        const component = render(
          renderTrendingFamous(mockTrendingFamousEntryQuerySuccessResponse()),
        );
        await waitFor(() => {
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE,
          );
        });
      });
    });

    describe('When querying with some error', () => {
      it('should show the "alert-error-message" correctly', async () => {
        const component = render(
          renderTrendingFamous(
            mockTrendingFamousEntryQueryErrorResponse(getErrorType()),
          ),
        );
        await waitFor(() => {
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component)!.children[0]).toEqual(
            Translations.TrendingFamous.ENTRY_ERROR,
          );
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
      });

      it('should show the "top-reload" button', async () => {
        const component = render(
          renderTrendingFamous(
            mockTrendingFamousEntryQueryErrorResponse(getErrorType()),
          ),
        );
        await waitFor(() => {
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
      });

      it('should not show any "news-list-item"', async () => {
        const component = render(
          renderTrendingFamous(
            mockTrendingFamousEntryQueryErrorResponse(getErrorType()),
          ),
        );
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.trendingFamousListItems(component).length).toEqual(0);
      });
    });

    describe('Retrying', () => {
      it('should show the "loading-state" when start to "retry"', async () => {
        const component = render(
          renderTrendingFamous(
            mockTrendingFamousEntryQueryErrorResponse(getErrorType()),
          ),
        );
        await waitFor(() => {
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
        act(() => {
          fireEvent.press(elements.topReloadButton(component)!);
        });
        await waitFor(() => {
          expect(elements.loading(component)).not.toBeNull();
        });
      });

      it('should show the "news-list-items" when the "retry-response" returns "success"', async () => {
        const firstEntryQueryResult = mockTrendingFamousEntryQueryErrorResponse(
          getErrorType(),
        );
        const secondEntryQueryResult =
          mockTrendingFamousEntryQuerySuccessResponse();
        const component = render(
          renderTrendingFamous([
            ...firstEntryQueryResult,
            ...secondEntryQueryResult,
          ]),
        );
        await waitFor(() => {
          expect(elements.topReloadButton(component)).not.toBeNull();
          expect(elements.trendingFamousListItems(component).length).toEqual(0);
        });
        act(() => {
          fireEvent.press(elements.topReloadButton(component)!);
        });
        await waitFor(() => {
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE,
          );
        });
      });

      it('should show the "alert-error-message" when the "retry-response" returns "another error"', async () => {
        const firstEntryQueryResult = mockTrendingFamousEntryQueryErrorResponse(
          getErrorType(),
        );
        const secondEntryQueryResult =
          mockTrendingFamousEntryQueryErrorResponse(getErrorType());
        const component = render(
          renderTrendingFamous([
            ...firstEntryQueryResult,
            ...secondEntryQueryResult,
          ]),
        );
        await waitFor(() => {
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
        act(() => {
          fireEvent.press(elements.topReloadButton(component)!);
        });
        await waitFor(() => {
          expect(elements.topReloadButton(component)).toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component)!.children[0]).toEqual(
            Translations.TrendingFamous.ENTRY_ERROR,
          );
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
        });
      });
    });
  });

  describe('Pagination-query', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should show the "paginating-state" when paginating', async () => {
      const component = render(
        renderTrendingFamous(
          mockTrendingFamousPaginationQuerySuccessResponse(),
        ),
      );
      await waitFor(() => {
        expect(
          elements.trendingFamousListItems(component).length,
        ).toBeGreaterThan(0);
      });
      act(() => {
        fireEvent(elements.trendingFamousList(component), 'onEndReached');
      });
      expect(elements.paginationFooter(component)).not.toBeNull();
      expect(elements.paginationLoading(component)).not.toBeNull();
      await waitFor(() => {});
    });

    describe('When paginating successfuly', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should render correctly', async () => {
        const component = render(
          renderTrendingFamous(
            mockTrendingFamousPaginationQuerySuccessResponse(),
          ),
        );
        await waitFor(() => {
          expect(
            elements.trendingFamousListItems(component).length,
          ).toBeGreaterThan(0);
        });
        act(() => {
          fireEvent(elements.trendingFamousList(component), 'onEndReached');
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).toBeNull();
          expect(elements.loading(component)).toBeNull();
          expect(elements.topReloadButton(component)).toBeNull();
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.trendingFamousList(component)).not.toBeNull();
        });
      });

      it('should render the "news-list" with the correct size', async () => {
        const component = render(
          renderTrendingFamous(
            mockTrendingFamousPaginationQuerySuccessResponse(),
          ),
        );
        await waitFor(() => {
          expect(
            elements.trendingFamousListItems(component).length,
          ).toBeGreaterThan(0);
        });
        act(() => {
          fireEvent(elements.trendingFamousList(component), 'onEndReached');
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE * 2,
          );
        });
      });

      it('should render the "news-list items" correctly', async () => {
        const component = render(
          renderTrendingFamous(
            mockTrendingFamousPaginationQuerySuccessResponse(),
          ),
        );
        await waitFor(() => {
          expect(
            elements.trendingFamousListItems(component).length,
          ).toBeGreaterThan(0);
        });
        expect(elements.trendingFamousListItems(component).length).toEqual(
          TRENDING_FAMOUS_ITEMS_PER_PAGE,
        );
        act(() => {
          fireEvent(elements.trendingFamousList(component), 'onEndReached');
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE * 2,
          );
        });
        for (let i = 0; i < TRENDING_FAMOUS_ITEMS_PER_PAGE * 2; i++) {
          if (i < TRENDING_FAMOUS_ITEMS_PER_PAGE) {
            expect(
              (
                elements.famousNames(component)[i]!.children[0] as string
              ).startsWith('page1'),
            ).toEqual(true);
          } else {
            expect(
              (
                elements.famousNames(component)[i]!.children[0] as string
              ).startsWith('page2'),
            ).toEqual(true);
          }
        }
      });
    });

    describe('When paginating with errors', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should show the "alert-message-error" correctly', async () => {
        const entryQueryResults = mockTrendingFamousEntryQuerySuccessResponse();
        const paginationQueryResults =
          mockTrendingFamousPaginationQueryErrorResponse(getErrorType());
        const component = render(
          renderTrendingFamous([
            ...entryQueryResults,
            ...paginationQueryResults,
          ]),
        );
        await waitFor(() => {
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent(elements.trendingFamousList(component), 'onEndReached');
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.alertMessageIcon(component)).not.toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component)!.children[0]).toEqual(
            Translations.TrendingFamous.PAGINATION_ERROR,
          );
        });
      });

      it('should "keep" the "items" received from the "entry-query"', async () => {
        const entryQueryResults = mockTrendingFamousEntryQuerySuccessResponse();
        const paginationQueryResults =
          mockTrendingFamousPaginationQueryErrorResponse(getErrorType());
        const component = render(
          renderTrendingFamous([
            ...entryQueryResults,
            ...paginationQueryResults,
          ]),
        );
        await waitFor(() => {
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent(elements.trendingFamousList(component), 'onEndReached');
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE,
          );
        });
      });

      it('should show the "bottom-reload-pagination"', async () => {
        const entryQueryResults = mockTrendingFamousEntryQuerySuccessResponse();
        const paginationQueryResults =
          mockTrendingFamousPaginationQueryErrorResponse(getErrorType());
        const component = render(
          renderTrendingFamous([
            ...entryQueryResults,
            ...paginationQueryResults,
          ]),
        );
        await waitFor(() => {
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent(elements.trendingFamousList(component), 'onEndReached');
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.paginationReload(component)).not.toBeNull();
        });
      });
    });

    describe('Retrying', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should show the "pagination-state" when "retrying" to "paginate"', async () => {
        const entryQueryResults = mockTrendingFamousEntryQuerySuccessResponse();
        const paginationQueryResults =
          mockTrendingFamousPaginationQueryErrorResponse(getErrorType());
        const component = render(
          renderTrendingFamous([
            ...entryQueryResults,
            ...paginationQueryResults,
          ]),
        );
        await waitFor(() => {
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent(elements.trendingFamousList(component), 'onEndReached');
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.paginationReload(component)).not.toBeNull();
        });
        act(() => {
          fireEvent.press(elements.paginationReload(component)!);
        });
        await waitFor(() => {
          expect(elements.paginationLoading(component)).not.toBeNull();
        });
      });

      it('should show the "news-list-items" correctly when the "retry-response" returns "success"', async () => {
        const entryQueryResults = mockTrendingFamousEntryQuerySuccessResponse();
        const paginationQueryErrorResults =
          mockTrendingFamousPaginationQueryErrorResponse(getErrorType());
        const paginationQuerySuccessResult =
          mockTrendingFamousPaginationQuerySuccessResponse();
        const component = render(
          renderTrendingFamous([
            ...entryQueryResults,
            ...paginationQueryErrorResults,
            ...paginationQuerySuccessResult,
          ]),
        );
        await waitFor(() => {
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent(elements.trendingFamousList(component), 'onEndReached');
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.paginationReload(component)).not.toBeNull();
        });
        expect(elements.trendingFamousListItems(component).length).toEqual(
          TRENDING_FAMOUS_ITEMS_PER_PAGE,
        );
        act(() => {
          fireEvent.press(elements.paginationReload(component)!);
        });
        await waitFor(() => {
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE * 2,
          );
        });
        for (let i = 0; i < TRENDING_FAMOUS_ITEMS_PER_PAGE * 2; i++) {
          if (i < TRENDING_FAMOUS_ITEMS_PER_PAGE) {
            expect(
              (
                elements.famousNames(component)[i]!.children[0] as string
              ).startsWith('page1'),
            ).toEqual(true);
          } else {
            expect(
              (
                elements.famousNames(component)[i]!.children[0] as string
              ).startsWith('page2'),
            ).toEqual(true);
          }
        }
      });

      it('should show the "alert-error-message" when the "retry-response" returns "another error"', async () => {
        const entryQueryResults = mockTrendingFamousEntryQuerySuccessResponse();
        const paginationQueryResults =
          mockTrendingFamousPaginationQueryErrorResponse(getErrorType());
        const component = render(
          renderTrendingFamous([
            ...entryQueryResults,
            ...paginationQueryResults,
          ]),
        );
        await waitFor(() => {
          expect(elements.trendingFamousListItems(component).length).toEqual(
            TRENDING_FAMOUS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent(elements.trendingFamousList(component), 'onEndReached');
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.paginationReload(component)).not.toBeNull();
        });
        act(() => {
          fireEvent.press(elements.paginationReload(component)!);
        });
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.alertMessageIcon(component)).not.toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component)!.children[0]).toEqual(
            Translations.TrendingFamous.PAGINATION_ERROR,
          );
        });
      });
    });
  });

  describe('Pressing items', () => {
    it('should navigate to "Search" when "pressing" the "header-cta"', () => {
      const navigate = jest.fn();
      const component = render(
        renderTrendingFamous(
          mockTrendingFamousEntryQuerySuccessResponse(),
          navigate,
        ),
      );
      expect(navigate).toBeCalledTimes(0);
      fireEvent.press(elements.headerCTA(component));
      expect(navigate).toBeCalledTimes(1);
      expect(navigate).toBeCalledWith(Routes.Famous.SEARCH_FAMOUS, {
        type: SearchType.FAMOUS,
      });
    });

    it('should navigate to "Famous-Details" when "pressing" the "some famous"', async () => {
      const navigate = jest.fn();
      const indexItemSelected = randomPositiveNumber(
        TRENDING_FAMOUS_ITEMS_PER_PAGE - 1,
      );
      const component = render(
        renderTrendingFamous(
          mockTrendingFamousEntryQuerySuccessResponse(),
          navigate,
        ),
      );
      await waitFor(() => {
        expect(
          elements.trendingFamousListItems(component).length,
        ).toBeGreaterThan(0);
      });
      expect(navigate).toBeCalledTimes(0);
      fireEvent.press(
        elements.trendingFamousListItems(component)[indexItemSelected],
      );
      expect(navigate).toBeCalledTimes(1);
      expect(navigate).toBeCalledWith(
        Routes.Famous.DETAILS,
        trendingFamousList()[indexItemSelected],
      );
    });
  });
});
