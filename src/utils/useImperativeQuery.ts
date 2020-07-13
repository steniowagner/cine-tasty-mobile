import { useQuery } from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';

const useImperativeQuery = <TData = any, TVariables = any>(query: DocumentNode) => {
  const { refetch } = useQuery<TData, TVariables>(query, { skip: true });

  const imperativelyCallQuery = async (variables: TVariables) => refetch(variables);

  return imperativelyCallQuery;
};

export default useImperativeQuery;
