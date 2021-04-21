import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const LinkButtonWrapper = styled(TouchableOpacity)`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;
