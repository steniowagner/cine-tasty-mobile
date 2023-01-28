import {ScrollView, View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const PlayAgainButtonWrapper = styled(View)`
  position: absolute;
  bottom: ${({theme}) => theme.metrics.largeSize * 2}px;
`;

export const ResultsList = styled(ScrollView).attrs(({theme}) => ({
  contentContainerStyle: {
    paddingBottom: theme.metrics.largeSize * 4,
    paddingHorizontal: theme.metrics.largeSize,
    paddingTop: theme.metrics.largeSize,
  },
}))``;
