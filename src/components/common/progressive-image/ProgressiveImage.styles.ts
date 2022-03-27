import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

type ForegroundLayerStyleProps = {
  borderRadius?: number;
};

export const ForegroundLayer = styled(View)<ForegroundLayerStyleProps>`
  height: 100%;
  width: 100%;
  background-color: 'rgba(242, 242, 242, 0.5)';
  border-radius: ${({borderRadius}) => Number(borderRadius)}px;
`;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
