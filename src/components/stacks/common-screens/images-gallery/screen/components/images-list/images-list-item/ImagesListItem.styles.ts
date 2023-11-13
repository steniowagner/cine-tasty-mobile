import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const LANDSCAPE_HEIGHT = metrics.getWidthFromDP('65');
export const PORTRAIT_HEIGHT = metrics.getWidthFromDP('100');

export const Wrapper = styled.View`
  width: ${({ theme }) => theme.metrics.width}px;
  height: ${PORTRAIT_HEIGHT}px;
  align-items: center;
  justify-content: center;
`;

export const ImageWrapper = styled.View`
  height: 100%;
  width: 100%;
  background-color: 'rgba(242, 242, 242, 0.5)';
  justify-content: center;
  align-items: center;
`;