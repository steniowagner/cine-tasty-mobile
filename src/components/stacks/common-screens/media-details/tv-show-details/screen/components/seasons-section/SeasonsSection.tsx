import React from 'react';
import { useTheme } from 'styled-components/native';

import { Section, Typography } from '@common-components';

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
    <Section title={seasonsSection.texts.seasons}>
      <Styles.List>
        {seasonsSection.seasons.map(season => (
          <Styles.SeasonWrapper key={season}>
            <Typography.MediumText bold color={theme.colors.buttonText}>
              {season}
            </Typography.MediumText>
          </Styles.SeasonWrapper>
        ))}
      </Styles.List>
    </Section>
  );
};
