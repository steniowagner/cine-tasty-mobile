import React from 'react';

import useKnownForDepartment from './useKnownForDepartment';
import * as Styles from './KnownForDepartment.styles';
import InfoText from '../InfoText';

type KnownForDepartmentProps = {
  knownForDepartment?: string;
};

const KnownForDepartment = (props: KnownForDepartmentProps) => {
  const knownForDepartment = useKnownForDepartment();

  if (!props.knownForDepartment) {
    return null;
  }

  return (
    <Styles.KnownForDepartmentWrapper
      opacity={knownForDepartment.opacity}
      width={knownForDepartment.width}
    >
      <InfoText
        onTextLayout={({ nativeEvent: { lines } }) => knownForDepartment.onGetTextWidth(lines[0].width)}
        // @ts-ignore
        withCustomColor
      >
        {props.knownForDepartment}
      </InfoText>
    </Styles.KnownForDepartmentWrapper>
  );
};

export default KnownForDepartment;
