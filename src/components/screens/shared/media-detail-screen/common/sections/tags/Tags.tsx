import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

export const NUMBER_ITEMS = 4;

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
  isLoading: boolean;
  tags: string[];
};

const Tags = ({ isLoading, releaseDate, tags }: Props) => {
  if (isLoading) {
    return (
      <Wrapper>
        {Array(NUMBER_ITEMS)
          .fill({})
          .map((_, index) => (
            <LoadingPlaceholder
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={{
                marginTop: CONSTANTS.VALUES.DEFAULT_SPACING,
                width: metrics.getWidthFromDP('20%'),
                height: metrics.getWidthFromDP('10%'),
                borderRadius: metrics.extraSmallSize,
                marginRight: metrics.smallSize,
              }}
            />
          ))}
      </Wrapper>
    );
  }

  const releaseYear = releaseDate.split('-')[0];

  return (
    <Wrapper>
      {[releaseYear, ...tags].map(
        (tag, index) => !!tag && (
        <TagWrapper
          isFirst={index === 0}
          testID="tag-wrapper"
          key={tag}
        >
          <TagText
            isFirst={index === 0}
            testID="tag-text"
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
