import {useMemo} from 'react';

import * as SchemaTypes from '@schema-types';

export type ProductionNetworkCompaniesList =
  | SchemaTypes.TVShowDetail_tvShow_productionCompanies
  | SchemaTypes.MovieDetail_movie_productionCompanies
  | SchemaTypes.TVShowDetail_tvShow_networks;

type ProductionNetworkCompaniesProps = {
  productionNetworkCompaniesList: ProductionNetworkCompaniesList[];
};

export const useProductionNetworkCompanies = (
  props: ProductionNetworkCompaniesProps,
) => {
  const text = useMemo(
    () =>
      props.productionNetworkCompaniesList
        .map(productionCompany => productionCompany.name)
        .join(', '),
    [props.productionNetworkCompaniesList],
  );

  return {
    text,
  };
};
