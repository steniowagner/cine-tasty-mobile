import React, { useMemo, memo } from 'react';
import { TouchableOpacity, Animated, Text } from 'react-native';
import styled from 'styled-components';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

import getWrapperMeasures from './getWrapperMeasures';

const PersonName = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.text};
`;

const FallbackImageWrapper = styled(Animated.View)`
  width: 100%;
  height: 70%;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type Props = {
  numberOfColumns: number;
  image?: string;
  onPress: () => void;
  title?: string;
  index: number;
};

const FamousListItem = ({
  numberOfColumns, onPress, image, index, title,
}: Props) => {
  const {
    isFallbackImageVisible,
    hasError,
    onError,
    opacity,
    onLoad,
  } = useLoadListItemImage({
    image,
  });

  const wrapperMeasures = useMemo(() => {
    const withMargin = index % numberOfColumns === 1;

    return getWrapperMeasures(withMargin);
  }, []);

  return (
    <TouchableOpacity
      testID="famous-list-item-button"
      style={wrapperMeasures}
      onPress={onPress}
    >
      <>
        <TMDBImage
          imageType="profile"
          onError={onError}
          onLoad={onLoad}
          image={image}
          style={{
            width: '100%',
            height: '70%',
            borderRadius: metrics.extraSmallSize,
          }}
        />
        {isFallbackImageVisible && (
          <FallbackImageWrapper
            testID="fallback-image-wrapper"
            style={[
              {
                opacity,
              },
            ]}
          >
            {renderSVGIconConditionally({
              condition: hasError,
              ifTrue: {
                colorThemeRef: 'fallbackImageIcon',
                size: DEFAULT_ICON_SIZE,
                id: 'image-off',
              },
              ifFalse: {
                colorThemeRef: 'fallbackImageIcon',
                size: DEFAULT_ICON_SIZE,
                id: 'account',
              },
            })}
          </FallbackImageWrapper>
        )}
      </>
      <PersonName>{title}</PersonName>
    </TouchableOpacity>
  );
};

export default memo(FamousListItem, () => true);
