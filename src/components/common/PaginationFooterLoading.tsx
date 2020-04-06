import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  padding: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  justify-content: center;
  align-items: center;
`;

const CustomActivityIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.colors.text,
}))``;

const PaginationFooterLoading = (): JSX.Element => (
  <Wrapper>
    <CustomActivityIndicator
      size={Platform.select({
        android: 'large',
        ios: 'small',
      })}
    />
  </Wrapper>
);

export default PaginationFooterLoading;
