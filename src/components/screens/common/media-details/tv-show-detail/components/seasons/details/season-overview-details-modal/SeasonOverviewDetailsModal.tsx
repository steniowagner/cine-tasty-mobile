import {ModalSheet} from '@components';
import React from 'react';
import {ScrollView} from 'react-native';

import * as Styles from './SeasonOverviewDetailsModal.styles';

type SeasonOverviewDetailsModalProps = {
  title: string;
  ctaButtonTitle: string;
  onPressCtaButton: () => void;
  onClose: () => void;
  overview: string;
  isOpen: boolean;
};

export const SeasonOverviewDetailsModal = (
  props: SeasonOverviewDetailsModalProps,
) => (
  <ModalSheet
    title={props.title}
    isOpen={props.isOpen}
    onClose={props.onClose}
    ctaButtonTitle={props.ctaButtonTitle}
    ctaButtonCallback={props.onPressCtaButton}>
    <ScrollView contentContainerStyle={Styles.sheet.wrapper} bounces={false}>
      <Styles.EpisodeOverview testID="season-overview-details">
        {props.overview}
      </Styles.EpisodeOverview>
    </ScrollView>
  </ModalSheet>
);
