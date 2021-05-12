import React, { Suspense } from 'react';

import * as Styles from './RouteSuspenseWrapper.styles';

type RouteSuspenseWrapperProps = {
  children: JSX.Element;
};

const RouteSuspenseWrapper = (props: RouteSuspenseWrapperProps) => (
  <Suspense
    fallback={(
      <Styles.LoadingWrapper>
        <Styles.CustomActivityIndicator />
      </Styles.LoadingWrapper>
    )}
  >
    {props.children}
  </Suspense>
);

export default RouteSuspenseWrapper;
