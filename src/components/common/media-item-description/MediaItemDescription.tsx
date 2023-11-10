import React from 'react';
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';

import { useMediaItemDescription } from './use-media-item-description';
import * as Styles from './MediaItemDescription.styles';
import { Typography } from '..';

type MediaItemDescriptionProps = {
  description: string;
};

export const MediaItemDescription = (props: MediaItemDescriptionProps) => {
  const mediaItemDescription = useMediaItemDescription();

  return (
    <>
      <Typography.ExtraSmallText
        onTextLayout={(event: NativeSyntheticEvent<TextLayoutEventData>) =>
          mediaItemDescription.onTextLayout(event.nativeEvent.lines.length)
        }
        testID="description-text"
        numberOfLines={mediaItemDescription.numberOfLines}>
        {props.description || '-'}
      </Typography.ExtraSmallText>
      {mediaItemDescription.isReadExpandableButtonVisible && (
        <Styles.ExpandableReadButton
          onPress={mediaItemDescription.onPressReadExpandable}
          testID="expandable-read-button">
          <Typography.ExtraSmallText testID="expandable-read-text" bold>
            {mediaItemDescription.expandableReadButtonText}
          </Typography.ExtraSmallText>
        </Styles.ExpandableReadButton>
      )}
    </>
  );
};
