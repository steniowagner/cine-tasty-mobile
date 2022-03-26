import React, {Suspense} from 'react';

import * as Styles from './RouteSuspenseWrapper.styles';

type RouteSuspenseWrapperProps = {
  children: JSX.Element;
};

export const RouteSuspenseWrapper = ({children}: RouteSuspenseWrapperProps) => (
  <Suspense
    fallback={
      <Styles.LoadingWrapper>
        <Styles.CustomActivityIndicator />
      </Styles.LoadingWrapper>
    }>
    {children}
  </Suspense>
);
