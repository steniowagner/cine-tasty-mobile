jest.unmock('react-native-reanimated');
import React from 'react';
import {render, RenderAPI, waitFor} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualitiesProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';

import {HeaderInfo} from './HeaderInfo';

const mockHeaderHeight = 10;

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: () => mockHeaderHeight,
}));

const makeTags = (length: number, isExtra?: boolean) =>
  Array(length)
    .fill('')
    .map((_, index) => `${isExtra ? 'ExtraTag' : 'Tag'} ${index}`);

const renderHeaderInfo = () => (
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={theme}>
      <HeaderInfo
        votesAverage={randomPositiveNumber(10)}
        voteCount={randomPositiveNumber(10)}
        poster="POSTER"
        title="SOME_TITLE"
        tags={makeTags(randomPositiveNumber(10))}
        extraTags={makeTags(randomPositiveNumber(10), true)}
      />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
);

describe('<HeaderInfo />', () => {
  const elements = {
    wrapper: (api: RenderAPI) => api.queryByTestId('header-info-wrapper'),
  };

  it('should render the "wrapper" with the correct "margin-top"', async () => {
    const component = render(renderHeaderInfo());
    expect(elements.wrapper(component).props.style[0].marginTop).toEqual(
      theme.metrics.extraLargeSize + mockHeaderHeight,
    );
    await waitFor(() => {});
  });
});
