import {useQuery} from '@apollo/client';
import {FetchPolicy} from 'apollo-client';
import {DocumentNode} from 'graphql';

const useImperativeQuery = <TData = any, TVariables = any>(
  query: DocumentNode,
  fetchPolicy: FetchPolicy = 'cache-first',
) => {
  const {refetch} = useQuery<TData, TVariables>(query, {
    skip: true,
    fetchPolicy,
  });

  const imperativelyCallQuery = async (variables: TVariables) =>
    refetch(variables);

  return imperativelyCallQuery;
};

export default useImperativeQuery;
