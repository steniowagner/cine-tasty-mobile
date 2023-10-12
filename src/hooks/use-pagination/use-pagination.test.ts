import { act, renderHook, waitFor } from '@testing-library/react-native';

import { testQuery } from '../../../__mocks__';
import { usePagination } from './use-pagination';

const onGetData = jest.fn().mockImplementation(queryResult => queryResult);
const PAGINATION_QUERY_ERROR = 'PAGINATION_QUERY_ERROR';
const ENTRY_QUERY_ERROR = 'ENTRY_QUERY_ERROR';

jest.mock('../use-imperative-query/use-imperative-query');

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

      it('should have the "loading-state" when "useImperativeQuery" is "loading"', () => {
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: true,
          exec: jest.fn(),
        });
        const { result } = renderHook(() =>
          usePagination({
            onGetData: jest.fn(),
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            query: testQuery,
          }),
        );
        expect(result.current.isLoading).toEqual(true);
      });

      it('should not exec immediatly when "skipFirstRun" is "true"', () => {
        const exec = jest.fn();
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: true,
          exec,
        });
        renderHook(() =>
          usePagination({
            onGetData: jest.fn(),
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: true,
            query: testQuery,
          }),
        );
        expect(exec).toBeCalledTimes(0);
      });

      it('should exec immediatly when "skipFirstRun" is "false"', () => {
        const exec = jest.fn();
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: true,
          exec,
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
        expect(exec).toBeCalledTimes(1);
      });

      it('should reset the "remove-entry-error" when call "retry-entry-query"', () => {
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          hasError: true,
          exec: jest.fn(),
        });
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
          useImperativeQuery.mock.calls[0][0].onError();
        });
        expect(result.current.error).toEqual(ENTRY_QUERY_ERROR);
        act(() => {
          result.current.retryEntryQuery();
        });
        expect(result.current.error).toEqual('');
      });

      it('should reset the state correctly', () => {
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
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
        act(() => {
          useImperativeQuery.mock.calls[0][0].onCompleted({
            dataset: ['item'],
            hasMore: true,
          });
        });
        expect(result.current.dataset).toEqual(['item']);
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

      it('should use the correct variables when "variables" is not defined', () => {
        const exec = jest.fn();
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: true,
          exec,
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
        expect(exec).toBeCalledWith({ page: 1 });
      });

      it('should use the correct variables when "variables.input" is not defined', () => {
        const exec = jest.fn();
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: true,
          exec,
        });
        const variables = {
          field: 'value',
        };
        renderHook(() =>
          usePagination({
            onGetData: jest.fn(),
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            variables,
            query: testQuery,
          }),
        );
        expect(exec).toBeCalledWith({ ...variables, page: 1 });
      });

      it('should use the correct variables when "variables.input" is defined', () => {
        const exec = jest.fn();
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: true,
          exec,
        });
        const variables = {
          input: {
            field: 'value',
          },
        };
        renderHook(() =>
          usePagination({
            onGetData: jest.fn(),
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: false,
            variables,
            query: testQuery,
          }),
        );
        expect(exec).toBeCalledWith({
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
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
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
        act(() => {
          useImperativeQuery.mock.calls[0][0].onCompleted({
            dataset: ['item'],
            hasMore: true,
          });
        });
        expect(result.current.dataset).toEqual(['item']);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.error).toEqual('');
      });

      it('should call "onGetData" correctly', () => {
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        const data = {
          dataset: ['item'],
          hasMore: true,
        };
        const onGetData = jest
          .fn()
          .mockImplementation(queryResult => queryResult);
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
          useImperativeQuery.mock.calls[0][0].onCompleted(data);
        });
        expect(onGetData).toBeCalledTimes(1);
        expect(onGetData).toBeCalledWith(data);
      });
    });

    describe('When querying with failure', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "alertMessage.show" correctly', () => {
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
        const { result } = renderHook(() =>
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
          useImperativeQuery.mock.calls[0][0].onError();
        });
        expect(mockShow).toBeCalledTimes(1);
        expect(mockShow).toBeCalledWith(ENTRY_QUERY_ERROR);
      });

      it('should return correctly', () => {
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
          exec: jest.fn(),
        });
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
          useImperativeQuery.mock.calls[0][0].onError();
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
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
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
          useImperativeQuery.mock.calls[0][0].onCompleted({
            dataset: ['item1'],
            hasMore: true,
          });
        });
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: true,
          hasError: false,
          exec: jest.fn(),
        });
        // start pagination
        act(() => {
          result.current.paginate();
        });
        expect(result.current.dataset).toEqual(['item1']);
        expect(result.current.error).toEqual('');
        expect(result.current.hasPaginationError).toEqual(false);
        expect(result.current.isPaginating).toEqual(true);
        await waitFor(() => {});
      });

      it('should "reset" the state correctly', async () => {
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValueOnce({
          isLoading: false,
          exec: jest.fn(),
        });
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
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
          useImperativeQuery.mock.calls[0][0].onCompleted({
            dataset: ['item1'],
            hasMore: true,
          });
        });
        // complete pagination-query
        act(() => {
          result.current.paginate();
        });
        act(() => {
          useImperativeQuery.mock.calls[1][0].onCompleted({
            dataset: ['item2'],
            hasMore: true,
          });
        });
        expect(result.current.dataset).toEqual(['item1', 'item2']);
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

        it('should not allow "pagination" when "imperativeQuery.isLoading" is "true"', async () => {
          const {
            useImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const exec = jest.fn();
          (useImperativeQuery as jest.Mock).mockReturnValueOnce({
            isLoading: false,
            exec: jest.fn(),
          });
          (useImperativeQuery as jest.Mock).mockReturnValue({
            isLoading: true,
            hasError: false,
            exec,
          });
          const { result } = renderHook(() =>
            usePagination({
              onGetData: jest.fn(),
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
            }),
          );
          expect(exec).toHaveBeenCalledTimes(0);
          act(() => {
            result.current.paginate();
          });
          expect(exec).toHaveBeenCalledTimes(0);
          await waitFor(() => {});
        });

        it('should not allow "pagination" when "pagination.isPaginating" is "true"', async () => {
          const {
            useImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          (useImperativeQuery as jest.Mock).mockReturnValue({
            isLoading: false,
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
            useImperativeQuery.mock.calls[0][0].onCompleted({
              dataset: ['item1'],
              hasMore: true,
            });
          });
          const exec = jest.fn();
          (useImperativeQuery as jest.Mock).mockReturnValue({
            isLoading: false,
            hasError: false,
            exec,
          });
          // start pagination
          expect(exec).toBeCalledTimes(0);
          act(() => {
            result.current.paginate();
          });
          expect(exec).toBeCalledTimes(1);
          act(() => {
            result.current.paginate();
          });
          expect(exec).toBeCalledTimes(1);
          await waitFor(() => {});
        });

        it('should not allow "pagination" when "entryQuery.hasMore" is "false"', async () => {
          const {
            useImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const exec = jest.fn();
          (useImperativeQuery as jest.Mock).mockReturnValueOnce({
            isLoading: false,
            exec: jest.fn(),
          });
          (useImperativeQuery as jest.Mock).mockReturnValue({
            isLoading: false,
            hasError: false,
            exec,
          });
          const { result } = renderHook(() =>
            usePagination({
              onGetData: jest.fn().mockReturnValueOnce({
                dataset: ['item1'],
                hasMore: false,
              }),
              entryError: ENTRY_QUERY_ERROR,
              paginationError: PAGINATION_QUERY_ERROR,
              skipFirstRun: false,
              query: testQuery,
            }),
          );
          // complete entry-query
          act(() => {
            useImperativeQuery.mock.calls[0][0].onCompleted();
          });
          // paginate
          expect(exec).toHaveBeenCalledTimes(0);
          act(() => {
            result.current.paginate();
          });
          expect(exec).toHaveBeenCalledTimes(0);
          await waitFor(() => {});
        });

        it('should not allow "pagination" when "paginatedQuery.hasMore" is "false"', async () => {
          const {
            useImperativeQuery,
          } = require('../use-imperative-query/use-imperative-query');
          const exec = jest.fn();
          (useImperativeQuery as jest.Mock).mockReturnValueOnce({
            isLoading: false,
            exec: jest.fn(),
          });
          (useImperativeQuery as jest.Mock).mockReturnValue({
            isLoading: false,
            hasError: false,
            exec,
          });
          const onGetData = jest
            .fn()
            .mockImplementation(queryResult => queryResult);
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
            useImperativeQuery.mock.calls[0][0].onCompleted({
              dataset: [],
              hasMore: true,
            });
          });
          // 1st pagination
          expect(exec).toHaveBeenCalledTimes(0);
          act(() => {
            result.current.paginate();
          });
          act(() => {
            useImperativeQuery.mock.calls[1][0].onCompleted({
              dataset: [],
              hasMore: false,
            });
          });
          await waitFor(() => {
            expect(exec).toHaveBeenCalledTimes(1);
          });
          // 2nd pagination
          act(() => {
            result.current.paginate();
          });
          expect(exec).toHaveBeenCalledTimes(1);
          await waitFor(() => {});
        });
      });
    });

    describe('Variables', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should use the correct page when "skipFirstRun" is "true"', async () => {
        const exec = jest.fn();
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValueOnce({
          isLoading: false,
          exec: jest.fn(),
        });
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
          hasError: false,
          exec,
        });
        const { result } = renderHook(() =>
          usePagination({
            onGetData: jest.fn(),
            entryError: ENTRY_QUERY_ERROR,
            paginationError: PAGINATION_QUERY_ERROR,
            skipFirstRun: true,
            query: testQuery,
          }),
        );
        act(() => {
          result.current.paginate();
        });
        expect(exec.mock.calls[0][0]).toEqual({ page: 1 });
        await waitFor(() => {});
      });

      it('should use the correct variables when "variables" is not defined', async () => {
        const exec = jest.fn();
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValueOnce({
          isLoading: false,
          exec: jest.fn(),
        });
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
          hasError: false,
          exec,
        });
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
        expect(exec.mock.calls[0][0]).toEqual({ page: 2 });
        await waitFor(() => {});
      });

      it('should use the correct variables when "variables.input" is not defined', async () => {
        const exec = jest.fn();
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValueOnce({
          isLoading: false,
          exec: jest.fn(),
        });
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
          hasError: false,
          exec,
        });
        const variables = {
          field: 'value',
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
        expect(exec).toBeCalledWith({ ...variables, page: 2 });
        await waitFor(() => {});
      });

      it('should use the correct variables when "variables.input" is defined', async () => {
        const exec = jest.fn();
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValueOnce({
          isLoading: false,
          exec: jest.fn(),
        });
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
          hasError: false,
          exec,
        });
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
        expect(exec).toBeCalledWith({
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
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValueOnce({
          isLoading: false,
          exec: jest.fn(),
        });
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
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
          useImperativeQuery.mock.calls[0][0].onCompleted({
            dataset: ['item1'],
            hasMore: true,
          });
        });
        // complete pagination-query
        act(() => {
          result.current.paginate();
        });
        act(() => {
          useImperativeQuery.mock.calls[1][0].onCompleted({
            dataset: ['item2'],
            hasMore: true,
          });
        });
        expect(result.current.dataset).toEqual(['item1', 'item2']);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.error).toEqual('');
        expect(result.current.hasPaginationError).toEqual(false);
        expect(result.current.isPaginating).toEqual(false);
        await waitFor(() => {});
      });

      it('should call "onGetData" correctly', async () => {
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValueOnce({
          isLoading: false,
          exec: jest.fn(),
        });
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
          hasError: false,
          exec: jest.fn(),
        });
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
          useImperativeQuery.mock.calls[0][0].onCompleted({
            dataset: ['item1'],
            hasMore: true,
          });
        });
        expect(onGetData).toBeCalledTimes(1);
        act(() => {
          result.current.paginate();
        });
        // complete pagination-query
        act(() => {
          useImperativeQuery.mock.calls[1][0].onCompleted(paginatedQueryData);
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

      it('should call "alertMessage.show" correctly', async () => {
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValueOnce({
          isLoading: false,
          exec: jest.fn(),
        });
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
          hasError: true,
          exec: jest.fn(),
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
        expect(mockShow).toBeCalledTimes(1);
        expect(mockShow).toBeCalledWith(PAGINATION_QUERY_ERROR);
        await waitFor(() => {});
      });

      it('should return correctly', async () => {
        const {
          useImperativeQuery,
        } = require('../use-imperative-query/use-imperative-query');
        (useImperativeQuery as jest.Mock).mockReturnValueOnce({
          isLoading: false,
          exec: jest.fn(),
        });
        (useImperativeQuery as jest.Mock).mockReturnValue({
          isLoading: false,
          hasError: true,
          exec: jest.fn(),
        });
        const { result } = renderHook(() =>
          usePagination({
            onGetData: jest.fn(),
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
