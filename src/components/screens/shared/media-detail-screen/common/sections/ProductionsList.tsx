import React from 'react';
import { Text, View } from 'react-native';

import styled from 'styled-components';

import TMDBImage from 'components/common/tmdb-image/TMDBImage';
import {
  TVShowDetail_tvShow_productionCompanies as TVShowProductionCompanies,
  MovieDetail_movie_productionCompanies as MovieProductionCompanies,
  TVShowDetail_tvShow_networks as TVShowNetworks,
} from 'types/schema';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

const ListItemWrapper = styled(View)`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  align-items: center;
  justify-content: center;
`;

const ItemText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.buttonText};
  font-family: CircularStd-Medium;
`;

type Props = {
  productionsList: (
    | TVShowProductionCompanies
    | MovieProductionCompanies
    | TVShowNetworks
  )[];
};

const ProductionsList = ({ productionsList }: Props) => (
  <Wrapper>
    {productionsList.map((productionItem) => (
      <ListItemWrapper
        key={productionItem.id}
      >
        {productionItem.logoPath ? (
          <TMDBImage
            image={productionItem.logoPath || ''}
            imageType="profile"
            style={{
              width: metrics.getWidthFromDP('24%'),
              height: metrics.getWidthFromDP('10%'),
            }}
          />
        ) : (
          <ItemText>{productionItem.name}</ItemText>
        )}
      </ListItemWrapper>
    ))}
  </Wrapper>
);

export default ProductionsList;
