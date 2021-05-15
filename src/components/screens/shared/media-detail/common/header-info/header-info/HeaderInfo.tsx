import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import StarsVotes from '@components/common/stars-votes/StarsVotes';
import * as TRANSLATIONS from '@i18n/tags';

import BackgroundImage from '../background-image/BackgroundImage';
import PosterImage from '../poster-image/PosterImage';
import * as Styles from './HeaderInfo.styles';

type HeaderInfoProps = {
  votesAverage: number;
  isLoading: boolean;
  voteCount: number;
  posterURL: string;
  imageURL: string;
  title: string;
};

const HeaderInfo = (props: HeaderInfoProps) => {
  const { t } = useTranslation();

  return (
    <Styles.Wrapper>
      <BackgroundImage
        isLoading={props.isLoading}
        imageURL={props.imageURL}
      />
      <Styles.MediaInfoWrapper
        testID="media-info-wrapper"
      >
        <PosterImage
          image={props.posterURL}
        />
        <Styles.TextContentWrapper>
          <Styles.MediaTitleText>{props.title}</Styles.MediaTitleText>
          {!!props.votesAverage && !!props.voteCount && (
            <Styles.VotesWrapper>
              <View>
                <StarsVotes
                  voteCount={props.voteCount}
                  votes={props.votesAverage}
                />
                <Styles.Row>
                  <Styles.NumberOfVotesText>{props.voteCount}</Styles.NumberOfVotesText>
                  <Styles.VotesText>
                    {t(TRANSLATIONS.MEDIA_DETAIL_VOTES)}
                  </Styles.VotesText>
                </Styles.Row>
              </View>
              <Styles.VotesValueText>
                {props.votesAverage.toFixed(1)}
              </Styles.VotesValueText>
            </Styles.VotesWrapper>
          )}
        </Styles.TextContentWrapper>
      </Styles.MediaInfoWrapper>
    </Styles.Wrapper>
  );
};

export default HeaderInfo;
