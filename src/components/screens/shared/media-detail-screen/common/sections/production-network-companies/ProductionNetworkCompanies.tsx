import React, { useMemo } from 'react';

import {
  TVShowDetail_tvShow_productionCompanies as TVShowProductionCompanies,
  MovieDetail_movie_productionCompanies as MovieProductionCompanies,
  TVShowDetail_tvShow_networks as TVShowNetworks,
} from 'types/schema';
import * as S from './production-network-companies-styles';

type ProductionsListProps = {
  productionsList: (
    | TVShowProductionCompanies
    | MovieProductionCompanies
    | TVShowNetworks
  )[];
};

const ProductionsList = ({ productionsList }: ProductionsListProps) => {
  const productionCompanies = useMemo(
    () => productionsList.map((productionCompany) => productionCompany.name).join(', '),
    [productionsList],
  );

  return (
    <S.Wrapper>
      <S.ItemText>{productionCompanies}</S.ItemText>
    </S.Wrapper>
  );
};

export default ProductionsList;
