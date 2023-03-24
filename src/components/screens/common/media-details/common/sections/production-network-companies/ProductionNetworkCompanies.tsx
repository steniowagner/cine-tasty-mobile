import React from 'react';

import {
  useProductionNetworkCompanies,
  ProductionNetworkCompaniesList,
} from './useProductionNetworkCompanies';
import * as Styles from './ProductionNetworkCompanies.styles';

type ProductionNetworkCompaniesProps = {
  productionNetworkCompaniesList: ProductionNetworkCompaniesList[];
};

export const ProductionNetworkCompanies = (
  props: ProductionNetworkCompaniesProps,
) => {
  const productionNetworkCompanies = useProductionNetworkCompanies({
    productionNetworkCompaniesList: props.productionNetworkCompaniesList,
  });

  return (
    <Styles.Wrapper testID="production-network-companies">
      <Styles.ItemText testID="production-companies-text">
        {productionNetworkCompanies.text}
      </Styles.ItemText>
    </Styles.Wrapper>
  );
};
