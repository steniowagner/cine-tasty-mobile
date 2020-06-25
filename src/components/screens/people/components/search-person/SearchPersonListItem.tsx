import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from 'utils/constants';

interface WrapperStyleProps {
  readonly withMargin: boolean;
}

const Wrapper = styled(TouchableOpacity)<WrapperStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  margin-vertical: ${({ theme }) => theme.metrics.getWidthFromDP('1.5%')}px;
  margin-horizontal: ${({ withMargin, theme }) => {
    const margin = withMargin ? theme.metrics.mediumSize : 0;

    return margin;
  }}px;
  background-color: #f0f;
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

type Props = {
  numberOfColumns: number;
  profilePath?: string;
  onPress: () => void;
  name?: string;
  index: number;
};

const PERSON_IMAGE_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.PROFILE_SIZE_CODE}`;

const SearchPersonListItem = ({
  numberOfColumns,
  profilePath,
  onPress,
  index,
  name,
}: Props) => (
  <Wrapper
    onPress={onPress}
    withMargin={index % numberOfColumns === 1}
  >
    {profilePath && (
      <PersonImage
        source={{
          uri: `${PERSON_IMAGE_URI}${profilePath}`,
        }}
      />
    )}
    <PersonName>{name}</PersonName>
  </Wrapper>
);

export default SearchPersonListItem;
