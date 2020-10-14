import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from 'utils/constants';

interface ReleaseYearStyleProp {
  isFirst: boolean;
}

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  margin-bottom: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

const TagWrapper = styled(View)<ReleaseYearStyleProp>`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ isFirst, theme }) => (isFirst ? theme.colors.contrast : theme.colors.primary)};
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const TagText = styled(Text)<ReleaseYearStyleProp>`
  font-family: CircularStd-Medium;
  color: ${({ isFirst, theme }) => (isFirst ? theme.colors.text : theme.colors.buttonText)};
  text-align: center;
`;

type Props = {
  releaseDate: string;
  tags: string[];
};

const Tags = ({ tags, releaseDate }: Props) => {
  const releaseYear = releaseDate.split('-')[0];

  return (
    <Wrapper>
      {[releaseYear, ...tags].map(
        (tag, index) => !!tag && (
        <TagWrapper
          isFirst={index === 0}
          key={tag}
        >
          <TagText
            isFirst={index === 0}
          >
            {tag}
          </TagText>
        </TagWrapper>
        ),
      )}
    </Wrapper>
  );
};

export default Tags;
