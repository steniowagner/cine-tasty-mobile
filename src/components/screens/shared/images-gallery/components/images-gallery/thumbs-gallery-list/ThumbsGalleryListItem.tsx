import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import TMDBImage from 'components/common/tmdb-image/TMDBImage';
import metrics from 'styles/metrics';

const BORDER_RADIUS = metrics.mediumSize;

interface WrapeprStyleProps {
  isSelected: boolean;
}

const Wrapper = styled(TouchableOpacity)<WrapeprStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  border: 3px solid
    ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : 'transparent')};
  border-radius: ${BORDER_RADIUS + 4}px;
`;

type Props = {
  onPress: () => void;
  isSelected: boolean;
  image: string;
};

const ThumbListItem = ({ isSelected, onPress, image }: Props) => (
  <Wrapper
    isSelected={isSelected}
    onPress={onPress}
    testID="thumb-list-item"
  >
    <TMDBImage
      imageType="profile"
      onError={() => {}}
      onLoad={() => {}}
      image={image}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: BORDER_RADIUS,
      }}
    />
  </Wrapper>
);

const shouldComponentUpdate = (previousState: Props, nextState: Props): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

export default memo(ThumbListItem, shouldComponentUpdate);
