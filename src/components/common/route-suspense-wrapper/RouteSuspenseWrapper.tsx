import React, {ReactNode, Suspense} from 'react';

import {LoadingIndicator} from '@components';

import * as Styles from './RouteSuspenseWrapper.styles';

type RouteSuspenseWrapperProps = {
  children: ReactNode;
};

export const RouteSuspenseWrapper = (props: RouteSuspenseWrapperProps) => (
  <Suspense
    fallback={
      <Styles.LoadingWrapper>
        <LoadingIndicator />
      </Styles.LoadingWrapper>
    }>
    {props.children}
  </Suspense>
);
