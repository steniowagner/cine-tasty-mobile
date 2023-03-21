import React from 'react';

import {LoadingPlaceholder, Section} from '@components';

import * as SeasonsDetailsStyles from '../SeasonsDetails.styles';
import * as HeaderStyles from '../header/Header.styles';
import * as Styles from './LoadingSeasonsDetails.styles';

const NUMBER_OF_ITEMS = 10;

export const LoadingSeasonsDetails = () => (
  <>
    <HeaderStyles.Wrapper testID="header-wrapper">
      <HeaderStyles.SeasonPosterImageWrapper testID="poster-image-wrapper">
        <Styles.HeaderWrapper>
          <LoadingPlaceholder
            indexToDelayAnimation={0}
            style={HeaderStyles.sheet.poster}
          />
          <Styles.TextsPlaceholdersWrapper>
            <>
              <LoadingPlaceholder
                indexToDelayAnimation={0}
                style={Styles.sheet.text}
              />
              <LoadingPlaceholder
                indexToDelayAnimation={0}
                style={Styles.sheet.text}
              />
              <LoadingPlaceholder
                indexToDelayAnimation={0}
                style={Styles.sheet.text}
              />
              <LoadingPlaceholder
                indexToDelayAnimation={0}
                style={Styles.sheet.text}
              />
            </>
          </Styles.TextsPlaceholdersWrapper>
        </Styles.HeaderWrapper>
      </HeaderStyles.SeasonPosterImageWrapper>
    </HeaderStyles.Wrapper>
    <Section title="" withHorizontalPadding noMarginTop>
      <LoadingPlaceholder
        indexToDelayAnimation={0}
        style={{...Styles.sheet.text, ...Styles.sheet.episodesText}}
      />
    </Section>
    {Array(NUMBER_OF_ITEMS)
      .fill(undefined)
      .map((_, index) => (
        <>
          <Styles.EpisodeWrapper>
            <LoadingPlaceholder
              indexToDelayAnimation={0}
              style={Styles.sheet.episodeIndex}
            />
            <LoadingPlaceholder
              indexToDelayAnimation={0}
              style={{...Styles.sheet.text, ...Styles.sheet.episodesTitle}}
            />
          </Styles.EpisodeWrapper>
          {index < NUMBER_OF_ITEMS - 1 && <SeasonsDetailsStyles.LineDivider />}
        </>
      ))}
  </>
);
