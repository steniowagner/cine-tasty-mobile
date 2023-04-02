jest.unmock('react-native-reanimated');
import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';
import {MockedResponse, MockedProvider} from '@apollo/client/testing';
import {InMemoryCache} from '@apollo/client';
import {DocumentNode} from 'graphql';

import {TMDBImageQualitiesProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {dark as theme} from '@styles/themes/dark';
import MockedNavigation from '@mocks/MockedNavigator';
import {AlertMessageProvider} from '@providers';
import {Routes} from '@routes/routes';
import possibleTypes from '@graphql/possibleTypes.json';
import * as viewAllFixtures from '@mocks/fixtures/media-view-all';
import {getQuery} from '@graphql/queries';
import {randomPositiveNumber} from '@mocks/utils';

import {MediaSectionViewAll} from './MediaSectionViewAll';
import {MediaSectionViewAllParams} from '../routes/route-params-types';
import {MediaTrendingItem} from './on-get-data/types';
import {Translations} from '@i18n/tags';

const HEADER_TITLE = 'HEADER_TITLE';

type RenderMediaSectionViewAllParams = MediaSectionViewAllParams & {
  mockResolvers?: readonly MockedResponse<Record<string, any>>[];
  navigate?: jest.Mock;
};

type CheckHasAllItemsParams = {
  elements: Record<string, any>;
  component: RenderAPI;
  items: MediaTrendingItem[];
};

const checkHasAllItems = (params: CheckHasAllItemsParams) => {
  if (
    params.elements.viewAllListItemsTitles(params.component).length !==
    params.items.length
  ) {
    return false;
  }
  return params.elements
    .viewAllListItemsTitles(params.component)
    .every(
      (viewAllListItemsTitles, index) =>
        viewAllListItemsTitles.children[0] === params.items[index].title,
    );
};

const renderMediaSectionViewAll = (params: RenderMediaSectionViewAllParams) => {
  const MediaSectionViewAllComponent = ({navigation}) => (
    <MockedProvider
      mocks={params.mockResolvers}
      defaultOptions={{
        watchQuery: {fetchPolicy: 'no-cache'},
        query: {fetchPolicy: 'no-cache'},
      }}
      cache={
        new InMemoryCache({
          possibleTypes,
        })
      }>
      <TMDBImageQualitiesProvider>
        <ThemeProvider theme={theme}>
          <AlertMessageProvider>
            <MediaSectionViewAll
              navigation={{
                ...navigation,
                navigate: params.navigate || jest.fn(),
              }}
              route={{
                name: Routes.Home.MEDIA_DETAILS_VIEW_ALL,
                key: `${Routes.Home.MEDIA_DETAILS_VIEW_ALL}-key`,
                params: {
                  sectionKey: params.sectionKey,
                  initialDataset: params.initialDataset,
                  headerTitle: params.headerTitle,
                  isMovie: params.isMovie,
                },
              }}
            />
          </AlertMessageProvider>
        </ThemeProvider>
      </TMDBImageQualitiesProvider>
    </MockedProvider>
  );
  return <MockedNavigation component={MediaSectionViewAllComponent} />;
};

describe('<MediaSectionViewAll />', () => {
  const elements = {
    viewAllList: (api: RenderAPI) => api.queryByTestId('media-view-all-list'),
    viewAllListItems: (api: RenderAPI) =>
      api.queryAllByTestId('full-media-list-item'),
    viewAllListItemsTitles: (api: RenderAPI) =>
      api.queryAllByTestId('full-media-list-item-text'),
    paginatingSpinner: (api: RenderAPI) =>
      api.queryByTestId('pagination-loading-footer-wrapper'),
    reloadButton: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-reload-button'),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
    alertMessageWrapper: (api: RenderAPI) =>
      api.queryByTestId('alert-message-wrapper'),
  };

  describe('When the "Media" is "Movie"', () => {
    const isMovie = true;

    describe('When the "Trending" is "Now Playing"', () => {
      const query = getQuery('now_playing_movies') as DocumentNode;
      const trendingKey = 'nowPlaying';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "initial-items" correctly', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        expect(elements.viewAllList(component)).not.toBeNull();
        expect(elements.viewAllListItems(component).length).toEqual(
          initialDataset.length,
        );
        for (let i = 0; i < initialDataset.length; i++) {
          expect(
            elements.viewAllListItemsTitles(component)[i].children[0],
          ).toEqual(initialDataset[i].title);
        }
        await waitFor(() => {});
      });

      it('should show the "pagination-footer" when it is "paginating"', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        fireEvent(elements.viewAllList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.viewAllList(component)).not.toBeNull();
          expect(elements.viewAllListItems(component).length).toEqual(
            initialDataset.length,
          );
          expect(elements.paginatingSpinner(component)).not.toBeNull();
        });
      });

      describe('Pressing some of the items', () => {
        it('should call "navigate" correctly', () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(10, 1),
              1,
            );
          const indexItemSelected = randomPositiveNumber(
            initialDataset.length - 1,
            0,
          );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: randomPositiveNumber(10, 1),
            trendingKey,
            query,
            isMovie,
          });
          const navigate = jest.fn();
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              navigate,
              isMovie,
            }),
          );
          expect(navigate).toHaveBeenCalledTimes(0);
          fireEvent.press(
            elements.viewAllListItems(component)[indexItemSelected],
          );
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Home.MOVIE_DETAILS, {
            genreIds: initialDataset[indexItemSelected].genreIds,
            voteAverage: initialDataset[indexItemSelected].voteAverage,
            posterPath: initialDataset[indexItemSelected].posterPath,
            voteCount: initialDataset[indexItemSelected].voteCount,
            title: initialDataset[indexItemSelected].title,
            id: initialDataset[indexItemSelected].id,
          });
        });
      });

      describe('When paginates successfully', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should show the "footer" properly', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).not.toBeNull();
            expect(elements.reloadButton(component)).toBeNull();
          });
        });

        it('should concat the new items with the existing items', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const datasetAfterPagination =
            initialDataset.concat(paginationDataset);
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).toBeNull();
            expect(elements.viewAllListItems(component).length).toEqual(
              datasetAfterPagination.length,
            );
          });
          expect(
            checkHasAllItems({
              items: datasetAfterPagination,
              elements,
              component,
            }),
          ).toEqual(true);
        });
      });

      describe('When pagination fails', () => {
        const paginationErrorMessage =
          Translations.Tags.HOME_MOVIES_PAGINATION_ERROR;

        describe('When a "NetworkError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationNetworkErrorRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "GraphlQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });

        describe('When a "GraphQLError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationGraphQLRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "GraphQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });
      });
    });

    describe('When the "Trending" is "Popular"', () => {
      const query = getQuery('popular_movies') as DocumentNode;
      const trendingKey = 'popular';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "initial-items" correctly', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        expect(elements.viewAllList(component)).not.toBeNull();
        expect(elements.viewAllListItems(component).length).toEqual(
          initialDataset.length,
        );
        for (let i = 0; i < initialDataset.length; i++) {
          expect(
            elements.viewAllListItemsTitles(component)[i].children[0],
          ).toEqual(initialDataset[i].title);
        }
        await waitFor(() => {});
      });

      it('should show the "pagination-footer" when it is "paginating"', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        fireEvent(elements.viewAllList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.viewAllList(component)).not.toBeNull();
          expect(elements.viewAllListItems(component).length).toEqual(
            initialDataset.length,
          );
          expect(elements.paginatingSpinner(component)).not.toBeNull();
        });
      });

      describe('Pressing some of the items', () => {
        it('should call "navigate" correctly', () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(10, 1),
              1,
            );
          const indexItemSelected = randomPositiveNumber(
            initialDataset.length - 1,
            0,
          );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: randomPositiveNumber(10, 1),
            trendingKey,
            query,
            isMovie,
          });
          const navigate = jest.fn();
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              navigate,
              isMovie,
            }),
          );
          expect(navigate).toHaveBeenCalledTimes(0);
          fireEvent.press(
            elements.viewAllListItems(component)[indexItemSelected],
          );
          expect(navigate).toHaveBeenCalledTimes(1);
        });
      });

      describe('When paginates successfully', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should show the "footer" properly', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).not.toBeNull();
            expect(elements.reloadButton(component)).toBeNull();
          });
        });

        it('should concat the new items with the existing items', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const datasetAfterPagination =
            initialDataset.concat(paginationDataset);
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).toBeNull();
            expect(elements.viewAllListItems(component).length).toEqual(
              datasetAfterPagination.length,
            );
          });
          expect(
            checkHasAllItems({
              items: datasetAfterPagination,
              elements,
              component,
            }),
          ).toEqual(true);
        });
      });

      describe('When pagination fails', () => {
        const paginationErrorMessage =
          Translations.Tags.HOME_MOVIES_PAGINATION_ERROR;

        describe('When a "NetworkError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationNetworkErrorRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "GraphlQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });

        describe('When a "GraphQLError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationGraphQLRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "GraphQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });
      });
    });

    describe('When the "Trending" is "Top Rated"', () => {
      const query = getQuery('top_rated_movies') as DocumentNode;
      const trendingKey = 'topRated';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "initial-items" correctly', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        expect(elements.viewAllList(component)).not.toBeNull();
        expect(elements.viewAllListItems(component).length).toEqual(
          initialDataset.length,
        );
        for (let i = 0; i < initialDataset.length; i++) {
          expect(
            elements.viewAllListItemsTitles(component)[i].children[0],
          ).toEqual(initialDataset[i].title);
        }
        await waitFor(() => {});
      });

      it('should show the "pagination-footer" when it is "paginating"', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        fireEvent(elements.viewAllList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.viewAllList(component)).not.toBeNull();
          expect(elements.viewAllListItems(component).length).toEqual(
            initialDataset.length,
          );
          expect(elements.paginatingSpinner(component)).not.toBeNull();
        });
      });

      describe('Pressing some of the items', () => {
        it('should call "navigate" correctly', () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(10, 1),
              1,
            );
          const indexItemSelected = randomPositiveNumber(
            initialDataset.length - 1,
            0,
          );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: randomPositiveNumber(10, 1),
            trendingKey,
            query,
            isMovie,
          });
          const navigate = jest.fn();
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              navigate,
              isMovie,
            }),
          );
          expect(navigate).toHaveBeenCalledTimes(0);
          fireEvent.press(
            elements.viewAllListItems(component)[indexItemSelected],
          );
          expect(navigate).toHaveBeenCalledTimes(1);
        });
      });

      describe('When paginates successfully', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should show the "footer" properly', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).not.toBeNull();
            expect(elements.reloadButton(component)).toBeNull();
          });
        });

        it('should concat the new items with the existing items', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const datasetAfterPagination =
            initialDataset.concat(paginationDataset);
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).toBeNull();
            expect(elements.viewAllListItems(component).length).toEqual(
              datasetAfterPagination.length,
            );
          });
          expect(
            checkHasAllItems({
              items: datasetAfterPagination,
              elements,
              component,
            }),
          ).toEqual(true);
        });
      });

      describe('When pagination fails', () => {
        const paginationErrorMessage =
          Translations.Tags.HOME_MOVIES_PAGINATION_ERROR;

        describe('When a "NetworkError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationNetworkErrorRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "GraphlQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });

        describe('When a "GraphQLError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationGraphQLRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "GraphQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });
      });
    });

    describe('When the "Trending" is "Upcoming"', () => {
      const query = getQuery('upcoming_movies') as DocumentNode;
      const trendingKey = 'upcoming';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "initial-items" correctly', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        expect(elements.viewAllList(component)).not.toBeNull();
        expect(elements.viewAllListItems(component).length).toEqual(
          initialDataset.length,
        );
        for (let i = 0; i < initialDataset.length; i++) {
          expect(
            elements.viewAllListItemsTitles(component)[i].children[0],
          ).toEqual(initialDataset[i].title);
        }
        await waitFor(() => {});
      });

      it('should show the "pagination-footer" when it is "paginating"', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        fireEvent(elements.viewAllList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.viewAllList(component)).not.toBeNull();
          expect(elements.viewAllListItems(component).length).toEqual(
            initialDataset.length,
          );
          expect(elements.paginatingSpinner(component)).not.toBeNull();
        });
      });

      describe('Pressing some of the items', () => {
        it('should call "navigate" correctly', () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(10, 1),
              1,
            );
          const indexItemSelected = randomPositiveNumber(
            initialDataset.length - 1,
            0,
          );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: randomPositiveNumber(10, 1),
            trendingKey,
            query,
            isMovie,
          });
          const navigate = jest.fn();
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              navigate,
              isMovie,
            }),
          );
          expect(navigate).toHaveBeenCalledTimes(0);
          fireEvent.press(
            elements.viewAllListItems(component)[indexItemSelected],
          );
          expect(navigate).toHaveBeenCalledTimes(1);
        });
      });

      describe('When paginates successfully', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should show the "footer" properly', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).not.toBeNull();
            expect(elements.reloadButton(component)).toBeNull();
          });
        });

        it('should concat the new items with the existing items', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const datasetAfterPagination =
            initialDataset.concat(paginationDataset);
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).toBeNull();
            expect(elements.viewAllListItems(component).length).toEqual(
              datasetAfterPagination.length,
            );
          });
          expect(
            checkHasAllItems({
              items: datasetAfterPagination,
              elements,
              component,
            }),
          ).toEqual(true);
        });
      });

      describe('When pagination fails', () => {
        const paginationErrorMessage =
          Translations.Tags.HOME_MOVIES_PAGINATION_ERROR;

        describe('When a "NetworkError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationNetworkErrorRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "GraphlQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });

        describe('When a "GraphQLError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationGraphQLRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "GraphQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  describe('When the "Media" is "TVShows"', () => {
    const isMovie = false;

    describe('When the "Trending" is "On the Air"', () => {
      const query = getQuery('on_the_air_tv_shows') as DocumentNode;
      const trendingKey = 'onTheAir';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "initial-items" correctly', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        expect(elements.viewAllList(component)).not.toBeNull();
        expect(elements.viewAllListItems(component).length).toEqual(
          initialDataset.length,
        );
        for (let i = 0; i < initialDataset.length; i++) {
          expect(
            elements.viewAllListItemsTitles(component)[i].children[0],
          ).toEqual(initialDataset[i].title);
        }
        await waitFor(() => {});
      });

      it('should show the "pagination-footer" when it is "paginating"', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        fireEvent(elements.viewAllList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.viewAllList(component)).not.toBeNull();
          expect(elements.viewAllListItems(component).length).toEqual(
            initialDataset.length,
          );
          expect(elements.paginatingSpinner(component)).not.toBeNull();
        });
      });

      describe('Pressing some of the items', () => {
        it('should call "navigate" correctly', () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(10, 1),
              1,
            );
          const indexItemSelected = randomPositiveNumber(
            initialDataset.length - 1,
            0,
          );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: randomPositiveNumber(10, 1),
            trendingKey,
            query,
            isMovie,
          });
          const navigate = jest.fn();
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              navigate,
              isMovie,
            }),
          );
          expect(navigate).toHaveBeenCalledTimes(0);
          fireEvent.press(
            elements.viewAllListItems(component)[indexItemSelected],
          );
          expect(navigate).toHaveBeenCalledTimes(1);
        });
      });

      describe('When paginates successfully', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should show the "footer" properly', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).not.toBeNull();
            expect(elements.reloadButton(component)).toBeNull();
          });
        });

        it('should concat the new items with the existing items', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const datasetAfterPagination =
            initialDataset.concat(paginationDataset);
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).toBeNull();
            expect(elements.viewAllListItems(component).length).toEqual(
              datasetAfterPagination.length,
            );
          });
          expect(
            checkHasAllItems({
              items: datasetAfterPagination,
              elements,
              component,
            }),
          ).toEqual(true);
        });
      });

      describe('When pagination fails', () => {
        const paginationErrorMessage =
          Translations.Tags.HOME_TV_SHOWS_PAGINATION_ERROR;

        describe('When a "NetworkError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationNetworkErrorRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "GraphlQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });

        describe('When a "GraphQLError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationGraphQLRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "GraphQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });
      });
    });

    describe('When the "Trending" is "Popular"', () => {
      const query = getQuery('popular_tv_shows') as DocumentNode;
      const trendingKey = 'popular';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "initial-items" correctly', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        expect(elements.viewAllList(component)).not.toBeNull();
        expect(elements.viewAllListItems(component).length).toEqual(
          initialDataset.length,
        );
        for (let i = 0; i < initialDataset.length; i++) {
          expect(
            elements.viewAllListItemsTitles(component)[i].children[0],
          ).toEqual(initialDataset[i].title);
        }
        await waitFor(() => {});
      });

      it('should show the "pagination-footer" when it is "paginating"', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        fireEvent(elements.viewAllList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.viewAllList(component)).not.toBeNull();
          expect(elements.viewAllListItems(component).length).toEqual(
            initialDataset.length,
          );
          expect(elements.paginatingSpinner(component)).not.toBeNull();
        });
      });

      describe('Pressing some of the items', () => {
        it('should call "navigate" correctly', () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(10, 1),
              1,
            );
          const indexItemSelected = randomPositiveNumber(
            initialDataset.length - 1,
            0,
          );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: randomPositiveNumber(10, 1),
            trendingKey,
            query,
            isMovie,
          });
          const navigate = jest.fn();
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              navigate,
              isMovie,
            }),
          );
          expect(navigate).toHaveBeenCalledTimes(0);
          fireEvent.press(
            elements.viewAllListItems(component)[indexItemSelected],
          );
          expect(navigate).toHaveBeenCalledTimes(1);
        });
      });

      describe('When paginates successfully', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should show the "footer" properly', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).not.toBeNull();
            expect(elements.reloadButton(component)).toBeNull();
          });
        });

        it('should concat the new items with the existing items', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const datasetAfterPagination =
            initialDataset.concat(paginationDataset);
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).toBeNull();
            expect(elements.viewAllListItems(component).length).toEqual(
              datasetAfterPagination.length,
            );
          });
          expect(
            checkHasAllItems({
              items: datasetAfterPagination,
              elements,
              component,
            }),
          ).toEqual(true);
        });
      });

      describe('When pagination fails', () => {
        const paginationErrorMessage =
          Translations.Tags.HOME_TV_SHOWS_PAGINATION_ERROR;

        describe('When a "NetworkError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationNetworkErrorRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "GraphlQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });

        describe('When a "GraphQLError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationGraphQLRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "GraphQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });
      });
    });

    describe('When the "Trending" is "Top Rated"', () => {
      const query = getQuery('top_rated_tv_shows') as DocumentNode;
      const trendingKey = 'topRated';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "initial-items" correctly', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        expect(elements.viewAllList(component)).not.toBeNull();
        expect(elements.viewAllListItems(component).length).toEqual(
          initialDataset.length,
        );
        for (let i = 0; i < initialDataset.length; i++) {
          expect(
            elements.viewAllListItemsTitles(component)[i].children[0],
          ).toEqual(initialDataset[i].title);
        }
        await waitFor(() => {});
      });

      it('should show the "pagination-footer" when it is "paginating"', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        fireEvent(elements.viewAllList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.viewAllList(component)).not.toBeNull();
          expect(elements.viewAllListItems(component).length).toEqual(
            initialDataset.length,
          );
          expect(elements.paginatingSpinner(component)).not.toBeNull();
        });
      });

      describe('Pressing some of the items', () => {
        it('should call "navigate" correctly', () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(10, 1),
              1,
            );
          const indexItemSelected = randomPositiveNumber(
            initialDataset.length - 1,
            0,
          );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: randomPositiveNumber(10, 1),
            trendingKey,
            query,
            isMovie,
          });
          const navigate = jest.fn();
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              navigate,
              isMovie,
            }),
          );
          expect(navigate).toHaveBeenCalledTimes(0);
          fireEvent.press(
            elements.viewAllListItems(component)[indexItemSelected],
          );
          expect(navigate).toHaveBeenCalledTimes(1);
        });
      });

      describe('When paginates successfully', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should show the "footer" properly', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).not.toBeNull();
            expect(elements.reloadButton(component)).toBeNull();
          });
        });

        it('should concat the new items with the existing items', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const datasetAfterPagination =
            initialDataset.concat(paginationDataset);
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).toBeNull();
            expect(elements.viewAllListItems(component).length).toEqual(
              datasetAfterPagination.length,
            );
          });
          expect(
            checkHasAllItems({
              items: datasetAfterPagination,
              elements,
              component,
            }),
          ).toEqual(true);
        });
      });

      describe('When pagination fails', () => {
        const paginationErrorMessage =
          Translations.Tags.HOME_TV_SHOWS_PAGINATION_ERROR;

        describe('When a "NetworkError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationNetworkErrorRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "GraphlQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });

        describe('When a "GraphQLError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationGraphQLRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "GraphQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });
      });
    });

    describe('When the "Trending" is "Airing Today"', () => {
      const query = getQuery('airing_today_tv_shows') as DocumentNode;
      const trendingKey = 'airingToday';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "initial-items" correctly', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        expect(elements.viewAllList(component)).not.toBeNull();
        expect(elements.viewAllListItems(component).length).toEqual(
          initialDataset.length,
        );
        for (let i = 0; i < initialDataset.length; i++) {
          expect(
            elements.viewAllListItemsTitles(component)[i].children[0],
          ).toEqual(initialDataset[i].title);
        }
        await waitFor(() => {});
      });

      it('should show the "pagination-footer" when it is "paginating"', async () => {
        const initialDataset = viewAllFixtures.makeMoviesViewAllInitialDataset(
          randomPositiveNumber(10, 1),
          1,
        );
        const resolvers = viewAllFixtures.makePaginationSuccessQuery({
          numberOfItems: randomPositiveNumber(10, 1),
          trendingKey,
          query,
          isMovie,
        });
        const component = render(
          renderMediaSectionViewAll({
            mockResolvers: resolvers,
            initialDataset,
            sectionKey: trendingKey,
            headerTitle: HEADER_TITLE,
            isMovie,
          }),
        );
        fireEvent(elements.viewAllList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.viewAllList(component)).not.toBeNull();
          expect(elements.viewAllListItems(component).length).toEqual(
            initialDataset.length,
          );
          expect(elements.paginatingSpinner(component)).not.toBeNull();
        });
      });

      describe('Pressing some of the items', () => {
        it('should call "navigate" correctly', () => {
          const initialDataset =
            viewAllFixtures.makeTVShowViewAllInitialDataset(
              randomPositiveNumber(10, 1),
              1,
            );
          const indexItemSelected = randomPositiveNumber(
            initialDataset.length - 1,
            0,
          );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: randomPositiveNumber(10, 1),
            trendingKey,
            query,
            isMovie,
          });
          const navigate = jest.fn();
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              navigate,
              isMovie,
            }),
          );
          expect(navigate).toHaveBeenCalledTimes(0);
          fireEvent.press(
            elements.viewAllListItems(component)[indexItemSelected],
          );
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Home.TV_SHOW_DETAILS, {
            genreIds: initialDataset[indexItemSelected].genreIds,
            voteAverage: initialDataset[indexItemSelected].voteAverage,
            posterPath: initialDataset[indexItemSelected].posterPath,
            voteCount: initialDataset[indexItemSelected].voteCount,
            title: initialDataset[indexItemSelected].title,
            id: initialDataset[indexItemSelected].id,
          });
        });
      });

      describe('When paginates successfully', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should show the "footer" properly', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).not.toBeNull();
            expect(elements.reloadButton(component)).toBeNull();
          });
        });

        it('should concat the new items with the existing items', async () => {
          const initialDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              1,
            );
          const paginationDataset =
            viewAllFixtures.makeMoviesViewAllInitialDataset(
              randomPositiveNumber(5, 1),
              2,
            );
          const datasetAfterPagination =
            initialDataset.concat(paginationDataset);
          const resolvers = viewAllFixtures.makePaginationSuccessQuery({
            numberOfItems: paginationDataset.length,
            trendingKey,
            query,
            isMovie,
          });
          const component = render(
            renderMediaSectionViewAll({
              mockResolvers: resolvers,
              initialDataset,
              sectionKey: trendingKey,
              headerTitle: HEADER_TITLE,
              isMovie,
            }),
          );
          fireEvent(elements.viewAllList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.paginatingSpinner(component)).toBeNull();
            expect(elements.viewAllListItems(component).length).toEqual(
              datasetAfterPagination.length,
            );
          });
          expect(
            checkHasAllItems({
              items: datasetAfterPagination,
              elements,
              component,
            }),
          ).toEqual(true);
        });
      });

      describe('When pagination fails', () => {
        const paginationErrorMessage =
          Translations.Tags.HOME_TV_SHOWS_PAGINATION_ERROR;

        describe('When a "NetworkError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationNetworkErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationNetworkErrorRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "GraphlQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationNetworkErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });

        describe('When a "GraphQLError" happens', () => {
          describe('When trying to paginate for the first time', () => {
            it('should show the "footer" properly', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  1,
                );
              const paginationDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(5, 1),
                  2,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: paginationDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).not.toBeNull();
                expect(elements.reloadButton(component)).toBeNull();
              });
              await waitFor(() => {
                expect(elements.paginatingSpinner(component)).toBeNull();
                expect(elements.reloadButton(component)).not.toBeNull();
              });
            });

            it('should only show the "initial-dataset" items', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.reloadButton(component)).not.toBeNull();
              });
              expect(
                checkHasAllItems({
                  items: initialDataset,
                  elements,
                  component,
                }),
              ).toEqual(true);
            });

            it('should show the error message', async () => {
              const initialDataset =
                viewAllFixtures.makeMoviesViewAllInitialDataset(
                  randomPositiveNumber(10, 1),
                  1,
                );
              const resolvers = viewAllFixtures.makePaginationGraphQLErrorQuery(
                {
                  numberOfItems: initialDataset.length,
                  trendingKey,
                  query,
                  isMovie,
                },
              );
              const component = render(
                renderMediaSectionViewAll({
                  mockResolvers: resolvers,
                  initialDataset,
                  sectionKey: trendingKey,
                  headerTitle: HEADER_TITLE,
                  isMovie,
                }),
              );
              fireEvent(elements.viewAllList(component), 'onEndReached');
              await waitFor(() => {
                expect(elements.alertMessageWrapper(component)).not.toBeNull();
                expect(elements.alertMessageText(component)).not.toBeNull();
                expect(
                  elements.alertMessageText(component).children[0],
                ).toEqual(paginationErrorMessage);
              });
            });
          });

          describe('When trying to paginate again', () => {
            describe('When succesfully paginates after the error', () => {
              beforeEach(() => {
                jest.useFakeTimers();
              });

              afterEach(cleanup);

              it('should concat the new items with the existing items', async () => {
                const initialDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    1,
                  );
                const paginationDataset =
                  viewAllFixtures.makeMoviesViewAllInitialDataset(
                    randomPositiveNumber(5, 1),
                    2,
                  );
                const datasetAfterPagination =
                  initialDataset.concat(paginationDataset);
                const resolvers =
                  viewAllFixtures.makePaginationGraphQLRefetchSuccess({
                    numberOfItems: paginationDataset.length,
                    trendingKey,
                    query,
                    isMovie,
                  });
                const component = render(
                  renderMediaSectionViewAll({
                    mockResolvers: resolvers,
                    initialDataset,
                    sectionKey: trendingKey,
                    headerTitle: HEADER_TITLE,
                    isMovie,
                  }),
                );
                fireEvent(elements.viewAllList(component), 'onEndReached');
                await waitFor(() => {
                  expect(elements.reloadButton(component)).not.toBeNull();
                });
                fireEvent.press(elements.reloadButton(component));
                await waitFor(() => {
                  expect(
                    checkHasAllItems({
                      items: datasetAfterPagination,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });
              });
            });

            describe('When another error happens', () => {
              describe('When another "GraphQLError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchGraphQLError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });

              describe('When a "NetworkError" happens', () => {
                afterEach(cleanup);

                it('should show the "footer" properly', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      1,
                    );
                  const paginationDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(5, 1),
                      2,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: paginationDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.paginatingSpinner(component),
                    ).not.toBeNull();
                    expect(elements.reloadButton(component)).toBeNull();
                  });
                  await waitFor(() => {
                    expect(elements.paginatingSpinner(component)).toBeNull();
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                });

                it('should only show the "initial-dataset" items', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(elements.reloadButton(component)).not.toBeNull();
                  });
                  expect(
                    checkHasAllItems({
                      items: initialDataset,
                      elements,
                      component,
                    }),
                  ).toEqual(true);
                });

                it('should show the error message', async () => {
                  const initialDataset =
                    viewAllFixtures.makeMoviesViewAllInitialDataset(
                      randomPositiveNumber(10, 1),
                      1,
                    );
                  const resolvers =
                    viewAllFixtures.makePaginationGraphQLErrorRefetchNetworkError(
                      {
                        numberOfItems: initialDataset.length,
                        trendingKey,
                        query,
                        isMovie,
                      },
                    );
                  const component = render(
                    renderMediaSectionViewAll({
                      mockResolvers: resolvers,
                      initialDataset,
                      sectionKey: trendingKey,
                      headerTitle: HEADER_TITLE,
                      isMovie,
                    }),
                  );
                  fireEvent(elements.viewAllList(component), 'onEndReached');
                  await waitFor(() => {
                    expect(
                      elements.alertMessageWrapper(component),
                    ).not.toBeNull();
                    expect(elements.alertMessageText(component)).not.toBeNull();
                    expect(
                      elements.alertMessageText(component).children[0],
                    ).toEqual(paginationErrorMessage);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
