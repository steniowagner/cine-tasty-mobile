import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import useKnownForDepartment from './useKnownForDepartment';
import InfoText from '../InfoText';

type KnownForDepartmentWrapperStyleProps = {
  opacity: number;
  width: number;
};

const KnownForDepartmentWrapper = styled(View)<KnownForDepartmentWrapperStyleProps>`
  width: ${({ theme, width }) => theme.metrics.largeSize + width}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.primary};
  opacity: ${({ opacity }) => opacity};
`;

type Props = {
  knownForDepartment?: string;
};

const KnownForDepartment = ({ knownForDepartment }: Props) => {
  const { onGetTextWidth, opacity, width } = useKnownForDepartment();

  if (!knownForDepartment) {
    return null;
  }

  return (
    <KnownForDepartmentWrapper
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
    </KnownForDepartmentWrapper>
  );
};

export default KnownForDepartment;
