import React from 'react';
import { useTheme } from 'styled-components/native';

import { Typography } from '@/components/common';

import * as Styles from './MediaInfo.styles';

type Info = {
  title: string;
  value: string;
};

type MediaInfoProps = {
  infos: Info[];
};

export const MediaInfo = (props: MediaInfoProps) => {
  const theme = useTheme();

  if (!props.infos.length) {
    return null;
  }

  return (
    <Styles.Wrapper testID="media-info-wrapper">
      {props.infos.map((info, index) => (
        <Styles.InfoCellWrapper key={info.title}>
          <Typography.ExtraSmallText testID={`media-info-title-${index}`}>
            {info.title}
          </Typography.ExtraSmallText>
          <Typography.ExtraSmallText
            testID={`media-info-value-${index}`}
            color={theme.colors.subText}>
            {info.value}
          </Typography.ExtraSmallText>
        </Styles.InfoCellWrapper>
      ))}
    </Styles.Wrapper>
  );
};
