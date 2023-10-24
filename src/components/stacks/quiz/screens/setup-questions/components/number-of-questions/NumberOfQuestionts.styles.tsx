import styled from 'styled-components/native';
import Slider from '@react-native-community/slider';

export const NumberQuestionsWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SliderStyled = styled(Slider).attrs(({ theme }) => ({
  maximumTrackTintColor: theme.colors.contrast,
  minimumTrackTintColor: theme.colors.text,
  thumbTintColor: theme.colors.text,
}))``;
