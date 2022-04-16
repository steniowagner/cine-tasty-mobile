import React from 'react';
import {Image} from 'react-native';
import {RenderAPI, render, waitFor} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {randomPositiveNumber} from '@mocks/utils';
import {dark} from '@styles/themes/dark';

import {NUMBER_ITEMS, Tags} from './Tags';

const tagsDataset = (length: number, startFrom: number = 1) =>
  Array(length)
    .fill('')
    .map((_, index) => `TAG_${startFrom * (index + 1)}`);

const renderTags = (
  tags: string[] = [],
  extraTags: string[] = [],
  isLoading = false,
) => (
  <ThemeProvider theme={dark}>
    <Tags extraTags={extraTags} isLoading={isLoading} tags={tags} />
  </ThemeProvider>
);

describe('<Tags />', () => {
  const elements = {
    loadingsWrapper: (api: RenderAPI) => api.queryAllByTestId('tags-loading'),
    loadings: (api: RenderAPI) => api.queryAllByTestId('loading-placeholder'),
    tags: (api: RenderAPI) => api.queryAllByTestId('tags'),
    tagsWrappers: (api: RenderAPI) => api.queryAllByTestId('tag-wrapper'),
    tagsText: (api: RenderAPI) => api.queryAllByTestId('tag-text'),
  };

  describe('Renders correctly', () => {
    describe('When it has "tags" and "extra-tags"', () => {
      it('should render correctly', () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags, extraTags));
        expect(elements.loadingsWrapper(components).length).toEqual(0);
        expect(elements.tags(components)).not.toBeNull();
        expect(elements.tagsWrappers(components).length).toEqual(
          extraTags.length + tags.length,
        );
      });

      it('should render the "tags-text" with the correct text', () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags, extraTags));
        for (let i = 0; i < extraTags.length; i++) {
          expect(elements.tagsText(components)[i].children[0]).toEqual(
            extraTags[i],
          );
        }
        for (let i = 0; i < tags.length; i++) {
          expect(
            elements.tagsText(components)[i + extraTags.length].children[0],
          ).toEqual(tags[i]);
        }
      });

      it('should render the "tags-text" style correctly', () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags, extraTags));
        for (let i = 0; i < extraTags.length; i++) {
          expect(
            elements.tagsWrappers(components)[i].props.style[0].backgroundColor,
          ).toEqual(dark.colors.contrast);
          expect(elements.tagsText(components)[i].props.style[0].color).toEqual(
            'white',
          );
        }
        for (let i = 0; i < tags.length; i++) {
          expect(
            elements.tagsWrappers(components)[i + extraTags.length].props
              .style[0].backgroundColor,
          ).toEqual(dark.colors.primary);
          expect(
            elements.tagsText(components)[i + extraTags.length].props.style[0]
              .color,
          ).toEqual(dark.colors.buttonText);
        }
      });
    });

    describe('When it only has "tags"', () => {
      it('should render correctly', () => {
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags));
        expect(elements.loadingsWrapper(components).length).toEqual(0);
        expect(elements.tags(components)).not.toBeNull();
        expect(elements.tagsWrappers(components).length).toEqual(tags.length);
      });

      it('should render the "tags-text" with the correct text', () => {
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags));
        for (let i = 0; i < tags.length; i++) {
          expect(elements.tagsText(components)[i].children[0]).toEqual(tags[i]);
        }
      });

      it('should render the "tags-text" style correctly', () => {
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags));

        for (let i = 0; i < tags.length; i++) {
          expect(
            elements.tagsWrappers(components)[i].props.style[0].backgroundColor,
          ).toEqual(dark.colors.primary);
          expect(elements.tagsText(components)[i].props.style[0].color).toEqual(
            dark.colors.buttonText,
          );
        }
      });
    });

    describe('When it only has "extra-tags"', () => {
      it('should render correctly', () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const components = render(renderTags([], extraTags));
        expect(elements.loadingsWrapper(components).length).toEqual(0);
        expect(elements.tags(components)).not.toBeNull();
        expect(elements.tagsWrappers(components).length).toEqual(
          extraTags.length,
        );
      });

      it('should render the "tags-text" with the correct text', () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const components = render(renderTags([], extraTags));
        for (let i = 0; i < extraTags.length; i++) {
          expect(elements.tagsText(components)[i].children[0]).toEqual(
            extraTags[i],
          );
        }
      });

      it('should render the "tags-text" style correctly', () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const components = render(renderTags([], extraTags));
        for (let i = 0; i < extraTags.length; i++) {
          expect(
            elements.tagsWrappers(components)[i].props.style[0].backgroundColor,
          ).toEqual(dark.colors.contrast);
          expect(elements.tagsText(components)[i].props.style[0].color).toEqual(
            'white',
          );
        }
      });
    });
  });

  describe('Loading State', () => {
    beforeAll(() => {
      jest
        .spyOn(Image, 'getSize')
        .mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            onSuccess(100, 100);
          },
        );
    });

    it('should render the "loading-state" correctly when "isLoading" is "true"', async () => {
      const extraTags = tagsDataset(randomPositiveNumber(10, 1));
      const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
      const components = render(renderTags(tags, extraTags, true));
      await waitFor(() => {
        expect(elements.loadingsWrapper(components)).not.toBeNull();
      });
      expect(elements.loadings(components).length).toEqual(NUMBER_ITEMS);
      expect(elements.tags(components).length).toEqual(0);
      expect(elements.tagsWrappers(components).length).toEqual(0);
    });
  });
});
