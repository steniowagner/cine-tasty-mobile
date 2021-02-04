import React, { Suspense } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import styled from 'styled-components';

const LoadingWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const CustomActivityIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.colors.text,
  size: Platform.select({
    android: 'large',
    ios: 'small',
  }),
}))``;

type Props = {
  children: JSX.Element;
};

const RouteSuspenseWrapper = ({ children }: Props) => (
  <Suspense
    fallback={(
      <LoadingWrapper>
        <CustomActivityIndicator />
      </LoadingWrapper>
    )}
  >
    {children}
  </Suspense>
);

export default RouteSuspenseWrapper;
