import React from 'react';
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';

import { useMediaItemDescription } from './use-media-item-description';
import * as Styles from './MediaItemDescription.styles';
import { Typography } from '..';

type MediaItemDescriptionProps = {
  description?: string | null;
  alignment?: 'auto' | 'left' | 'center' | 'right' | 'justify';
  color?: string;
};

export const MediaItemDescription = (props: MediaItemDescriptionProps) => {
  const mediaItemDescription = useMediaItemDescription();

  return (
    <>
      <Typography.ExtraSmallText
        onTextLayout={(event: NativeSyntheticEvent<TextLayoutEventData>) =>
          mediaItemDescription.onTextLayout(event.nativeEvent.lines.length)
        }
        color={props.color}
        alignment={props.alignment}
        testID="description-text"
        numberOfLines={mediaItemDescription.numberOfLines}>
        {props.description || '-'}
      </Typography.ExtraSmallText>
      {mediaItemDescription.isReadExpandableButtonVisible && (
        <Styles.ExpandableReadButton
          onPress={mediaItemDescription.onPressReadExpandable}
          testID="expandable-read-button">
          <Typography.ExtraSmallText
            testID="expandable-read-text"
            bold
            color={props.color}>
            {mediaItemDescription.expandableReadButtonText}
          </Typography.ExtraSmallText>
        </Styles.ExpandableReadButton>
      )}
    </>
  );
};
