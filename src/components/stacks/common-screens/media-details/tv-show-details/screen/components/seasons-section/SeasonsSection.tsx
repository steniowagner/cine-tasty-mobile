import React from 'react';
import { useTheme } from 'styled-components/native';

import { Typography } from '@common-components';

import { useSeasonsSection } from './use-seasons-section';
import * as Styles from './SeasonsSection.styles';

type SeasonsSectionProps = {
  numberOfSeasons: number;
  tvShowId?: number | null;
  tvShowName?: string | null;
};

export const SeasonsSection = (props: SeasonsSectionProps) => {
  const seasonsSection = useSeasonsSection({
    numberOfSeasons: props.numberOfSeasons,
    tvShowName: props.tvShowName,
    tvShowId: props.tvShowId,
  });
  const theme = useTheme();

  return (
    <Styles.List>
      {seasonsSection.seasons.map((season, index) => (
        <Styles.SeasonWrapper
          testID="season-button"
          key={season}
          onPress={() => seasonsSection.onPress(index + 1)}>
          <Typography.MediumText
            testID="season-title"
            bold
            color={theme.colors.buttonText}>
            {season}
          </Typography.MediumText>
        </Styles.SeasonWrapper>
      ))}
    </Styles.List>
  );
};
