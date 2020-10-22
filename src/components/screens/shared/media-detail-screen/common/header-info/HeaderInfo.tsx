import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import StarsVotes from 'components/common/stars-votes/StarsVotes';
import CONSTANTS from 'utils/constants';

import BackgroundImage from './BackgroundImage';
import PosterImage from './PosterImage';

const MediaInfoWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  flex-direction: row;
  align-items: center;
  margin: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('95%')}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const TextContentWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('64%')}px;
  justify-content: center;
  height: 100%;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
`;

const MediaTitleText = styled(Text).attrs({
  numberOfLines: 3,
})`
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
  isLoading: boolean;
  voteCount: number;
  posterURL: string;
  imageURL: string;
  title: string;
};

const HeaderInfo = ({
  thumbnailURL,
  votesAverage,
  isLoading,
  voteCount,
  posterURL,
  imageURL,
  title,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <BackgroundImage
        thumbnailURL={thumbnailURL}
        isLoading={isLoading}
        imageURL={imageURL}
      />
      <MediaInfoWrapper
        testID="media-info-wrapper"
      >
        <PosterImage
          image={posterURL}
        />
        <TextContentWrapper>
          <MediaTitleText>{title}</MediaTitleText>
          {!!votesAverage && !!voteCount && (
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
              <VotesValueText>{votesAverage.toFixed(1)}</VotesValueText>
            </VotesWrapper>
          )}
        </TextContentWrapper>
      </MediaInfoWrapper>
    </Wrapper>
  );
};

export default HeaderInfo;
