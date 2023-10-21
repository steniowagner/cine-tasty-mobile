import React from 'react';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';

import { AlertMessageProvider } from '@/providers';
import { NewsLanguage } from '@/types/schema';
import { Translations } from '@/i18n/tags';

import { languages } from './languages-filter-modal/language-filter-list/filter-languages/languages';
import { NewsStackProps } from '../routes/route-params-types';
import {
  MockedNavigator,
  mockNewsEntryQuerySuccessResponse,
  mockNewsEntryQueryErrorResponse,
  mockNewsPaginationQuerySuccessResponse,
  mockNewsPaginationQueryErrorResponse,
  NEWS_ITEMS_PER_PAGE,
  scrollFlatListToEnd,
  randomPositiveNumber,
  randomArrayIndex,
} from '../../../../../__mocks__';
import { News } from './News';

// english is selected by default, and won't trigger the entry query if it's selected
// since react won't recognize it as a state-change, size we would be changing to the same state
const languagesSortedInEnglishWithoutEnglish = [
  languages[1],
  languages[3],
  languages[11],
  languages[4],
  languages[5],
  languages[6],
  languages[7],
  languages[2],
  languages[8],
  languages[9],
  languages[10],
  languages[12],
];

const languagesSortedInEnglishWithEnglish = [
  languages[1],
  languages[3],
  languages[0],
  languages[11],
  languages[4],
  languages[5],
  languages[6],
  languages[7],
  languages[2],
  languages[8],
  languages[9],
  languages[10],
  languages[12],
];

const getErrorType = () =>
  randomPositiveNumber(1) % 2 === 0 ? 'network' : 'graphql';

const renderNews = (mocks: readonly MockedResponse<Record<string, any>>[]) => {
  const NewsComponent = (props: NewsStackProps) => (
    <MockedProvider
      mocks={mocks}
      defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
      }}>
      <AlertMessageProvider>
        <News navigation={props.navigation} />
      </AlertMessageProvider>
    </MockedProvider>
  );
  return <MockedNavigator component={NewsComponent} />;
};

