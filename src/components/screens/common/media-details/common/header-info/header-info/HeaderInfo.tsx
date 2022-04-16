import React from 'react';
import {View} from 'react-native';

import {StarsVotes} from '@components';

import BackgroundImage from '../background-image/BackgroundImage';
import {PosterImage} from '../poster-image/PosterImage';
import * as Styles from './HeaderInfo.styles';
import {useHeaderInfo} from './useHeaderInfo';

type HeaderInfoProps = {
  votesAverage: number;
  isLoading: boolean;
  voteCount: number;
  posterURL: string;
  imageURL: string;
  title: string;
};

export const HeaderInfo = (props: HeaderInfoProps) => {
  const headerInfo = useHeaderInfo({
    votesAverage: props.votesAverage,
    voteCount: props.voteCount,
  });
  return (
    <Styles.Wrapper>
      <BackgroundImage isLoading={props.isLoading} imageURL={props.imageURL} />
      <Styles.MediaInfoWrapper testID="media-info-wrapper">
        <PosterImage image={props.posterURL} />
        <Styles.TextContentWrapper>
          <Styles.MediaTitleText testID="media-title">
            {props.title}
          </Styles.MediaTitleText>
          {headerInfo.shouldShowVotesContent && (
            <Styles.VotesWrapper>
              <View>
                <StarsVotes
                  voteCount={props.voteCount}
                  votes={props.votesAverage}
                />
                <Styles.Row>
                  <Styles.NumberOfVotesText testID="media-votes-count">
                    {props.voteCount}
                  </Styles.NumberOfVotesText>
                  <Styles.VotesText testID="media-votes-text">
                    {headerInfo.texts.votes}
                  </Styles.VotesText>
                </Styles.Row>
              </View>
              <Styles.VotesValueText testID="media-votes-average">
                {props.votesAverage.toFixed(1)}
              </Styles.VotesValueText>
            </Styles.VotesWrapper>
          )}
        </Styles.TextContentWrapper>
      </Styles.MediaInfoWrapper>
    </Styles.Wrapper>
  );
};
