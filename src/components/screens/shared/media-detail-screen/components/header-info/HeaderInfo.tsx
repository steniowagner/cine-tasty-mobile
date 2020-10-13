import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ProgressiveImage from 'components/common/progressive-image/ProgressiveImage';
import StarsVotes from 'components/common/stars-votes/StarsVotes';

import {
  BackgroundImageWrapper, SmokeShadow, MediaInfoWrapper, Wrapper,
} from './common';
import PosterImage from './PosterImage';

const TextContentWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('64%')}px;
  justify-content: center;
  height: 100%;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
`;

const MediaTitleText = styled(Text).attrs({
  numberOfLines: 3,
})`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Black;
  letter-spacing: 0.5px;
`;

const VotesWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const NumberOfVotesText = styled(Text)`
  margin-right: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  color: ${({ theme }) => theme.colors.subText};
  font-family: CircularStd-Bold;
  letter-spacing: 0.5px;
`;

const VotesText = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize / 2.5}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  color: ${({ theme }) => theme.colors.subText};
  font-family: CircularStd-Black;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const VotesValueText = styled(Text)`
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Medium;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

type Props = {
  thumbnailURL: string;
  votesAverage: number;
  voteCount: number;
  posterURL: string;
  imageURL: string;
  title: string;
};

const HeaderInfo = ({
  thumbnailURL,
  votesAverage,
  voteCount,
  posterURL,
  imageURL,
  title,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <BackgroundImageWrapper>
        <ProgressiveImage
          thumbnailURL={thumbnailURL}
          imageURL={imageURL}
          borderRadius={0}
        />
        <SmokeShadow />
      </BackgroundImageWrapper>
      <MediaInfoWrapper>
        <PosterImage
          image={posterURL}
        />
        <TextContentWrapper>
          <MediaTitleText>{title}</MediaTitleText>
          <VotesWrapper>
            <View>
              <StarsVotes
                voteCount={voteCount}
                votes={votesAverage}
              />
              <Row>
                <NumberOfVotesText>{voteCount}</NumberOfVotesText>
                <VotesText>{t('translations:mediaDetail:votes')}</VotesText>
              </Row>
            </View>
            <VotesValueText>{votesAverage}</VotesValueText>
          </VotesWrapper>
        </TextContentWrapper>
      </MediaInfoWrapper>
    </Wrapper>
  );
};

export default HeaderInfo;
