import React from 'react';

import * as Styles from './KnownForDepartment.styles';
import InfoText from '../InfoText';

type KnownForDepartmentProps = {
  knownForDepartment?: string;
};

const KnownForDepartment = (props: KnownForDepartmentProps) => {
  if (!props.knownForDepartment) {
    return null;
  }

  return (
    <Styles.KnownForDepartmentWrapper>
      <InfoText testID="known-for-department-text" withCustomColor>
        {props.knownForDepartment}
      </InfoText>
    </Styles.KnownForDepartmentWrapper>
  );
};

export default KnownForDepartment;
