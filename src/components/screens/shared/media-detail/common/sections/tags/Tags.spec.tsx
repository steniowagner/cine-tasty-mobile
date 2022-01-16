import React from 'react';
import { render, cleanup, act } from '@testing-library/react-native';

import { DEFAULT_ANIMATION_DURATION } from '@components/common/popup-advice/PopupAdvice';
import timeTravel, { setupTimeTravel } from '@mocks/timeTravel';
import { ThemeContextProvider } from '@providers';

import Tags, { NUMBER_ITEMS } from './Tags';

const RELEASE_YEAR = '1994';

const NUMBER_TAGS = 5;

const tags = Array(NUMBER_TAGS)
  .fill('tag')
  .map((tag, index) => `${tag}-${index}`);

const extraTags = [RELEASE_YEAR, 'MEDIA_TYPE'];

const tagsWithReleaseYear = [...extraTags, ...tags];

const renderTags = (isLoading = false) => (
  <ThemeContextProvider>
    <Tags extraTags={extraTags} isLoading={isLoading} tags={tags} />
  </ThemeContextProvider>
);

describe('Testing <Tags />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly when is not loading', () => {
    const { queryAllByTestId, getAllByTestId } = render(renderTags());

    expect(getAllByTestId('tag-wrapper').length).toEqual(NUMBER_TAGS + extraTags.length);

    expect(
      expect(getAllByTestId('tag-text').length).toEqual(NUMBER_TAGS + +extraTags.length),
    );

    expect(
      getAllByTestId('tag-text').every((tag, index) => {
        if (index === 0) {
          return tag.children[0] === extraTags[index];
        }

        if (index === 0) {
          return tag.children[0] === extraTags[index];
        }

        return tag.children[0] === tagsWithReleaseYear[index];
      }),
    ).toEqual(true);

    expect(queryAllByTestId('loading-placeholder').length).toEqual(0);
  });

  it('should render correctly when is loading', () => {
    const { queryAllByTestId, getAllByTestId } = render(renderTags(true));

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    expect(queryAllByTestId('tag-wrapper').length).toEqual(0);

    expect(expect(queryAllByTestId('tag-text').length).toEqual(0));

    expect(getAllByTestId('loading-placeholder').length).toEqual(NUMBER_ITEMS);
  });
});
