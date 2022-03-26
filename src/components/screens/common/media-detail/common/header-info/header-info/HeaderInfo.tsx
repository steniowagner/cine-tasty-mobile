import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {StarsVotes} from '@components';
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

const HeaderInfo = ({
  votesAverage,
  isLoading,
  voteCount,
  posterURL,
  imageURL,
  title,
}: HeaderInfoProps) => {
  const {t} = useTranslation();

  return (
    <Styles.Wrapper>
      <BackgroundImage isLoading={isLoading} imageURL={imageURL} />
      <Styles.MediaInfoWrapper testID="media-info-wrapper">
        <PosterImage image={posterURL} />
        <Styles.TextContentWrapper>
          <Styles.MediaTitleText>{title}</Styles.MediaTitleText>
          {!!votesAverage && !!voteCount && (
            <Styles.VotesWrapper>
              <View>
                <StarsVotes voteCount={voteCount} votes={votesAverage} />
                <Styles.Row>
                  <Styles.NumberOfVotesText>
                    {voteCount}
                  </Styles.NumberOfVotesText>
                  <Styles.VotesText>
                    {t(TRANSLATIONS.MEDIA_DETAIL_VOTES)}
                  </Styles.VotesText>
                </Styles.Row>
              </View>
              <Styles.VotesValueText>
                {votesAverage.toFixed(1)}
              </Styles.VotesValueText>
            </Styles.VotesWrapper>
          )}
        </Styles.TextContentWrapper>
      </Styles.MediaInfoWrapper>
    </Styles.Wrapper>
  );
};

export default HeaderInfo;
