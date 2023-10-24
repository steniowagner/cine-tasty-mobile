import styled from 'styled-components/native';

import { Typography } from '@/components/common';
import metrics from '@styles/metrics';

export const ICON_SIZE = metrics.getWidthFromDP('7');

export const InnerContentWrapper = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.metrics.md}px;
  border-radius: ${({ theme }) => theme.metrics.sm}px;
  background-color: ${({ theme }) => theme.colors.inputBackground};
`;

export const OptionText = styled(Typography.SmallText)``;

export const SectionTitle = styled(Typography.SmallText)`
  margin-bottom: ${({ theme }) => theme.metrics.md}px;
`;
