import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

export const VideoListItemWrapper = styled.TouchableOpacity`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('36')}px;
  margin-right: ${({ theme }) => theme.metrics.md}px;
  border-radius: ${({ theme }) => theme.metrics.sm}px;
`;

export const IconWrapper = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.metrics.sm}px;
`;

export const Image = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.sm}px;
`;

export const List = styled.ScrollView.attrs(({ theme }) => ({
  contentContainerStyle: {
    paddingLeft: theme.metrics.md,
  },
}))`
  margin-top: ${({ theme }) => theme.metrics.md}px;
`;
