import React from 'react';
import {
  TouchableOpacity, Animated, Text, View,
} from 'react-native';
import styled from 'styled-components';

import renderSVGIconConditionally from 'components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from 'components/common/tmdb-image/TMDBImage';
import SVGIcon from 'components/common/svg-icon/SVGIcon';
import { useLoadListItemImage } from 'hooks';
import { RecentSearchItem } from 'types';
import metrics from 'styles/metrics';

const IMAGE_WIDTH_PERCENTAGE = '21%';
const IMAGE_HEIGHT_PERCENTAGE = '21%';

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
`;

const PressableContent = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const FallbackImageWrapper = styled(Animated.View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP(IMAGE_WIDTH_PERCENTAGE)}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP(IMAGE_HEIGHT_PERCENTAGE)}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('10%');

const ItemText = styled(Text).attrs({
  numberOfLines: 2,
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('55%')}px;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-right: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  color: ${({ theme }) => theme.colors.text};
`;

const CloseButtonWrapper = styled(TouchableOpacity).attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.largeSize,
    bottom: theme.metrics.largeSize,
    left: theme.metrics.largeSize,
    right: theme.metrics.largeSize,
  },
}))``;

type Props = {
  onPressRemove: () => void;
  onPressItem: () => void;
  item: RecentSearchItem;
};

const RecentSearchesListItem = ({ onPressRemove, onPressItem, item }: Props) => {
  const {
    isFallbackImageVisible,
    hasError,
    onError,
    opacity,
    onLoad,
  } = useLoadListItemImage({
    image: item.image,
  });

  return (
    <Wrapper
      testID="recent-searches-list-item"
    >
      <PressableContent
        onPress={onPressItem}
        testID="recent-searches-list-item-button"
      >
        <>
          <TMDBImage
            onError={onError}
            onLoad={onLoad}
            image={item.image}
            imageType="profile"
            style={{
              width: metrics.getWidthFromDP(IMAGE_WIDTH_PERCENTAGE),
              height: metrics.getWidthFromDP(IMAGE_HEIGHT_PERCENTAGE),
              borderRadius: metrics.smallSize,
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
        <ItemText>{item.title}</ItemText>
      </PressableContent>
      <CloseButtonWrapper
        testID="recent-searches-list-item-close-button"
        onPress={onPressRemove}
      >
        <SVGIcon
          size={metrics.extraLargeSize}
          id="close"
        />
      </CloseButtonWrapper>
    </Wrapper>
  );
};

export default RecentSearchesListItem;
