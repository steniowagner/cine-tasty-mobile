import {View} from 'react-native';
import styled from 'styled-components/native';

export const BiographySectionWrapper = styled(View)`
  margin-top: ${({theme}) => theme.metrics.getWidthFromDP('5%')}px;
`;
