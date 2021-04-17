import React, { Suspense } from 'react';

import * as Styles from './RouteSuspenseWrapper.styles';

type Props = {
  children: JSX.Element;
};

const RouteSuspenseWrapper = ({ children }: Props) => (
  <Suspense
    fallback={(
      <Styles.LoadingWrapper>
        <Styles.CustomActivityIndicator />
      </Styles.LoadingWrapper>
    )}
  >
    {children}
  </Suspense>
);

export default RouteSuspenseWrapper;
