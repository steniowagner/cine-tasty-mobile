import React from 'react';

import * as Styles from './Tags.styles';

export const NUMBER_ITEMS = 4;

type TagsProps = {
  extraTags: string[];
  tags: string[];
};

export const Tags = (props: TagsProps) => (
  <Styles.Wrapper testID="tags">
    {[...props.extraTags, ...props.tags].map(
      (tag, index) =>
        !!tag && (
          <Styles.TagWrapper
            isExtra={index < props.extraTags.length}
            testID="tag-wrapper"
            key={tag}>
            <Styles.TagText
              isExtra={index < props.extraTags.length}
              testID="tag-text">
              {tag}
            </Styles.TagText>
          </Styles.TagWrapper>
        ),
    )}
  </Styles.Wrapper>
);
