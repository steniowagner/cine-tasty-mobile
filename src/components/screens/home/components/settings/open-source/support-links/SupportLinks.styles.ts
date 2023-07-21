import {Text, View} from 'react-native';
import styled from 'styled-components/native';

type DefaultItemTextStyleProps = {
  isSubtext?: boolean;
};

export const SectionWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
`;

export const DefaultItemText = styled(Text)<DefaultItemTextStyleProps>`
  font-size: ${({theme}) => theme.metrics.largeSize * 1.2}px;
  color: ${({isSubtext, theme}) =>
    isSubtext ? theme.colors.subText : theme.colors.text};
  font-family: CircularStd-Medium;
`;
