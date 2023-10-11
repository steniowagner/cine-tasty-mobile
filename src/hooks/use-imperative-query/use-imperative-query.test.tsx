import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react-native';

import { RenderHookWrapper, testQuery } from '../../../__mocks__';
import { useImperativeQuery } from './use-imperative-query';

const mockQuery = jest.fn();
const FETCH_POLICY = 'SOME_FETCH_POLICY';

jest.mock('@apollo/client', () => {
  const actualApolloClientModule = jest.requireActual('@apollo/client');
  return {
    ...actualApolloClientModule,
    useApolloClient: () => ({
      query: mockQuery,
    }),
  };
});

const renderImperativeQueryHook = (
  onCompleted?: jest.Mock,
  onError?: jest.Mock,
) =>
  renderHook(
    () =>
      useImperativeQuery({
        fetchPolicy: FETCH_POLICY,
        onCompleted,
        onError,
        query: testQuery,
      }),
    {
      wrapper: ({ children }) => (
        <RenderHookWrapper>{children}</RenderHookWrapper>
      ),
    },
  );

describe('Hooks/use-imperative-query', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should call "apolloClient.query" correctly when "exec" is called', async () => {
    const { result } = renderImperativeQueryHook();
    expect(mockQuery).toHaveBeenCalledTimes(0);
    act(() => {
      result.current.exec({});
    });
    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith({
      fetchPolicy: FETCH_POLICY,
      query: testQuery,
      variables: {},
    });
  });

  it('should return the "default-state" correctly', () => {
    const { result } = renderImperativeQueryHook();
    expect(result.current.hasError).toEqual(false);
    expect(result.current.isLoading).toEqual(false);
  });

  it('should have the "loading-state" while querying', async () => {
    mockQuery.mockResolvedValueOnce({});
    const { result } = renderImperativeQueryHook();
    act(() => {
      result.current.exec({});
    });
    await waitFor(() => {
      expect(result.current.isLoading).toEqual(true);
    });
  });

  describe('When querying successfuly', () => {
    it('should call "onCompleted" with the result', async () => {
      const result = { result: 'value' };
      mockQuery.mockResolvedValueOnce(result);
      const onCompleted = jest.fn();
      const hook = renderImperativeQueryHook(onCompleted);
      expect(onCompleted).toHaveBeenCalledTimes(0);
      act(() => {
        hook.result.current.exec({});
      });
      await waitFor(() => {
        expect(onCompleted).toHaveBeenCalledTimes(1);
        expect(onCompleted).toHaveBeenCalledWith(result);
      });
    });

    it('should have the "success-state" after querying successfuly', async () => {
      mockQuery.mockResolvedValueOnce({});
      const onCompleted = jest.fn();
      const { result } = renderImperativeQueryHook(onCompleted);
      expect(onCompleted).toHaveBeenCalledTimes(0);
      act(() => {
        result.current.exec({});
      });
      await waitFor(() => {
        expect(onCompleted).toHaveBeenCalledTimes(1);
      });
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.hasError).toEqual(false);
    });
  });

  describe('When querying with failure', () => {
    it('should call "onError" with the error', async () => {
      const error = new Error('Some Error');
      mockQuery.mockRejectedValueOnce(error);
      const onError = jest.fn();
      const { result } = renderImperativeQueryHook(jest.fn(), onError);
      expect(onError).toHaveBeenCalledTimes(0);
      act(() => {
        result.current.exec({});
      });
      await waitFor(() => {
        expect(onError).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledWith(error);
      });
    });

    it('should have the "error-state" after querying successfuly', async () => {
      const error = new Error('Some Error');
      mockQuery.mockRejectedValueOnce(error);
      const { result } = renderImperativeQueryHook();
      act(() => {
        result.current.exec({});
      });
      await waitFor(() => {
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.hasError).toEqual(true);
      });
    });

    it('should have the "error-state" when "query" throwns an exception', async () => {
      mockQuery.mockImplementation(() => {
        throw new Error();
      });
      const { result } = renderImperativeQueryHook();
      act(() => {
        result.current.exec({});
      });
      await waitFor(() => {
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.hasError).toEqual(true);
      });
    });
  });
});
