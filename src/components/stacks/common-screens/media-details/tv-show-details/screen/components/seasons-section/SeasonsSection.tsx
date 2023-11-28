import React from 'react';
import { useTheme } from 'styled-components/native';

import { Typography } from '@common-components';

import { useSeasonsSection } from './use-seasons-section';
import * as Styles from './SeasonsSection.styles';

type SeasonsSectionProps = {
  numberOfSeasons: number;
};

export const SeasonsSection = (props: SeasonsSectionProps) => {
  const seasonsSection = useSeasonsSection({
    numberOfSeasons: props.numberOfSeasons,
  });
  const theme = useTheme();

  return (
    <Styles.List>
      {seasonsSection.seasons.map(season => (
        <Styles.SeasonWrapper testID="season-button" key={season}>
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
