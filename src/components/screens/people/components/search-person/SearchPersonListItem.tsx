import React from 'react';
import {
  TouchableOpacity, Animated, Image, Text,
} from 'react-native';
import styled from 'styled-components';

import { useLoadListItemImage } from 'hooks';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

interface WrapperStyleProps {
  readonly withMargin: boolean;
  readonly height: number;
}

const Wrapper = styled(TouchableOpacity)<WrapperStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
  height: ${({ height }) => height}px;
  margin-horizontal: ${({ withMargin, theme }) => {
    const margin = withMargin ? theme.metrics.mediumSize : 0;

    return margin;
  }}px;
`;

const PersonName = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.text};
`;

const PersonImage = styled(Image)`
  width: 100%;
  height: 70%;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const FallbackImageWrapper = styled(Animated.View)`
  width: 100%;
  height: 70%;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: #cfcfcf;
`;

const FallbackImageIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('14%'),
  color: '#4d4d4d',
}))``;

type Props = {
  numberOfColumns: number;
  profilePath?: string;
  onPress: () => void;
  height: number;
  name?: string;
  index: number;
};

const PERSON_IMAGE_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.PROFILE_SIZE_CODE}`;

const SearchPersonListItem = ({
  numberOfColumns,
  profilePath,
  onPress,
  height,
  index,
  name,
}: Props) => {
  const {
    isFallbackImageVisible,
    hasError,
    onError,
    opacity,
    onLoad,
  } = useLoadListItemImage({
    image: profilePath,
  });

  return (
    <Wrapper
      withMargin={index % numberOfColumns === 1}
      onPress={onPress}
      height={height}
    >
      <>
        <PersonImage
          onError={onError}
          onLoad={onLoad}
          source={{
            uri: `${PERSON_IMAGE_URI}${profilePath}`,
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
      <PersonName>{name}</PersonName>
    </Wrapper>
  );
};

export default SearchPersonListItem;
