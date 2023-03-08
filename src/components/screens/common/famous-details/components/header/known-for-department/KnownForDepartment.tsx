import React from 'react';

import * as Styles from './KnownForDepartment.styles';
import * as HeaderStyles from '../Header.styles';

type KnownForDepartmentProps = {
  knownForDepartment?: string;
};

export const KnownForDepartment = (props: KnownForDepartmentProps) => {
  if (!props.knownForDepartment) {
    return null;
  }

  return (
    <Styles.KnownForDepartmentWrapper>
      <HeaderStyles.DefaultText
        testID="known-for-department-text"
        withCustomColor>
        {props.knownForDepartment}
      </HeaderStyles.DefaultText>
    </Styles.KnownForDepartmentWrapper>
  );
};
