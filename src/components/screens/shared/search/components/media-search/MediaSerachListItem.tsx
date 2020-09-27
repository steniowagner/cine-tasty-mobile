import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import StarsVotes from 'components/common/stars-votes/StarsVotes';

import MediaImage from './MediaImage';

export const Wrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
`;

const TextContentWrapper = styled(View)`
  width: 64%;
`;

const TitleText = styled(Text).attrs({
  numberOfLines: 3,
})`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Bold;
`;

const GenresText = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Medium;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  onPressDetails: () => void;
  genres: string[];
  image: string;
  title: string;
  votes: number;
};

const MediaSearchListItem = ({
  onPressDetails, genres, image, title, votes,
}: Props) => (
  <Wrapper
    onPress={onPressDetails}
  >
    <MediaImage
      image={image}
    />
    <TextContentWrapper>
      <TitleText>{title}</TitleText>
      <GenresText>{genres.join('  \u2022  ')}</GenresText>
      <Row>
        <StarsVotes
          votes={votes}
          withText
        />
      </Row>
    </TextContentWrapper>
  </Wrapper>
);

export default MediaSearchListItem;
