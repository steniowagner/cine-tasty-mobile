import {View} from 'react-native';
import styled from 'styled-components/native';

export const SectionWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
`;
