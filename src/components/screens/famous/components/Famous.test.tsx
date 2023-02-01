jest.unmock('react-native-reanimated');
import React from 'react';
import {
  fireEvent,
  cleanup,
  render,
  act,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {MockedResponse, MockedProvider} from '@apollo/client/testing';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {AlertMessageProvider} from '@providers';
import {setupTimeTravel} from '@mocks/timeTravel';
import possibleTypes from '@graphql/possibleTypes.json';
import MockedNavigation from '@mocks/MockedNavigator';
import * as famousFixtures from '@mocks/fixtures/famous';
import {randomPositiveNumber} from '@mocks/utils';
import {InMemoryCache} from '@apollo/client';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';

import {Famous} from './Famous';

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('@react-navigation/native', () => {
  const actualReactNavigationNative = jest.requireActual(
    '@react-navigation/native',
  );
  return {
    ...actualReactNavigationNative,
    useNavigation: () => mockNavigation,
  };
});

type CheckHasItemsFromFirstAndSecondPageParams = {
  elements: Record<string, any>;
  component: RenderAPI;
  numberOfFamous: number;
};

const checkHasItemsFromFirstAndSecondPage = async (
  params: CheckHasItemsFromFirstAndSecondPageParams,
) => {
  await waitFor(() => {
    expect(
      params.elements.famousListItems(params.component).length,
    ).toBeGreaterThan(params.numberOfFamous);
  });
  for (
    let i = 0;
    i < params.elements.famousListItems(params.component).length;
    i++
  ) {
    if (i < params.numberOfFamous) {
      expect(
        params.elements.famousListItemNames(params.component)[i].children[0],
      ).toEqual(`page1-name-${i}-1`);
    } else {
      expect(
        params.elements.famousListItemNames(params.component)[i].children[0],
      ).toEqual(`page2-name-${Math.abs(params.numberOfFamous - i)}-2`);
    }
  }
};

const checkIsRenderingErrorCorrectly = async (
  elements: Record<string, any>,
  component: RenderAPI,
) => {
  expect(elements.topReloadButton(component)).toBeNull();
  expect(elements.famousLoadingList(component)).not.toBeNull();
  await waitFor(() => {
    expect(elements.topReloadButton(component)).not.toBeNull();
    expect(elements.famousListItem(component).length).toEqual(0);
    expect(elements.famousLoadingList(component)).toBeNull();
    expect(elements.alertMessageText(component).children[0]).toEqual(
      Translations.Tags.FAMOUS_ENTRY_QUERY_ERROR,
    );
  });
};

const checkIsRenderingPaginationErrorCorrect = async (
  elements: Record<string, any>,
  component: RenderAPI,
) => {
  await waitFor(() => {
    expect(elements.alertMessageWrapper(component)).not.toBeNull();
    expect(elements.alertMessageText(component)).not.toBeNull();
    expect(elements.alertMessageText(component).children[0]).toEqual(
      Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
    );
    expect(elements.paginationFooter(component)).not.toBeNull();
    expect(elements.paginationReloadButton(component)).not.toBeNull();
    expect(elements.paginationLoading(component)).toBeNull();
  });
};

const scrollFamousListToBottom = async (
  elements: Record<string, any>,
  component: RenderAPI,
) => {
  await waitFor(() => {
    expect(elements.famousListItem(component).length).toBeGreaterThan(0);
  });
  expect(elements.famousLoadingList(component)).toBeNull();
  fireEvent(elements.famousList(component), 'onEndReached');
};

const renderFamous = (
  mockResolvers?: readonly MockedResponse<Record<string, any>>[],
  navigate = jest.fn(),
) => {
  const FamousScreen = ({navigation, route}) => (
    <MockedProvider
      mocks={mockResolvers}
      defaultOptions={{
        watchQuery: {fetchPolicy: 'no-cache'},
        query: {fetchPolicy: 'no-cache'},
      }}
      cache={
        new InMemoryCache({
          possibleTypes,
        })
      }>
      <AlertMessageProvider>
        <TMDBImageQualityProvider>
          <Famous navigation={{...navigation, navigate}} route={route} />
        </TMDBImageQualityProvider>
      </AlertMessageProvider>
    </MockedProvider>
  );

  return (
    <MockedNavigation
      extraScreens={[Routes.Famous.DETAILS]}
      component={FamousScreen}
    />
  );
};

describe('<Famous />', () => {
  afterEach(cleanup);

  beforeEach(setupTimeTravel);

  const elements = {
    famousList: (api: RenderAPI) => api.queryByTestId('famous-list'),
    topReloadButton: (api: RenderAPI) => api.queryByTestId('top-reload-button'),
    paginationFooter: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-wrapper'),
    paginationLoading: (api: RenderAPI) =>
      api.queryByTestId('pagination-loading-footer-wrapper'),
    paginationReloadButton: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-reload-button'),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
    alertMessageWrapper: (api: RenderAPI) =>
      api.queryByTestId('alert-message-wrapper'),
    headerIconButton: (api: RenderAPI) =>
      api.queryByTestId('header-icon-button-wrapper-magnify'),
    famousLoadingList: (api: RenderAPI) =>
      api.queryByTestId('famous-loading-list'),
    famousListItem: (api: RenderAPI) =>
      api.queryAllByTestId('famous-list-item-button'),
    famousListItemNames: (api: RenderAPI) => api.queryAllByTestId('title-text'),
    famousListItems: (api: RenderAPI) =>
      api.queryAllByTestId('famous-list-item-button'),
  };

  describe('Entry Query', () => {
    describe('Success', () => {
      afterEach(cleanup);

      it('should show the "Loading-state" when is loading the data', async () => {
        const resolvers = famousFixtures.makeEntryQuerySuccessResolver(1, 1);
        const component = render(renderFamous(resolvers));
        expect(elements.famousList(component)).toBeNull();
        expect(elements.topReloadButton(component)).toBeNull();
        expect(elements.paginationFooter(component)).toBeNull();
        expect(elements.alertMessageWrapper(component)).toBeNull();
        expect(elements.headerIconButton(component)).not.toBeNull();
        expect(elements.famousLoadingList(component)).not.toBeNull();
        await waitFor(() => {});
      });

      it('should not show the "Famous-list" when the data is loaded', async () => {
        const numberOfFamous = randomPositiveNumber(10, 1);
        const resolvers = famousFixtures.makeEntryQuerySuccessResolver(
          1,
          numberOfFamous,
        );
        const component = render(renderFamous(resolvers));
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.famousLoadingList(component)).toBeNull();
        });
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.famousListItem(component).length).toEqual(
          numberOfFamous,
        );
        expect(elements.topReloadButton(component)).toBeNull();
        expect(elements.paginationFooter(component)).toBeNull();
        expect(elements.alertMessageWrapper(component)).toBeNull();
        expect(elements.headerIconButton(component)).not.toBeNull();
        await waitFor(() => {});
      });
    });

    describe('Error', () => {
      describe('Network-error', () => {
        it('should render correctly when had a "Network-error" during the "Entry-query"', async () => {
          const numberOfFamous = randomPositiveNumber(10, 1);
          const resolvers = famousFixtures.makeEntryQueryNetworkResolver(
            1,
            numberOfFamous,
          );
          const component = render(renderFamous(resolvers));
          await checkIsRenderingErrorCorrectly(elements, component);
          await waitFor(() => {});
        });
      });

      describe('GraphQL-error', () => {
        it('should render correctly when had a "GraphQL-error" during the "Entry-query"', async () => {
          const numberOfFamous = randomPositiveNumber(10, 1);
          const resolvers = famousFixtures.makeEntryQueryGraphQLResolver(
            1,
            numberOfFamous,
          );
          const component = render(renderFamous(resolvers));
          await checkIsRenderingErrorCorrectly(elements, component);
          await waitFor(() => {});
        });
      });

      describe('Error/Refetch/Success', () => {
        describe('Network-error/Refetch/Success', () => {
          it('should refetch the data and show the "famous-list" correctly when the user presses the "top-reload-button"', async () => {
            const numberOfFamous = randomPositiveNumber(10, 1);
            const resolvers =
              famousFixtures.makeEntryQueryWithNetworkErrorResolver(
                1,
                numberOfFamous,
              );
            const component = render(renderFamous(resolvers));
            await waitFor(() => {
              expect(elements.topReloadButton(component)).not.toBeNull();
              expect(elements.famousListItem(component).length).toEqual(0);
              expect(elements.famousLoadingList(component)).toBeNull();
            });
            fireEvent.press(elements.topReloadButton(component));
            await waitFor(() => {
              expect(elements.famousListItem(component).length).toEqual(
                numberOfFamous,
              );
            });
            await waitFor(() => {});
          });
        });

        describe('GraphlQL-error/Refetch/Success', () => {
          it('should refetch the data and show the "famous-list" correctly when the user presses the "top-reload-button"', async () => {
            const numberOfFamous = randomPositiveNumber(10, 1);
            const resolvers =
              famousFixtures.makeEntryQueryWithGraphQLErrorResolver(
                1,
                numberOfFamous,
              );
            const component = render(renderFamous(resolvers));
            await waitFor(() => {
              expect(elements.topReloadButton(component)).not.toBeNull();
              expect(elements.famousListItem(component).length).toEqual(0);
              expect(elements.famousLoadingList(component)).toBeNull();
            });
            fireEvent.press(elements.topReloadButton(component));
            await waitFor(() => {
              expect(elements.famousListItem(component).length).toEqual(
                numberOfFamous,
              );
            });
            await waitFor(() => {});
          });
        });
      });

      describe('Error/Refetch/Error', () => {
        describe('Network-error/Refecth/Network-error', () => {
          it('should render corretly when had an "Network-error", tried to "refetch" and then had another "Network-error"', async () => {
            const numberOfFamous = randomPositiveNumber(10, 1);
            const resolvers =
              famousFixtures.makeRefetchQueryWithDoubleNetworkError(
                1,
                numberOfFamous,
              );
            const component = render(renderFamous(resolvers));
            expect(elements.alertMessageWrapper(component)).toBeNull();
            await checkIsRenderingErrorCorrectly(elements, component);
            fireEvent.press(elements.topReloadButton(component));
            await checkIsRenderingErrorCorrectly(elements, component);
            await waitFor(() => {});
          });
        });

        describe('GraphlQL-error/Refecth/GraphlQL-error', () => {
          it('should render corretly when had an "GraphQL-error", tried to "refetch" and then had another "GraphQL-error', async () => {
            const numberOfFamous = randomPositiveNumber(10, 1);
            const resolvers =
              famousFixtures.makeRefetchQueryWithDoubleGraphQLError(
                1,
                numberOfFamous,
              );
            const component = render(renderFamous(resolvers));
            expect(elements.alertMessageWrapper(component)).toBeNull();
            await checkIsRenderingErrorCorrectly(elements, component);
            fireEvent.press(elements.topReloadButton(component));
            await checkIsRenderingErrorCorrectly(elements, component);
            await waitFor(() => {});
          });
        });
      });
    });
  });

  describe('Pagination', () => {
    describe('Success', () => {
      it('should show the "pagination-loading" when the user "scrolls" the "famous-list" to the bottom', async () => {
        const numberOfFamous = randomPositiveNumber(10, 1);
        const resolvers =
          famousFixtures.makePaginationSuccessQuery(numberOfFamous);
        const component = render(renderFamous(resolvers));
        await scrollFamousListToBottom(elements, component);
        await waitFor(() => {
          expect(elements.paginationFooter(component)).not.toBeNull();
          expect(elements.paginationLoading(component)).not.toBeNull();
        });
        await waitFor(() => {});
      });

      it('should "hide" the "pagination-loading" when the "pagination" process is "completed"', async () => {
        const numberOfFamous = randomPositiveNumber(10, 1);
        const resolvers =
          famousFixtures.makePaginationSuccessQuery(numberOfFamous);
        const component = render(renderFamous(resolvers));
        await scrollFamousListToBottom(elements, component);
        await waitFor(() => {
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.paginationLoading(component)).toBeNull();
          expect(elements.famousListItems(component).length).toBeGreaterThan(
            numberOfFamous,
          );
        });
        await waitFor(() => {});
      });

      it('should not "paginate" to the "next-page" when the "current-page.hasMore" is "false"', async () => {
        const numberOfFamous = randomPositiveNumber(10, 1);
        const resolvers = famousFixtures.makePaginationSuccessQuery(
          numberOfFamous,
          false,
        );
        const component = render(renderFamous(resolvers));
        await scrollFamousListToBottom(elements, component);
        await waitFor(() => {
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.paginationLoading(component)).toBeNull();
          expect(elements.famousListItems(component).length).toEqual(
            numberOfFamous,
          );
        });
        for (let i = 0; i < elements.famousListItems(component).length; i++) {
          expect(
            elements.famousListItemNames(component)[i].children[0],
          ).toEqual(`page1-name-${i}-1`);
        }
        await waitFor(() => {});
      });

      it('should "paginate" to the "next-page" when the "current-page.hasMore" is "true"', async () => {
        const numberOfFamous = randomPositiveNumber(10, 1);
        const resolvers =
          famousFixtures.makePaginationSuccessQuery(numberOfFamous);
        const component = render(renderFamous(resolvers));
        await scrollFamousListToBottom(elements, component);
        await checkHasItemsFromFirstAndSecondPage({
          elements,
          component,
          numberOfFamous,
        });
        await waitFor(() => {});
      });
    });

    describe('Error', () => {
      describe('Network-error', () => {
        it('should show the "pagination-reload-button" and the "error-message" when the user tries to "paginate" and a "Networking-error" occurs', async () => {
          const numberOfFamous = randomPositiveNumber(10, 1);
          const resolvers =
            famousFixtures.makePaginationNetworkErrorQuery(numberOfFamous);
          const component = render(renderFamous(resolvers));
          await scrollFamousListToBottom(elements, component);
          await checkIsRenderingPaginationErrorCorrect(elements, component);
        });
      });

      describe('GraphQL-error', () => {
        it('should show the "pagination-reload-button" and the "error-message" when the user tries to "paginate" and a "GraphQL-error" occurs', async () => {
          const numberOfFamous = randomPositiveNumber(10, 1);
          const resolvers =
            famousFixtures.makePaginationGraphQLErrorQuery(numberOfFamous);
          const component = render(renderFamous(resolvers));
          await scrollFamousListToBottom(elements, component);
          await checkIsRenderingPaginationErrorCorrect(elements, component);
        });
      });

      describe('Paginate/Network-error/Refetch/*', () => {
        describe('Success', () => {
          it('should "paginate" to the "next-page" after a "Network-error" and a refetch', async () => {
            const numberOfFamous = randomPositiveNumber(10, 1);
            const resolvers =
              famousFixtures.makePaginationNetworkErrorRefetchSuccess(
                numberOfFamous,
              );
            const component = render(renderFamous(resolvers));
            await scrollFamousListToBottom(elements, component);
            await checkIsRenderingPaginationErrorCorrect(elements, component);
            fireEvent.press(elements.paginationReloadButton(component));
            await checkHasItemsFromFirstAndSecondPage({
              elements,
              component,
              numberOfFamous,
            });
            await waitFor(() => {});
          });
        });

        describe('Network-error', () => {
          it('should show the "pagination-reload-button" and the "error-message" when the user tries to "paginate" and a "Network-error" occur, and then tries to "paginate again" and has another "Network-error"', async () => {
            const numberOfFamous = randomPositiveNumber(10, 1);
            const resolvers =
              famousFixtures.makePaginationNetworkErrorRefetchNetworkError(
                numberOfFamous,
              );
            const component = render(renderFamous(resolvers));
            await scrollFamousListToBottom(elements, component);
            await checkIsRenderingPaginationErrorCorrect(elements, component);
            fireEvent.press(elements.paginationReloadButton(component));
            await checkIsRenderingPaginationErrorCorrect(elements, component);
            await waitFor(() => {});
          });
        });

        describe('GraphQL-error', () => {
          it('should show the "pagination-reload-button" and the "error-message" when the user tries to "paginate" and a "Network-error" occur, and then tries to "paginate again" and has another "GraphQL-error"', async () => {
            const numberOfFamous = randomPositiveNumber(10, 1);
            const resolvers =
              famousFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                numberOfFamous,
              );
            const component = render(renderFamous(resolvers));
            await scrollFamousListToBottom(elements, component);
            await checkIsRenderingPaginationErrorCorrect(elements, component);
            fireEvent.press(elements.paginationReloadButton(component));
            await checkIsRenderingPaginationErrorCorrect(elements, component);
            await waitFor(() => {});
          });
        });
      });

      describe('Paginate/GraphQL-error/Refetch/*', () => {
        describe('Success', () => {
          it('should "paginate" to the "next-page" after a "Network-error" and a refetch', async () => {
            const numberOfFamous = randomPositiveNumber(10, 1);
            const resolvers =
              famousFixtures.makePaginationGraphQLRefetchSuccess(
                numberOfFamous,
              );
            const component = render(renderFamous(resolvers));
            await scrollFamousListToBottom(elements, component);
            await checkIsRenderingPaginationErrorCorrect(elements, component);
            fireEvent.press(elements.paginationReloadButton(component));
            await checkHasItemsFromFirstAndSecondPage({
              elements,
              component,
              numberOfFamous,
            });
            await waitFor(() => {});
          });
        });

        describe('GraphQL-error', () => {
          it('should show the "pagination-reload-button" and the "error-message" when the user tries to "paginate" and a "GraphQL-error" occur, and then tries to "paginate again" and has another "GraphQL-error"', async () => {
            const numberOfFamous = randomPositiveNumber(10, 1);
            const resolvers =
              famousFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                numberOfFamous,
              );
            const component = render(renderFamous(resolvers));
            await scrollFamousListToBottom(elements, component);
            await checkIsRenderingPaginationErrorCorrect(elements, component);
            fireEvent.press(elements.paginationReloadButton(component));
            await checkIsRenderingPaginationErrorCorrect(elements, component);
            await waitFor(() => {});
          });
        });

        describe('Network-error', () => {
          it('should show the "pagination-reload-button" and the "error-message" when the user tries to "paginate" and a "GraphQL-error" occur, and then tries to "paginate again" and has another "Network-error"', async () => {
            const numberOfFamous = randomPositiveNumber(10, 1);
            const resolvers =
              famousFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                numberOfFamous,
              );
            const component = render(renderFamous(resolvers));
            await scrollFamousListToBottom(elements, component);
            await checkIsRenderingPaginationErrorCorrect(elements, component);
            fireEvent.press(elements.paginationReloadButton(component));
            await checkIsRenderingPaginationErrorCorrect(elements, component);
            await waitFor(() => {});
          });
        });
      });
    });
  });

  describe('Pressing the famous-list-items', () => {
    it('should navigate to the "Famous-detail"-screen when the user press some item on the "famous-list"', async () => {
      const navigate = jest.fn();
      const numberOfItems = randomPositiveNumber(10, 1);
      const indexItemSelected = randomPositiveNumber(numberOfItems - 1, 0);
      const resolvers = famousFixtures.makeEntryQuerySuccessResolver(
        1,
        numberOfItems,
      );
      const famousList = famousFixtures.famousList(numberOfItems);
      const component = render(renderFamous(resolvers, navigate));
      await waitFor(() => {
        expect(elements.famousList(component)).not.toBeNull();
      });
      fireEvent.press(elements.famousListItems(component)[indexItemSelected]);
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        Routes.Famous.DETAILS,
        {
          profileImage: famousList[indexItemSelected].profilePath,
          name: famousList[indexItemSelected].name,
          id: famousList[indexItemSelected].id,
        },
      );
    });
  });
});
