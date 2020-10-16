import React from 'react';
import {
  FlatList, Image, Text, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import {
  TVShowDetail_tvShow_productionCompanies as TVShowProductionCompanies,
  MovieDetail_movie_productionCompanies as MovieProductionCompanies,
} from 'types/schema';
import Section from 'components/common/Section';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

const COMPANY_LOGO_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.PROFILE_SIZE_CODE}`;

const ProductionCompany = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  justify-content: center;
  align-items: center;
`;

const CompanyLogoImage = styled(Image)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  tint-color: ${({ theme }) => theme.colors.text};
`;

const CompanyNameText = styled(Text)`
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const NoImageWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

const ContentWrapper = styled(View)`
  width: 70%;
  align-items: center;
`;

const NoImageIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('7%'),
  color: theme.colors.buttonText,
}))``;

type Props = {
  productionCompanies: (TVShowProductionCompanies | MovieProductionCompanies)[];
};

const ProductionCompanies = ({ productionCompanies }: Props) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t('translations:mediaDetail:sections:productionCompanies')}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductionCompany
            key={item.id}
          >
            <ContentWrapper>
              {item.logoPath ? (
                <CompanyLogoImage
                  source={{
                    uri: `${COMPANY_LOGO_URI}${item.logoPath || ''}`,
                  }}
                  resizeMode="contain"
                />
              ) : (
                <NoImageWrapper>
                  <NoImageIcon
                    name="image-off"
                  />
                </NoImageWrapper>
              )}
              <CompanyNameText>{item.name}</CompanyNameText>
            </ContentWrapper>
          </ProductionCompany>
        )}
        data={productionCompanies}
        horizontal
      />
    </Section>
  );
};

export default ProductionCompanies;
