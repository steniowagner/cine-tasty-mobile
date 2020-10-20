import React from 'react';
import {
  TouchableOpacity, Animated, Image, Text, View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import { useLoadListItemImage } from 'hooks';
import CONSTANTS from 'utils/constants';
import Icon from 'components/common/Icon';

interface WrapperStyleProps {
  readonly isFirst: boolean;
}

const Wrapper = styled(TouchableOpacity)<WrapperStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('55%')}px;
  margin-right: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  margin-left: ${({ isFirst }) => (isFirst ? CONSTANTS.VALUES.DEFAULT_SPACING : 0)}px;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const PersonImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const SmokeShadow = styled(LinearGradient).attrs(() => ({
  colors: [
    ...Array(4).fill('transparent'),
    'rgba(0, 0, 0, 0.6)',
    'rgba(0, 0, 0, 0.8)',
    'rgba(0, 0, 0, 1)',
  ],
}))`
  width: 100%;
  height: 100%;
  bottom: 0;
  position: absolute;
  border-bottom-left-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  border-bottom-right-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const TextContentWrapper = styled(View)`
  height: 100%;
  justify-content: flex-end;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  position: absolute;
`;

const PersonNameText = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: white;
  font-family: CircularStd-Bold;
`;

const PersonSubText = styled(Text).attrs({
  numberOfLines: 4,
})`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: CircularStd-Medium;
`;

const FallbackImageWrapper = styled(Animated.View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

const FallbackImageIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('14%'),
  color: theme.colors.fallbackImageIcon,
}))``;

type Props = {
  onPress: () => void;
  isFirst: boolean;
  subText: string;
  image: string;
  name: string;
  type: string;
};

const PeopleListItem = ({
  onPress, isFirst, subText, image, name, type,
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

  return (
    <Wrapper
      testID={`button-wrapper-${type}`}
      isFirst={isFirst}
      onPress={onPress}
    >
      <PersonImage
        testID="person-image"
        onError={onError}
        onLoad={onLoad}
        source={{
          uri: image,
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
      <ContentWrapper>
        <SmokeShadow />
        <TextContentWrapper>
          <PersonNameText
            testID="person-name"
          >
            {name}
          </PersonNameText>
          <PersonSubText
            testID="person-subtext"
          >
            {subText}
          </PersonSubText>
        </TextContentWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default PeopleListItem;