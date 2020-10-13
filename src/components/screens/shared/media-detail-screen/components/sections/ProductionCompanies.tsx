import React from 'react';
import { Image, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import {
  TVShowDetail_tvShow_productionCompanies as TVShowProductionCompanies,
  MovieDetail_movie_productionCompanies as MovieProductionCompanies,
} from 'types/schema';
import Section from 'components/common/Section';
import CONSTANTS from 'utils/constants';

const COMPANY_LOGO_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.PROFILE_SIZE_CODE}`;

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ProductionCompany = styled(View)`
  width: 50%;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  justify-content: center;
  align-items: center;
`;

const CompanyLogoImage = styled(Image)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  tint-color: ${({ theme }) => theme.colors.text};
`;

const CompanyNameText = styled(Text)`
  margin-vertical: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const ContentWrapper = styled(View)`
  width: 70%;
  align-items: center;
`;

type Props = {
  productionCompanies: (TVShowProductionCompanies | MovieProductionCompanies)[];
};

const ProductionCompanies = ({ productionCompanies }: Props) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t('translations:mediaDetail:sections:productionCompanies')}
    >
      <Wrapper>
        {productionCompanies.map((productionCompany) => (
          <ProductionCompany
            key={productionCompany.id}
          >
            <ContentWrapper>
              <CompanyLogoImage
                source={{
                  uri: `${COMPANY_LOGO_URI}${productionCompany.logoPath || ''}`,
                }}
                resizeMode="contain"
              />
              <CompanyNameText>{productionCompany.name}</CompanyNameText>
            </ContentWrapper>
          </ProductionCompany>
        ))}
      </Wrapper>
    </Section>
  );
};

export default ProductionCompanies;
