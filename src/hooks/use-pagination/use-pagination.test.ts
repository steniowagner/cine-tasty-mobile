import { act, renderHook, waitFor } from '@testing-library/react-native';

import { testQuery } from '../../../__mocks__';
import { usePagination } from './use-pagination';

const onGetData = jest.fn().mockImplementation(queryResult => queryResult);
const PAGINATION_QUERY_ERROR = 'PAGINATION_QUERY_ERROR';
const ENTRY_QUERY_ERROR = 'ENTRY_QUERY_ERROR';

// Needed to import the same hook from two different directories
// so I can mock each call (entry and pagination) properly

// entry-query's use-imperative-query mock
jest.mock('../use-imperative-query/use-imperative-query');

// use-pagination's use-imperative-query mock
jest.mock('@hooks');

const mockShow = jest.fn();

jest.mock('@providers', () => {
  const actualProvidersModule = jest.requireActual('@providers');
  return {
    ...actualProvidersModule,
    useAlertMessage: () => ({
      show: mockShow,
    }),
  };
});

describe('Hooks/use-pagination', () => {
  describe('Entry Query', () => {
    describe('Exec', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should have the "loading-state" when "entryUseImperativeQuery.isLoading" is "true"', () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        entryUseImperativeQuery.mockReturnValue({
          isLoading: true,
          exec: jest.fn(),
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        const { result } = renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        expect(result.current.isLoading).toEqual(true);
      });

      it('should "not exec automatically" when "skipFirstRun" is "true"', () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        const entry = jest.fn();
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: entry,
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        renderHook(() =>
          usePagination({
            onGetData: jest.fn(),
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: true,
            query: testQuery,
          }),
        );
        expect(entry).toBeCalledTimes(0);
      });

      it('should "exec automatically" when "skipFirstRun" is "false"', () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        const entry = jest.fn();
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: entry,
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: true,
          exec: entry,
        });
        renderHook(() =>
          usePagination({
            onGetData: jest.fn(),
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        expect(entry).toBeCalledTimes(1);
      });

      it('should "reset" the "remove-entry-error" when call "retry-entry-query"', () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        const entry = jest.fn();
        entryUseImperativeQuery.mockReturnValue({
          hasError: true,
          isLoading: false,
          exec: entry,
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        const { result } = renderHook(() =>
          usePagination({
            onGetData: jest.fn(),
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        act(() => {
          entryUseImperativeQuery.mock.calls[0][0].onError();
        });
        expect(result.current.error).toEqual(ENTRY_QUERY_ERROR);
        act(() => {
          result.current.retryEntryQuery();
        });
        expect(result.current.error).toEqual('');
      });

      it('should reset the state correctly', () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        const entry = jest.fn();
        entryUseImperativeQuery.mockReturnValue({
          hasError: true,
          isLoading: false,
          exec: entry,
        });
        const entryQueryData = {
          dataset: ['item1'],
          hasMore: true,
        };
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        const { result } = renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        act(() => {
          entryUseImperativeQuery.mock.calls[0][0].onCompleted(entryQueryData);
        });
        expect(result.current.dataset).toEqual(entryQueryData.dataset);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.error).toEqual('');
        act(() => {
          result.current.resetState();
        });
        expect(result.current.dataset).toEqual([]);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.error).toEqual('');
      });
    });

    describe('Variables', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should use the "correct variables" when "variables" is "not defined"', () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        const entry = jest.fn();
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: entry,
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        expect(entry).toBeCalledWith({ page: 1 });
      });

      it('should use the "correct variables" when "variables.input" is "not defined"', () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        const entry = jest.fn();
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          hasError: false,
          exec: entry,
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        const variables = {
          field: 'value',
        };
        renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            variables,
            query: testQuery,
          }),
        );
        expect(entry).toBeCalledWith({ ...variables, page: 1 });
      });

      it('should use the correct variables when "variables.input" is defined', () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        const entry = jest.fn();
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          hasError: false,
          exec: entry,
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        const variables = {
          input: {
            field: 'value',
          },
        };
        renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            variables,
            query: testQuery,
          }),
        );
        expect(entry).toBeCalledWith({
          input: {
            ...variables.input,
            page: 1,
          },
        });
      });
    });

    describe('When querying successfully', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should return the data correctly', () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        const entryQueryData = {
          dataset: ['item1'],
          hasMore: true,
        };
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        const { result } = renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        act(() => {
          entryUseImperativeQuery.mock.calls[0][0].onCompleted(entryQueryData);
        });
        expect(result.current.dataset).toEqual(entryQueryData.dataset);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.error).toEqual('');
      });

      it('should call "onGetData" correctly', () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        const data = {
          dataset: ['item'],
          hasMore: true,
        };
        renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        expect(onGetData).toBeCalledTimes(0);
        act(() => {
          entryUseImperativeQuery.mock.calls[0][0].onCompleted(data);
        });
        expect(onGetData).toBeCalledTimes(1);
        expect(onGetData).toBeCalledWith(data);
      });
    });

    describe('When querying with failure', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      describe('Showing the alert-message', () => {
        it('should call "alertMessage.show" correctly when an "alert-icon" is "not defined"', () => {
          const {
            useImperativeQuery: entryUseImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const {
            useImperativeQuery: paginationUseImperativeQuery,
          } = require('@hooks');
          entryUseImperativeQuery.mockReturnValue({
            isLoading: false,
            exec: jest.fn(),
          });
          paginationUseImperativeQuery.mockImplementation(() => ({
            isLoading: false,
            hasError: false,
            exec: jest.fn(),
          }));
          renderHook(() =>
            usePagination({
              onGetData: jest.fn(),
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
            }),
          );
          expect(mockShow).toBeCalledTimes(0);
          act(() => {
            entryUseImperativeQuery.mock.calls[0][0].onError();
          });
          expect(mockShow).toBeCalledTimes(1);
          expect(mockShow).toBeCalledWith(ENTRY_QUERY_ERROR, undefined);
        });

        it('should call "alertMessage.show" correctly when an "alert-icon" is "defined"', () => {
          const {
            useImperativeQuery: entryUseImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const {
            useImperativeQuery: paginationUseImperativeQuery,
          } = require('@hooks');
          entryUseImperativeQuery.mockReturnValue({
            isLoading: false,
            exec: jest.fn(),
          });
          paginationUseImperativeQuery.mockImplementation(() => ({
            isLoading: false,
            hasError: false,
            exec: jest.fn(),
          }));
          const errorMessageIcon = 'about';
          renderHook(() =>
            usePagination({
              errorMessageIcon,
              onGetData: jest.fn(),
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
            }),
          );
          expect(mockShow).toBeCalledTimes(0);
          act(() => {
            entryUseImperativeQuery.mock.calls[0][0].onError();
          });
          expect(mockShow).toBeCalledTimes(1);
          expect(mockShow).toBeCalledWith(ENTRY_QUERY_ERROR, errorMessageIcon);
        });
      });

      it('should return correctly', () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        const { result } = renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        act(() => {
          entryUseImperativeQuery.mock.calls[0][0].onError();
        });
        expect(result.current.dataset).toEqual([]);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.error).toEqual(ENTRY_QUERY_ERROR);
      });
    });
  });

  describe('Paginated Query', () => {
    describe('Exec', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should have the "paginating-state" when it is "paginating"', async () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        paginationUseImperativeQuery.mockReturnValue({
          isLoading: true,
          hasError: false,
          exec: jest.fn(),
        });
        const { result } = renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        // complete entry-query
        act(() => {
          entryUseImperativeQuery.mock.calls[0][0].onCompleted({
            dataset: ['item1'],
            hasMore: true,
          });
        });
        // start pagination
        act(() => {
          result.current.paginate();
        });
        expect(result.current.dataset).toEqual(['item1']);
        expect(result.current.error).toEqual('');
        expect(result.current.hasPaginationError).toEqual(false);
        await waitFor(() => {
          expect(result.current.isPaginating).toEqual(true);
        });
      });

      it('should "reset" the state correctly', async () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        paginationUseImperativeQuery.mockReturnValue({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        });
        const entryQueryData = {
          dataset: ['item1'],
          hasMore: true,
        };
        const paginatedQueryData = {
          dataset: ['item2'],
          hasMore: true,
        };
        const { result } = renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        // complete entry-query
        act(() => {
          entryUseImperativeQuery.mock.calls[0][0].onCompleted(entryQueryData);
        });
        // complete pagination-query
        act(() => {
          result.current.paginate();
        });
        act(() => {
          paginationUseImperativeQuery.mock.calls[1][0].onCompleted(
            paginatedQueryData,
          );
        });
        expect(result.current.dataset).toEqual([
          ...entryQueryData.dataset,
          ...paginatedQueryData.dataset,
        ]);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.error).toEqual('');
        expect(result.current.hasPaginationError).toEqual(false);
        expect(result.current.isPaginating).toEqual(false);
        act(() => {
          result.current.resetState();
        });
        expect(result.current.dataset).toEqual([]);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.error).toEqual('');
        expect(result.current.hasPaginationError).toEqual(false);
        expect(result.current.isPaginating).toEqual(false);
        await waitFor(() => {});
      });

      describe('When "pagination" is not allowed', () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        it('should not allow "pagination" when "paginationUseImperativeQuery.isLoading" is "true"', async () => {
          const {
            useImperativeQuery: entryUseImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const {
            useImperativeQuery: paginationUseImperativeQuery,
          } = require('@hooks');
          entryUseImperativeQuery.mockReturnValue({
            isLoading: false,
            exec: jest.fn(),
          });
          const paginate = jest.fn();
          paginationUseImperativeQuery.mockImplementation(() => ({
            isLoading: true,
            hasError: false,
            exec: paginate,
          }));
          const { result } = renderHook(() =>
            usePagination({
              onGetData: jest.fn(),
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
            }),
          );
          expect(paginate).toHaveBeenCalledTimes(0);
          act(() => {
            result.current.paginate();
          });
          expect(paginate).toHaveBeenCalledTimes(0);
          await waitFor(() => {});
        });

        it('should not allow "pagination" when "pagination.isPaginating" is "true"', async () => {
          const {
            useImperativeQuery: entryUseImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const {
            useImperativeQuery: paginationUseImperativeQuery,
          } = require('@hooks');
          entryUseImperativeQuery.mockReturnValue({
            hasError: false,
            isLoading: false,
            exec: jest.fn(),
          });
          const paginate = jest.fn();
          paginationUseImperativeQuery.mockImplementation(() => ({
            isLoading: false,
            hasError: false,
            exec: paginate,
          }));
          const { result } = renderHook(() =>
            usePagination({
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
              onGetData,
            }),
          );
          // complete entry-query
          act(() => {
            entryUseImperativeQuery.mock.calls[1][0].onCompleted({
              dataset: ['item1'],
              hasMore: true,
            });
          });
          expect(paginate).toBeCalledTimes(0);
          // start pagination
          act(() => {
            result.current.paginate();
          });
          act(() => {
            paginationUseImperativeQuery.mock.calls[1][0].onCompleted({
              dataset: ['item2'],
              hasMore: true,
            });
          });
          expect(paginate).toBeCalledTimes(1);
          act(() => {
            result.current.paginate();
          });
          expect(paginate).toBeCalledTimes(1);
          await waitFor(() => {});
        });

        it('should not allow "pagination" when "entryUseImperativeQuery.hasMore" is "false"', async () => {
          const {
            useImperativeQuery: entryUseImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const {
            useImperativeQuery: paginationUseImperativeQuery,
          } = require('@hooks');
          entryUseImperativeQuery.mockReturnValue({
            isLoading: false,
            exec: jest.fn(),
          });
          const paginate = jest.fn();
          paginationUseImperativeQuery.mockImplementation(() => ({
            isLoading: false,
            hasError: false,
            exec: paginate,
          }));
          const { result } = renderHook(() =>
            usePagination({
              onGetData,
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
            }),
          );
          // complete entry-query
          act(() => {
            entryUseImperativeQuery.mock.calls[0][0].onCompleted({
              dataset: ['item1'],
              hasMore: false,
            });
          });
          // paginate
          expect(paginate).toHaveBeenCalledTimes(0);
          act(() => {
            result.current.paginate();
          });
          expect(paginate).toHaveBeenCalledTimes(0);
          await waitFor(() => {});
        });

        it('should not allow "pagination" when "paginatedQuery.hasMore" is "false"', async () => {
          const {
            useImperativeQuery: entryUseImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const {
            useImperativeQuery: paginationUseImperativeQuery,
          } = require('@hooks');
          entryUseImperativeQuery.mockReturnValue({
            isLoading: false,
            exec: jest.fn(),
          });
          const paginate = jest.fn();
          paginationUseImperativeQuery.mockImplementation(() => ({
            isLoading: false,
            hasError: false,
            exec: paginate,
          }));
          const { result } = renderHook(() =>
            usePagination({
              onGetData,
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
            }),
          );
          // complete entry-query
          act(() => {
            entryUseImperativeQuery.mock.calls[0][0].onCompleted({
              dataset: ['item1'],
              hasMore: true,
            });
          });
          // 1st pagination
          expect(paginate).toHaveBeenCalledTimes(0);
          act(() => {
            result.current.paginate();
          });
          act(() => {
            paginationUseImperativeQuery.mock.calls[1][0].onCompleted({
              dataset: ['item2'],
              hasMore: false,
            });
          });
          await waitFor(() => {
            expect(paginate).toHaveBeenCalledTimes(1);
          });
          // 2nd pagination
          act(() => {
            result.current.paginate();
          });
          expect(paginate).toHaveBeenCalledTimes(1);
          await waitFor(() => {});
        });

        it('should not allow "pagination" when "entryQuery.hasError" is "true"', async () => {
          const {
            useImperativeQuery: entryUseImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const {
            useImperativeQuery: paginationUseImperativeQuery,
          } = require('@hooks');
          entryUseImperativeQuery.mockReturnValue({
            hasError: true,
            isLoading: false,
            exec: jest.fn(),
          });
          const paginate = jest.fn();
          paginationUseImperativeQuery.mockImplementation(() => ({
            isLoading: false,
            hasError: false,
            exec: paginate,
          }));
          const { result } = renderHook(() =>
            usePagination({
              onGetData,
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
            }),
          );
          // complete entry-query
          act(() => {
            entryUseImperativeQuery.mock.calls[0][0].onCompleted({
              dataset: [],
              hasMore: false,
            });
          });
          // paginate
          expect(paginate).toHaveBeenCalledTimes(0);
          act(() => {
            result.current.paginate();
          });
          expect(paginate).toHaveBeenCalledTimes(0);
          await waitFor(() => {});
        });

        it('should not allow "pagination" when "paginateQuery.hasError" is "true"', async () => {
          const {
            useImperativeQuery: entryUseImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const {
            useImperativeQuery: paginationUseImperativeQuery,
          } = require('@hooks');
          entryUseImperativeQuery.mockReturnValue({
            isLoading: false,
            exec: jest.fn(),
          });
          const paginate = jest.fn();
          paginationUseImperativeQuery.mockImplementation(() => ({
            hasError: true,
            isLoading: false,
            exec: paginate,
          }));
          const { result } = renderHook(() =>
            usePagination({
              onGetData,
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
            }),
          );
          // complete entry-query
          act(() => {
            entryUseImperativeQuery.mock.calls[0][0].onCompleted({
              dataset: ['item1'],
              hasMore: true,
            });
          });
          // paginate
          expect(paginate).toHaveBeenCalledTimes(0);
          act(() => {
            result.current.paginate();
          });
          expect(paginate).toHaveBeenCalledTimes(0);
          await waitFor(() => {});
        });
      });

      describe('Retry-pagination', () => {
        describe('When "retry-pagination" is allowed', () => {
          it('should have the "paginating-state" when it is "retrying-to-paginate"', async () => {
            const {
              useImperativeQuery: entryUseImperativeQuery,
            } = require('../use-imperative-query/use-imperative-query');
            const {
              useImperativeQuery: paginationUseImperativeQuery,
            } = require('@hooks');
            entryUseImperativeQuery.mockReturnValue({
              isLoading: false,
              exec: jest.fn(),
            });
            paginationUseImperativeQuery.mockReturnValue({
              isLoading: true,
              hasError: false,
              exec: jest.fn(),
            });
            const { result } = renderHook(() =>
              usePagination({
                onGetData,
                entryError: ENTRY_QUERY_ERROR,
                paginationError: PAGINATION_QUERY_ERROR,
                skipFirstRun: false,
                query: testQuery,
              }),
            );
            // complete entry-query
            act(() => {
              entryUseImperativeQuery.mock.calls[0][0].onCompleted({
                dataset: ['item1'],
                hasMore: true,
              });
            });
            // start pagination
            act(() => {
              result.current.retryPagination();
            });
            expect(result.current.dataset).toEqual(['item1']);
            expect(result.current.error).toEqual('');
            expect(result.current.hasPaginationError).toEqual(false);
            await waitFor(() => {
              expect(result.current.isPaginating).toEqual(true);
            });
          });

          it('should "reset" the state correctly', async () => {
            const {
              useImperativeQuery: entryUseImperativeQuery,
            } = require('../use-imperative-query/use-imperative-query');
            const {
              useImperativeQuery: paginationUseImperativeQuery,
            } = require('@hooks');
            entryUseImperativeQuery.mockReturnValue({
              isLoading: false,
              exec: jest.fn(),
            });
            paginationUseImperativeQuery.mockReturnValue({
              isLoading: false,
              hasError: false,
              exec: jest.fn(),
            });
            const entryQueryData = {
              dataset: ['item1'],
              hasMore: true,
            };
            const paginatedQueryData = {
              dataset: ['item2'],
              hasMore: true,
            };
            const { result } = renderHook(() =>
              usePagination({
                onGetData,
                entryError: ENTRY_QUERY_ERROR,
                paginationError: PAGINATION_QUERY_ERROR,
                skipFirstRun: false,
                query: testQuery,
              }),
            );
            // complete entry-query
            act(() => {
              entryUseImperativeQuery.mock.calls[0][0].onCompleted(
                entryQueryData,
              );
            });
            // complete pagination-query
            act(() => {
              result.current.retryPagination();
            });
            act(() => {
              paginationUseImperativeQuery.mock.calls[1][0].onCompleted(
                paginatedQueryData,
              );
            });
            expect(result.current.dataset).toEqual([
              ...entryQueryData.dataset,
              ...paginatedQueryData.dataset,
            ]);
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.error).toEqual('');
            expect(result.current.hasPaginationError).toEqual(false);
            expect(result.current.isPaginating).toEqual(false);
            act(() => {
              result.current.resetState();
            });
            expect(result.current.dataset).toEqual([]);
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.error).toEqual('');
            expect(result.current.hasPaginationError).toEqual(false);
            expect(result.current.isPaginating).toEqual(false);
            await waitFor(() => {});
          });
        });
        describe('When "retry-pagination" is not allowed', () => {
          it('should not allow "retry-pagination" when "entryQuery.hasError" is "true', async () => {
            const {
              useImperativeQuery: entryUseImperativeQuery,
            } = require('../use-imperative-query/use-imperative-query');
            const {
              useImperativeQuery: paginationUseImperativeQuery,
            } = require('@hooks');
            entryUseImperativeQuery.mockReturnValue({
              isLoading: false,
              hasError: true,
              exec: jest.fn(),
            });
            const paginate = jest.fn();
            paginationUseImperativeQuery.mockImplementation(() => ({
              isLoading: false,
              hasError: false,
              exec: paginate,
            }));
            const { result } = renderHook(() =>
              usePagination({
                onGetData,
                entryError: ENTRY_QUERY_ERROR,
                paginationError: PAGINATION_QUERY_ERROR,
                skipFirstRun: false,
                query: testQuery,
              }),
            );
            // complete entry-query
            act(() => {
              entryUseImperativeQuery.mock.calls[0][0].onCompleted({
                dataset: ['item1'],
                hasMore: true,
              });
            });
            // paginate
            expect(paginate).toHaveBeenCalledTimes(0);
            act(() => {
              result.current.retryPagination();
            });
            expect(paginate).toHaveBeenCalledTimes(0);
            await waitFor(() => {});
          });

          it('should not allow "retry-pagination" when "paginateQuery.isPaginating" is "true', async () => {
            const {
              useImperativeQuery: entryUseImperativeQuery,
            } = require('../use-imperative-query/use-imperative-query');
            const {
              useImperativeQuery: paginationUseImperativeQuery,
            } = require('@hooks');
            entryUseImperativeQuery.mockReturnValue({
              hasError: false,
              isLoading: false,
              exec: jest.fn(),
            });
            const paginate = jest.fn();
            paginationUseImperativeQuery.mockImplementation(() => ({
              isLoading: true,
              hasError: false,
              exec: paginate,
            }));
            const { result } = renderHook(() =>
              usePagination({
                entryError: ENTRY_QUERY_ERROR,
                paginationError: PAGINATION_QUERY_ERROR,
                skipFirstRun: false,
                query: testQuery,
                onGetData,
              }),
            );
            // complete entry-query
            act(() => {
              entryUseImperativeQuery.mock.calls[1][0].onCompleted({
                dataset: ['item1'],
                hasMore: true,
              });
            });
            expect(paginate).toBeCalledTimes(0);
            act(() => {
              result.current.retryPagination();
            });
            expect(paginate).toBeCalledTimes(0);
            await waitFor(() => {});
          });
        });
      });
    });

    describe('Variables', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should use the "correct page" when "skipFirstRun" is "true"', async () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        const paginate = jest.fn();
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: paginate,
        }));
        const { result } = renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: true,
            query: testQuery,
          }),
        );
        act(() => {
          result.current.paginate();
        });
        expect(paginate.mock.calls[0][0]).toEqual({ page: 1 });
        await waitFor(() => {});
      });

      it('should use the "correct variables" when "variables" is "not defined"', async () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        const paginate = jest.fn();
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: paginate,
        }));
        const { result } = renderHook(() =>
          usePagination({
            onGetData: jest.fn(),
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        act(() => {
          result.current.paginate();
        });
        expect(paginate.mock.calls[0][0]).toEqual({ page: 2 });
        await waitFor(() => {});
      });

      it('should use the "correct variable"s when "variables.input" is "not defined"', async () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        const paginate = jest.fn();
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: paginate,
        }));
        const variables = {
          field: 'value',
        };
        const { result } = renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            variables,
            query: testQuery,
          }),
        );
        act(() => {
          result.current.paginate();
        });
        expect(paginate).toBeCalledWith({ ...variables, page: 2 });
        await waitFor(() => {});
      });

      it('should use the "correct variables" when "variables.input" is defined', async () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        const paginate = jest.fn();
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: paginate,
        }));
        const variables = {
          input: {
            field: 'value',
          },
        };
        const { result } = renderHook(() =>
          usePagination({
            onGetData: jest.fn(),
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            variables,
            query: testQuery,
          }),
        );
        act(() => {
          result.current.paginate();
        });
        expect(paginate).toBeCalledWith({
          input: {
            ...variables.input,
            page: 2,
          },
        });
        await waitFor(() => {});
      });
    });

    describe('When paginated successfuly', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should return the data correctly', async () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        const entryQueryData = {
          dataset: ['item1'],
          hasMore: true,
        };
        const paginatedQueryData = {
          dataset: ['item2'],
          hasMore: true,
        };
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        const { result } = renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        // complete entry-query
        act(() => {
          entryUseImperativeQuery.mock.calls[0][0].onCompleted(entryQueryData);
        });
        // complete pagination-query
        act(() => {
          result.current.paginate();
        });
        act(() => {
          paginationUseImperativeQuery.mock.calls[1][0].onCompleted(
            paginatedQueryData,
          );
        });
        expect(result.current.dataset).toEqual([
          ...entryQueryData.dataset,
          ...paginatedQueryData.dataset,
        ]);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.error).toEqual('');
        expect(result.current.hasPaginationError).toEqual(false);
        expect(result.current.isPaginating).toEqual(false);
        await waitFor(() => {});
      });

      it('should call "onGetData" correctly', async () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        const entryQueryData = {
          dataset: ['item1'],
          hasMore: true,
        };
        const paginatedQueryData = {
          dataset: ['item2'],
          hasMore: true,
        };
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        }));
        const { result } = renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        // complete entry-query
        act(() => {
          entryUseImperativeQuery.mock.calls[0][0].onCompleted(entryQueryData);
        });
        expect(onGetData).toBeCalledTimes(1);
        act(() => {
          result.current.paginate();
        });
        // complete pagination-query
        act(() => {
          paginationUseImperativeQuery.mock.calls[1][0].onCompleted(
            paginatedQueryData,
          );
        });
        expect(onGetData).toBeCalledTimes(2);
        expect(onGetData).toHaveBeenNthCalledWith(2, paginatedQueryData);
        await waitFor(() => {});
      });
    });

    describe('When paginated with failure', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      describe('Showing the alert-message', () => {
        it('should call "alertMessage.show" correctly when an "alert-icon" is "not defined"', async () => {
          const {
            useImperativeQuery: entryUseImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const {
            useImperativeQuery: paginationUseImperativeQuery,
          } = require('@hooks');
          entryUseImperativeQuery.mockReturnValue({
            isLoading: false,
            exec: jest.fn(),
          });
          paginationUseImperativeQuery.mockImplementation(() => ({
            isLoading: false,
            hasError: true,
            exec: jest.fn(),
          }));
          renderHook(() =>
            usePagination({
              onGetData: jest.fn(),
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
            }),
          );
          expect(mockShow).toBeCalledTimes(1);
          expect(mockShow).toBeCalledWith(PAGINATION_QUERY_ERROR, undefined);
          await waitFor(() => {});
        });

        it('should call "alertMessage.show" correctly when an "alert-icon" is "defined"', async () => {
          const {
            useImperativeQuery: entryUseImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const {
            useImperativeQuery: paginationUseImperativeQuery,
          } = require('@hooks');
          entryUseImperativeQuery.mockReturnValue({
            isLoading: false,
            exec: jest.fn(),
          });
          paginationUseImperativeQuery.mockImplementation(() => ({
            isLoading: false,
            hasError: true,
            exec: jest.fn(),
          }));
          const errorMessageIcon = 'about';
          renderHook(() =>
            usePagination({
              errorMessageIcon,
              onGetData: jest.fn(),
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
            }),
          );
          expect(mockShow).toBeCalledTimes(1);
          expect(mockShow).toBeCalledWith(
            PAGINATION_QUERY_ERROR,
            errorMessageIcon,
          );
          await waitFor(() => {});
        });
      });

      it('should return correctly', async () => {
        const {
          useImperativeQuery: entryUseImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        const {
          useImperativeQuery: paginationUseImperativeQuery,
        } = require('@hooks');
        entryUseImperativeQuery.mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        paginationUseImperativeQuery.mockImplementation(() => ({
          isLoading: false,
          hasError: true,
          exec: jest.fn(),
        }));
        const { result } = renderHook(() =>
          usePagination({
            onGetData,
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.hasPaginationError).toEqual(true);
        expect(result.current.isPaginating).toEqual(false);
        expect(result.current.dataset).toEqual([]);
        expect(result.current.error).toEqual(PAGINATION_QUERY_ERROR);
        await waitFor(() => {});
      });
    });
  });
});
