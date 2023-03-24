import React from 'react';
import {render, RenderAPI, waitFor} from '@testing-library/react-native';

import {randomPositiveNumber} from '@mocks/utils';
import {ThemeContextProvider} from '@providers';

import {ProductionNetworkCompaniesList} from './useProductionNetworkCompanies';
import {ProductionNetworkCompanies} from './ProductionNetworkCompanies';

const items = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      __typename: 'ProductionCompany',
      logoPath: `LOGO_PATH_${index}`,
      name: `NAME_${index}`,
      id: `ID_${index}`,
    })) as ProductionNetworkCompaniesList[];

const renderProductionsNetworkList = (
  productionNetworkCompaniesList: ProductionNetworkCompaniesList[] = [],
) => (
  <ThemeContextProvider>
    <ProductionNetworkCompanies
      productionNetworkCompaniesList={productionNetworkCompaniesList}
    />
  </ThemeContextProvider>
);

describe('<ProductionNetworkCompanies />', () => {
  const elements = {
    productionCompaniesText: (api: RenderAPI) =>
      api.queryByTestId('production-companies-text'),
  };

  describe('Renders correctly', () => {
    it('should render the "production-companies-text" correctly when has some data on the "productionList"', async () => {
      const productionsList = items(randomPositiveNumber(10, 1));
      const productionsNames = productionsList
        .map(productionCompany => productionCompany.name)
        .join(', ');
      const component = render(renderProductionsNetworkList(productionsList));
      expect(elements.productionCompaniesText(component)).not.toBeNull();
      expect(elements.productionCompaniesText(component).children[0]).toEqual(
        productionsNames,
      );
      await waitFor(() => {});
    });

    it('should render the "production-companies-text" correctly when has some no data on the "productionList"', async () => {
      const component = render(renderProductionsNetworkList([]));
      expect(elements.productionCompaniesText(component)).not.toBeNull();
      expect(elements.productionCompaniesText(component).children[0]).toEqual(
        '',
      );
      await waitFor(() => {});
    });
  });
});
