import React from 'react';

import useKnownForDepartment from './useKnownForDepartment';
import * as Styles from './KnownForDepartment.styles';
import InfoText from '../InfoText';

type KnownForDepartmentProps = {
  knownForDepartment?: string;
};

const KnownForDepartment = ({ knownForDepartment }: KnownForDepartmentProps) => {
  const { onGetTextWidth, opacity, width } = useKnownForDepartment();

  if (!knownForDepartment) {
    return null;
  }

  return (
    <Styles.KnownForDepartmentWrapper
      opacity={opacity}
      width={width}
    >
      <InfoText
        onTextLayout={({ nativeEvent: { lines } }) => onGetTextWidth(lines[0].width)}
        // @ts-ignore
        withCustomColor
      >
        {knownForDepartment}
      </InfoText>
    </Styles.KnownForDepartmentWrapper>
  );
};

export default KnownForDepartment;
