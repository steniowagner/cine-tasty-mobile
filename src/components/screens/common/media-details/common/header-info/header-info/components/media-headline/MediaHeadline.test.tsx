import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {DefaultTheme, ThemeProvider} from 'styled-components/native';

import {randomPositiveNumber} from '@mocks/utils';
import {dark} from '@styles/themes/dark';
import {light} from '@styles/themes/light';

import {MediaHeadline} from './MediaHeadline';

const TITLE = 'SOME_TITLE';

const makeTags = (length: number) =>
  Array(length)
    .fill('')
    .map((_, index) => `Tag ${index}`);

const renderMediaHeadline = (theme: DefaultTheme, tags?: string[]) => (
  <ThemeProvider theme={theme}>
    <MediaHeadline
      title={TITLE}
      voteCount={randomPositiveNumber(10, 1)}
      voteAverage={randomPositiveNumber(10, 1)}
      tags={tags}
    />
  </ThemeProvider>
);

describe('<MediaHeadline />', () => {
  const elements = {
    title: (api: RenderAPI) => api.queryByTestId('media-headline-title'),
    starsWrapper: (api: RenderAPI) =>
      api.queryByTestId('media-headline-stars-wrapper'),
    genres: (api: RenderAPI) => api.queryByTestId('media-headline-genres'),
  };

  describe('Tags', () => {
    describe('When "tags" is defined', () => {
      it('should render the elements correctly', () => {
        const theme = randomPositiveNumber(1, 0) === 0 ? dark : light;
        const tags = makeTags(randomPositiveNumber(10, 1));
        const component = render(renderMediaHeadline(theme, tags));
        expect(elements.title(component).children[0]).toEqual(TITLE);
        expect(elements.starsWrapper(component)).not.toBeNull();
        expect(elements.genres(component).children[0]).toEqual(
          tags.join('  \u2022  '),
        );
      });

      it('should render the "StarsWrapper" with the correct "margin-bottom"', () => {
        const tags = makeTags(randomPositiveNumber(10, 1));
        const theme = randomPositiveNumber(1, 0) === 0 ? dark : light;
        const component = render(renderMediaHeadline(theme, tags));
        expect(
          elements.starsWrapper(component).props.style[0].marginBottom,
        ).toEqual(theme.metrics.smallSize);
      });
    });

    describe('When "tags" are not defined', () => {
      it('should render the elements correctly', () => {
        const theme = randomPositiveNumber(1, 0) === 0 ? dark : light;
        const component = render(renderMediaHeadline(theme));
        expect(elements.title(component).children[0]).toEqual(TITLE);
        expect(elements.starsWrapper(component)).not.toBeNull();
        expect(elements.genres(component)).toBeNull();
      });

      it('should render the "StarsWrapper" with the correct "margin-bottom"', () => {
        const theme = randomPositiveNumber(1, 0) === 0 ? dark : light;
        const component = render(renderMediaHeadline(theme));
        expect(
          elements.starsWrapper(component).props.style[0].marginBottom,
        ).toEqual(theme.metrics.extraSmallSize);
      });
    });
  });

  describe('When the "theme" is "dark"', () => {
    const theme = dark;

    describe('Conditional style', () => {
      it('should render the "conditional-styles" correctly', () => {
        const tags = makeTags(randomPositiveNumber(1, 0));
        const component = render(renderMediaHeadline(theme, tags));
        expect(
          elements.starsWrapper(component).props.style[0].backgroundColor,
        ).toEqual('transparent');
        expect(
          elements.starsWrapper(component).props.style[0].paddingTop,
        ).toEqual(0);
        expect(
          elements.starsWrapper(component).props.style[0].paddingRight,
        ).toEqual(0);
        expect(
          elements.starsWrapper(component).props.style[0].paddingBottom,
        ).toEqual(0);
        expect(
          elements.starsWrapper(component).props.style[0].paddingLeft,
        ).toEqual(0);
      });
    });
  });

  describe('When the "theme" is "light"', () => {
    const theme = light;

    describe('Conditional style', () => {
      it('should render the "conditional-styles" correctly', () => {
        const tags = makeTags(randomPositiveNumber(1, 0));
        const component = render(renderMediaHeadline(theme, tags));
        expect(
          elements.starsWrapper(component).props.style[0].backgroundColor,
        ).toEqual(theme.colors.buttonText);
        expect(
          elements.starsWrapper(component).props.style[0].paddingTop,
        ).toEqual(theme.metrics.mediumSize);
        expect(
          elements.starsWrapper(component).props.style[0].paddingRight,
        ).toEqual(theme.metrics.mediumSize);
        expect(
          elements.starsWrapper(component).props.style[0].paddingBottom,
        ).toEqual(theme.metrics.mediumSize);
        expect(
          elements.starsWrapper(component).props.style[0].paddingLeft,
        ).toEqual(theme.metrics.mediumSize);
      });
    });
  });
});
