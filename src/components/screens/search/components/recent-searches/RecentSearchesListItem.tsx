import React from 'react';
import {
  TouchableOpacity, Animated, Image, Text, View,
} from 'react-native';
import styled from 'styled-components';

import { useLoadListItemImage } from 'hooks';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';
import { SearchItem } from 'types';

const IMAGE_WIDTH_PERCENTAGE = '21%';
const IMAGE_HEIGHT_PERCENTAGE = '21%';

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
`;

const PressableContent = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const ItemImage = styled(Image)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP(IMAGE_WIDTH_PERCENTAGE)}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP(IMAGE_HEIGHT_PERCENTAGE)}px;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
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

const FallbackImageIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('10%'),
  color: theme.colors.fallbackImageIcon,
}))``;

const CloseIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.extraLargeSize,
  color: theme.colors.text,
  name: 'close',
}))``;

const ItemText = styled(Text).attrs({
  numberOfLines: 2,
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('52.5%')}px;
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
  item: SearchItem;
};

const PERSON_IMAGE_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.RECENT_SEARCH_SIZE_CODE}`;

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
          <ItemImage
            onError={onError}
            onLoad={onLoad}
            source={{
              uri: `${PERSON_IMAGE_URI}${item.image}`,
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
              <FallbackImageIcon
                name={hasError ? 'image-off' : 'account'}
              />
            </FallbackImageWrapper>
          )}
        </>
        <ItemText>{item.title}</ItemText>
      </PressableContent>
      <CloseButtonWrapper
        testID="recent-searches-list-item-close-button"
        onPress={onPressRemove}
      >
        <CloseIcon />
      </CloseButtonWrapper>
    </Wrapper>
  );
};

export default RecentSearchesListItem;