describe('Screens/News', () => {
  const elements = {
    newsList: (component: RenderAPI) => component.queryByTestId('news-list'),
    newsListItemsText: (component: RenderAPI) =>
      component.queryAllByTestId('news-text'),
    modal: (component: RenderAPI) => component.getByTestId('modal-sheet'),
    modalCTA: (component: RenderAPI) =>
      component.queryByTestId('select-button'),
    headerCTA: (component: RenderAPI) =>
      component.getByTestId('header-icon-button-wrapper-tune'),
    loading: (component: RenderAPI) =>
      component.queryByTestId('news-loading-list'),
    newsListItem: (component: RenderAPI) =>
      component.queryAllByTestId('news-list-item-wrapper'),
    languagesListItem: (component: RenderAPI) =>
      component.queryAllByTestId('language-filter-list-item'),
    advice: (component: RenderAPI) => component.queryByTestId('advice-wrapper'),
    adviceIcon: (component: RenderAPI) =>
      component.queryByTestId('icon-magnify-off'),
    adiceTitle: (component: RenderAPI) =>
      component.queryByTestId('advice-title'),
    adviceDescription: (component: RenderAPI) =>
      component.queryByTestId('advice-description'),
    adviceSuggestion: (component: RenderAPI) =>
      component.queryByTestId('advice-suggestion'),
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
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should show the "loading-state" by default', () => {
    const component = render(renderNews(mockNewsEntryQuerySuccessResponse()));
    expect(elements.loading(component)).not.toBeNull();
  });

  describe('Languages-Filter-Modal', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should "show" the "LanguageFilterModal" when "press" the "Header-icon-cta"', async () => {
      const component = render(renderNews(mockNewsEntryQuerySuccessResponse()));
      await waitFor(() => {
        expect(elements.loading(component)).toBeNull();
      });
      expect(elements.modal(component)!.props.visible).toEqual(false);
      act(() => {
        fireEvent.press(elements.headerCTA(component));
      });
      expect(elements.modal(component)!.props.visible).toEqual(true);
      act(() => {
        jest.runAllTimers();
      });
    });

    it('should "hide" the "LanguageFilterModal" when "press" the "Modal-Select-CTA"', async () => {
      const component = render(renderNews(mockNewsEntryQuerySuccessResponse()));
      await waitFor(() => {
        expect(elements.loading(component)).toBeNull();
      });
      // opening the modal
      act(() => {
        fireEvent.press(elements.headerCTA(component));
      });
      expect(elements.modal(component)!.props.visible).toEqual(true);
      // closing the modal
      act(() => {
        fireEvent.press(elements.modalCTA(component)!);
      });
      await waitFor(() => {
        expect(elements.modal(component)!.props.visible).toEqual(false);
      });
      act(() => {
        jest.runAllTimers();
      });
    });

    it('should "hide" the "LanguageFilterModal" when "select some language" and press the "Modal-Select-CTA"', async () => {
      const component = render(renderNews(mockNewsEntryQuerySuccessResponse()));
      await waitFor(() => {
        expect(elements.loading(component)).toBeNull();
      });
      // opening the modal
      act(() => {
        fireEvent.press(elements.headerCTA(component));
      });
      expect(elements.modal(component)!.props.visible).toEqual(true);
      // selecting language
      act(() => {
        fireEvent.press(elements.languagesListItem(component)[0]);
      });
      // pressing the select-cta
      act(() => {
        fireEvent.press(elements.modalCTA(component)!);
      });
      await waitFor(() => {
        expect(elements.modal(component)!.props.visible).toEqual(false);
      });
    });
  });

  describe('Entry-query', () => {
    describe('When querying successfuly', () => {
      describe('When the list of news-articles received is not empty', () => {
        describe('Selecting some filter-language', () => {
          beforeEach(() => {
            jest.useFakeTimers();
          });

          it('should show the "loading-state" by default when "select some language"', async () => {
            const component = render(
              renderNews(mockNewsEntryQuerySuccessResponse()),
            );
            await waitFor(() => {
              expect(elements.loading(component)).toBeNull();
            });
            // opening the modal
            act(() => {
              fireEvent.press(elements.headerCTA(component));
            });
            // selecting language
            act(() => {
              fireEvent.press(elements.languagesListItem(component)[0]);
            });
            // pressing the select-cta
            act(() => {
              fireEvent.press(elements.modalCTA(component)!);
            });
            await waitFor(() => {
              expect(elements.loading(component)).not.toBeNull();
            });
          });

          describe('Selecting a filter-language that is not selected', () => {
            test.each(languagesSortedInEnglishWithoutEnglish)(
              'should show the "news-list-items" correctly when the language %p is selected',
              async language => {
                const indexLanguageSelected =
                  languagesSortedInEnglishWithoutEnglish.findIndex(
                    ({ id }) => id === language.id,
                  );
                const component = render(
                  renderNews(mockNewsEntryQuerySuccessResponse(language.id)),
                );
                await waitFor(() => {
                  expect(elements.loading(component)).toBeNull();
                });
                // opening the modal
                act(() => {
                  fireEvent.press(elements.headerCTA(component));
                });
                // selecting language
                act(() => {
                  fireEvent.press(
                    elements.languagesListItem(component)[
                      indexLanguageSelected
                    ],
                  );
                });
                // pressing the select-cta
                act(() => {
                  fireEvent.press(elements.modalCTA(component)!);
                });
                await waitFor(() => {
                  expect(elements.newsListItem(component).length).toEqual(
                    NEWS_ITEMS_PER_PAGE,
                  );
                });
                for (
                  let i = 0;
                  i < elements.newsListItemsText(component).length;
                  i++
                ) {
                  expect(
                    elements.newsListItemsText(component)[i]!
                      .children[0] as string,
                  ).toEqual(`page1-language-${language.id}-title-${i}`);
                }
              },
            );
          });

          describe('Selecting a filter-language that is already selected', () => {
            test.each(languagesSortedInEnglishWithEnglish)(
              'should "not trigger pagination" when the "language selected" in the filter-languages is "already selected" [%p]',
              async language => {
                const indexLanguageSelected =
                  languagesSortedInEnglishWithEnglish.findIndex(
                    ({ id }) => id === language.id,
                  );
                const component = render(
                  renderNews(mockNewsEntryQuerySuccessResponse(language.id)),
                );
                await waitFor(() => {
                  expect(elements.loading(component)).toBeNull();
                });
                // opening the modal
                act(() => {
                  fireEvent.press(elements.headerCTA(component));
                });
                // selecting language
                act(() => {
                  fireEvent.press(
                    elements.languagesListItem(component)[
                      indexLanguageSelected
                    ],
                  );
                });
                // pressing the select-cta
                act(() => {
                  fireEvent.press(elements.modalCTA(component)!);
                });
                await waitFor(() => {
                  try {
                    expect(elements.loading(component)).not.toBeNull();
                    expect(true).toEqual(false);
                  } catch (err) {
                    expect(true).toEqual(true);
                    expect(elements.newsListItem(component).length).toEqual(
                      NEWS_ITEMS_PER_PAGE,
                    );
                  }
                });
              },
            );
          });
        });

        it('should render correctly', async () => {
          const component = render(
            renderNews(mockNewsEntryQuerySuccessResponse()),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE,
          );
          expect(elements.topReloadButton(component)).toBeNull();
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.alertMessageWrapper(component)).toBeNull();
        });
      });

      describe('When the list of news-articles received is empty', () => {
        it('should show the "Adivce" correctly', async () => {
          const component = render(
            renderNews(
              mockNewsEntryQuerySuccessResponse(NewsLanguage.PT, true, true),
            ),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.newsList(component)).toBeNull();
          expect(elements.topReloadButton(component)).toBeNull();
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.alertMessageWrapper(component)).toBeNull();
          expect(elements.adviceIcon(component)).not.toBeNull();
          expect(elements.adiceTitle(component)).not.toBeNull();
          expect(elements.adiceTitle(component)!.children[0]).toEqual(
            Translations.News.EMPTY_LIST_ADVICE_TITLE,
          );
          expect(elements.adviceDescription(component)).not.toBeNull();
          expect(elements.adviceDescription(component)!.children[0]).toEqual(
            Translations.News.EMPTY_LIST_ADVICE_DESCRIPTION,
          );
          expect(elements.adviceSuggestion(component)).not.toBeNull();
          expect(elements.adviceSuggestion(component)!.children[0]).toEqual(
            Translations.News.EMPTY_LIST_ADVICE_SUGGESTION,
          );
        });

        it('should not render the "news-list"', async () => {
          const component = render(
            renderNews(
              mockNewsEntryQuerySuccessResponse(NewsLanguage.PT, true, true),
            ),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.newsList(component)).toBeNull();
        });
      });
    });

    describe('When querying with errors', () => {
      it('should show the "alert-error-message" correctly', async () => {
        const component = render(
          renderNews(mockNewsEntryQueryErrorResponse(getErrorType())),
        );
        await waitFor(() => {
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component)!.children[0]).toEqual(
            Translations.News.ENTRY_QUERY_ERROR,
          );
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
      });

      it('should not show any "news-list-item"', async () => {
        const component = render(
          renderNews(mockNewsEntryQueryErrorResponse(getErrorType())),
        );
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.newsListItem(component)!.length).toEqual(0);
      });

      it('should show the "top-reload" button', async () => {
        const component = render(
          renderNews(mockNewsEntryQueryErrorResponse(getErrorType())),
        );
        await waitFor(() => {
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
      });
    });

    describe('Retrying', () => {
      it('should show the "loading-state" when start to "retry"', async () => {
        const firstEntryQueryErrorType = getErrorType();
        const component = render(
          renderNews(mockNewsEntryQueryErrorResponse(firstEntryQueryErrorType)),
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
        const firstEntryQueryErrorType = getErrorType();
        const firstEntryQueryResult = mockNewsEntryQueryErrorResponse(
          firstEntryQueryErrorType,
        );
        const secondEntryQueryResult = mockNewsEntryQuerySuccessResponse();
        const component = render(
          renderNews([...firstEntryQueryResult, ...secondEntryQueryResult]),
        );
        await waitFor(() => {
          expect(elements.topReloadButton(component)).not.toBeNull();
          expect(elements.newsListItem(component).length).toEqual(0);
        });
        act(() => {
          fireEvent.press(elements.topReloadButton(component)!);
        });
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE,
          );
        });
      });

      it('should show the "alert-error-message" when the "retry-response" returns "another error"', async () => {
        const firstEntryQueryErrorType = getErrorType();
        const secondEntryQueryErrorType = getErrorType();
        const firstEntryQueryResult = mockNewsEntryQueryErrorResponse(
          firstEntryQueryErrorType,
        );
        const secondEntryQueryResult = mockNewsEntryQueryErrorResponse(
          secondEntryQueryErrorType,
        );
        const component = render(
          renderNews([...firstEntryQueryResult, ...secondEntryQueryResult]),
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
            Translations.News.ENTRY_QUERY_ERROR,
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
        renderNews(mockNewsPaginationQuerySuccessResponse()),
      );
      await waitFor(() => {
        expect(elements.newsListItem(component).length).toBeGreaterThan(0);
      });
      fireEvent.scroll(elements.newsList(component)!, scrollFlatListToEnd);
      act(() => {
        jest.runAllTimers();
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
          renderNews(mockNewsPaginationQuerySuccessResponse()),
        );
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toBeGreaterThan(0);
        });
        act(() => {
          fireEvent.scroll(elements.newsList(component)!, scrollFlatListToEnd);
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).toBeNull();
          expect(elements.advice(component)).toBeNull();
          expect(elements.loading(component)).toBeNull();
          expect(elements.topReloadButton(component)).toBeNull();
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.newsList(component)).not.toBeNull();
        });
      });

      it('should render the "news-list" with the correct size', async () => {
        const component = render(
          renderNews(mockNewsPaginationQuerySuccessResponse()),
        );
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toBeGreaterThan(0);
        });
        act(() => {
          fireEvent.scroll(elements.newsList(component)!, scrollFlatListToEnd);
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE * 2,
          );
        });
      });

      it('should render the "news-list items" correctly', async () => {
        const component = render(
          renderNews(mockNewsPaginationQuerySuccessResponse()),
        );
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toBeGreaterThan(0);
        });
        expect(elements.newsListItem(component).length).toEqual(
          NEWS_ITEMS_PER_PAGE,
        );
        act(() => {
          fireEvent.scroll(elements.newsList(component)!, scrollFlatListToEnd);
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE * 2,
          );
        });
        for (let i = 0; i < NEWS_ITEMS_PER_PAGE * 2; i++) {
          if (i < NEWS_ITEMS_PER_PAGE) {
            expect(
              (
                elements.newsListItemsText(component)[i]!.children[0] as string
              ).startsWith('page1'),
            ).toEqual(true);
          } else {
            expect(
              (
                elements.newsListItemsText(component)[i]!.children[0] as string
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
        const entryQueryResults = mockNewsEntryQuerySuccessResponse();
        const paginationQueryResults = mockNewsPaginationQueryErrorResponse(
          getErrorType(),
        );
        const component = render(
          renderNews([...entryQueryResults, ...paginationQueryResults]),
        );
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent.scroll(elements.newsList(component)!, scrollFlatListToEnd);
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.alertMessageIcon(component)).not.toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component)!.children[0]).toEqual(
            Translations.News.PAGINATION_QUERY_ERROR,
          );
        });
      });

      it('should "keep" the "items" received from the "entry-query"', async () => {
        const entryQueryResults = mockNewsEntryQuerySuccessResponse();
        const paginationQueryResults = mockNewsPaginationQueryErrorResponse(
          getErrorType(),
        );
        const component = render(
          renderNews([...entryQueryResults, ...paginationQueryResults]),
        );
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent.scroll(elements.newsList(component)!, scrollFlatListToEnd);
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE,
          );
        });
      });

      it('should show the "bottom-reload-pagination"', async () => {
        const entryQueryResults = mockNewsEntryQuerySuccessResponse();
        const paginationQueryResults = mockNewsPaginationQueryErrorResponse(
          getErrorType(),
        );
        const component = render(
          renderNews([...entryQueryResults, ...paginationQueryResults]),
        );
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent.scroll(elements.newsList(component)!, scrollFlatListToEnd);
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
        const entryQueryResults = mockNewsEntryQuerySuccessResponse();
        const paginationQueryResults = mockNewsPaginationQueryErrorResponse(
          getErrorType(),
        );
        const component = render(
          renderNews([...entryQueryResults, ...paginationQueryResults]),
        );
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent.scroll(elements.newsList(component)!, scrollFlatListToEnd);
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
        const entryQueryResults = mockNewsEntryQuerySuccessResponse();
        const paginationQueryErrorResults =
          mockNewsPaginationQueryErrorResponse(getErrorType());
        const paginationQuerySuccessResult =
          mockNewsPaginationQuerySuccessResponse();
        const component = render(
          renderNews([
            ...entryQueryResults,
            ...paginationQueryErrorResults,
            ...paginationQuerySuccessResult,
          ]),
        );
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent.scroll(elements.newsList(component)!, scrollFlatListToEnd);
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.paginationReload(component)).not.toBeNull();
        });
        expect(elements.newsListItem(component).length).toEqual(
          NEWS_ITEMS_PER_PAGE,
        );
        act(() => {
          fireEvent.press(elements.paginationReload(component)!);
        });
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE * 2,
          );
        });
        for (let i = 0; i < NEWS_ITEMS_PER_PAGE * 2; i++) {
          if (i < NEWS_ITEMS_PER_PAGE) {
            expect(
              (
                elements.newsListItemsText(component)[i]!.children[0] as string
              ).startsWith('page1'),
            ).toEqual(true);
          } else {
            expect(
              (
                elements.newsListItemsText(component)[i]!.children[0] as string
              ).startsWith('page2'),
            ).toEqual(true);
          }
        }
      });

      it('should show the "alert-error-message" when the "retry-response" returns "another error"', async () => {
        const entryQueryResults = mockNewsEntryQuerySuccessResponse();
        const paginationQueryResults = mockNewsPaginationQueryErrorResponse(
          getErrorType(),
        );
        const component = render(
          renderNews([...entryQueryResults, ...paginationQueryResults]),
        );
        await waitFor(() => {
          expect(elements.newsListItem(component).length).toEqual(
            NEWS_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent.scroll(elements.newsList(component)!, scrollFlatListToEnd);
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
            Translations.News.PAGINATION_QUERY_ERROR,
          );
        });
      });
    });
  });
});
