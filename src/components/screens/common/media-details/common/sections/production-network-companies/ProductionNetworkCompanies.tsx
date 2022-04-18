import React, {useMemo} from 'react';

import * as SchemaTypes from '@schema-types';

import * as Styles from './ProductionNetworkCompanies.styles';

export type ProductionNetworkCompaniesList =
  | SchemaTypes.TVShowDetail_tvShow_productionCompanies
  | SchemaTypes.MovieDetail_movie_productionCompanies
  | SchemaTypes.TVShowDetail_tvShow_networks;

type ProductionNetworkCompaniesProps = {
  productionNetworkCompaniesList: ProductionNetworkCompaniesList[];
};

export const ProductionNetworkCompanies = (
  props: ProductionNetworkCompaniesProps,
) => {
  const productionCompanies = useMemo(
    () =>
      props.productionNetworkCompaniesList
        .map(productionCompany => productionCompany.name)
        .join(', '),
    [props.productionNetworkCompaniesList],
  );
  return (
    <Styles.Wrapper testID="production-network-companies">
      <Styles.ItemText testID="production-companies-text">
        {productionCompanies}
      </Styles.ItemText>
    </Styles.Wrapper>
  );
};
