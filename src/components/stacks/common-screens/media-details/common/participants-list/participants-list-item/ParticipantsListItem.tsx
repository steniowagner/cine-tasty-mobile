import React, { memo } from 'react';

import { Typography, TMDBImage } from '@common-components';

import * as Styles from './ParticipantsListItem.styles';

type ParticipantListItemProps = {
  onPress: () => void;
  subText?: string;
  image: string;
  name: string;
};

export const ParticipantListItem = memo(
  (props: ParticipantListItemProps) => (
    <Styles.Wrapper testID="participant-button" onPress={props.onPress}>
      <TMDBImage
        imageType="poster"
        testID="participant-image"
        image={props.image}
        style={Styles.sheet.image}
        iconImageLoading="account"
        iconImageError="image-off"
        iconSize={Styles.DEFAULT_ICON_SIZE}
      />
      {/* @ts-ignore */}
      <Styles.SmokeShadow />
      <Styles.TextContentWrapper>
        <Typography.SmallText bold testID="participant-name">
          {props.name}
        </Typography.SmallText>
        {props.subText && (
          <Styles.SubText testID="participant-subtext" color="primary">
            {props.subText}
          </Styles.SubText>
        )}
      </Styles.TextContentWrapper>
    </Styles.Wrapper>
  ),
  () => true,
);
