/* eslint-disable camelcase */
import React, { useMemo } from 'react';

import * as SchemaTypes from '@schema-types';

import * as S from './production-network-companies-styles';

type ProductionsListProps = {
  productionsList: (
    | SchemaTypes.TVShowDetail_tvShow_productionCompanies
    | SchemaTypes.MovieDetail_movie_productionCompanies
    | SchemaTypes.TVShowDetail_tvShow_networks
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
