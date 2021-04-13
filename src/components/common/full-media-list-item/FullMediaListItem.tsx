import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import StarsVotes from '@components/common/stars-votes/StarsVotes';

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
  numberOfLines: 2,
})`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Bold;
`;

const GenresText = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Medium;
`;

type Props = {
  onPressDetails: () => void;
  voteCount?: number;
  genres: string[];
  image: string;
  title: string;
  votes: number;
};

const FullMediaListItem = ({
  onPressDetails,
  genres = [],
  voteCount,
  image,
  title,
  votes,
}: Props) => (
  <Wrapper
    onPress={onPressDetails}
    testID="full-media-list-item"
  >
    <MediaImage
      image={image}
    />
    <TextContentWrapper>
      <TitleText>{title}</TitleText>
      <StarsVotes
        votes={votes}
        withText
        voteCount={voteCount}
      />
      <GenresText>{genres.join('  \u2022  ')}</GenresText>
    </TextContentWrapper>
  </Wrapper>
);

export default FullMediaListItem;
