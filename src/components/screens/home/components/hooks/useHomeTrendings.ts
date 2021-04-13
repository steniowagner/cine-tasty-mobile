import { useCallback, useState } from 'react';
import { DocumentNode } from 'graphql';

import useImperativeQuery from '@utils/useImperativeQuery';
import * as SchemaTypes from '@schema-types';

const INITIAL_STATE = {
  isLoading: false,
  hasError: false,
};

type State = {
  getTrendings: () => void;
  isLoading: boolean;
  hasError: boolean;
};

type InternalState = {
  isLoading: boolean;
  hasError: boolean;
};

type TVariables = {
  language?: SchemaTypes.ISO6391Language;
  page: number;
};

type Props<T> = {
  onGetData: (data: T) => void;
  query: DocumentNode;
};

const useHomeTrendings = <TData = any>({ onGetData, query }: Props<TData>): State => {
  const [state, setState] = useState<InternalState>(INITIAL_STATE);

  const execQuery = useImperativeQuery<TData, TVariables>(query);

  const getTrendings = useCallback(async () => {
    try {
      setState({
        hasError: false,
        isLoading: true,
      });

      const { data } = await execQuery({
        page: 1,
      });

      onGetData(data);

      setState({
        isLoading: false,
        hasError: false,
      });
    } catch (err) {
      setState({
        isLoading: false,
        hasError: true,
      });
    }
  }, []);

  return {
    isLoading: state.isLoading,
    hasError: state.hasError,
    getTrendings,
  };
};

export default useHomeTrendings;
