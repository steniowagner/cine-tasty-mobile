import React from 'react';
import {
  RenderAPI,
  render,
  cleanup,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {randomPositiveNumber} from '@mocks/utils';
import {dark} from '@styles/themes/dark';

import {Tags} from './Tags';

const tagsDataset = (length: number, startFrom: number = 1) =>
  Array(length)
    .fill('')
    .map((_, index) => `TAG_${startFrom * (index + 1)}`);

const renderTags = (tags: string[] = [], extraTags: string[] = []) => (
  <ThemeProvider theme={dark}>
    <Tags extraTags={extraTags} tags={tags} />
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
      afterEach(cleanup);

      it('should render correctly', async () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags, extraTags));
        await waitFor(() => {
          expect(elements.loadingsWrapper(components)).toEqual([]);
        });
        expect(elements.loadingsWrapper(components).length).toEqual(0);
        expect(elements.tags(components)).not.toBeNull();
        expect(elements.tagsWrappers(components).length).toEqual(
          extraTags.length + tags.length,
        );
        await waitFor(() => {});
      });

      it('should render the "tags-text" with the correct text', async () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags, extraTags));
        await waitFor(() => {
          expect(elements.loadingsWrapper(components)).toEqual([]);
        });
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
        await waitFor(() => {});
      });

      it('should render the "tags-text" style correctly', async () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags, extraTags));
        await waitFor(() => {
          expect(elements.loadingsWrapper(components)).toEqual([]);
        });
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
        await waitFor(() => {});
      });
    });

    describe('When it only has "tags"', () => {
      afterEach(cleanup);

      it('should render correctly', async () => {
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags));
        await waitFor(() => {
          expect(elements.loadingsWrapper(components)).toEqual([]);
        });
        expect(elements.loadingsWrapper(components).length).toEqual(0);
        expect(elements.tags(components)).not.toBeNull();
        expect(elements.tagsWrappers(components).length).toEqual(tags.length);
        await waitFor(() => {});
      });

      it('should render the "tags-text" with the correct text', async () => {
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags));
        await waitFor(() => {
          expect(elements.loadingsWrapper(components)).toEqual([]);
        });
        for (let i = 0; i < tags.length; i++) {
          expect(elements.tagsText(components)[i].children[0]).toEqual(tags[i]);
        }
        await waitFor(() => {});
      });

      it('should render the "tags-text" style correctly', async () => {
        const tags = tagsDataset(randomPositiveNumber(10, 1), 11);
        const components = render(renderTags(tags));
        await waitFor(() => {
          expect(elements.loadingsWrapper(components)).toEqual([]);
        });
        for (let i = 0; i < tags.length; i++) {
          expect(
            elements.tagsWrappers(components)[i].props.style[0].backgroundColor,
          ).toEqual(dark.colors.primary);
          expect(elements.tagsText(components)[i].props.style[0].color).toEqual(
            dark.colors.buttonText,
          );
        }
        await waitFor(() => {});
      });
    });

    describe('When it only has "extra-tags"', () => {
      afterEach(cleanup);

      it('should render correctly', async () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const components = render(renderTags([], extraTags));
        await waitFor(() => {
          expect(elements.loadingsWrapper(components)).toEqual([]);
        });
        expect(elements.loadingsWrapper(components).length).toEqual(0);
        expect(elements.tags(components)).not.toBeNull();
        expect(elements.tagsWrappers(components).length).toEqual(
          extraTags.length,
        );
        await waitFor(() => {});
      });

      it('should render the "tags-text" with the correct text', async () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const components = render(renderTags([], extraTags));
        await waitFor(() => {
          expect(elements.loadingsWrapper(components)).toEqual([]);
        });
        for (let i = 0; i < extraTags.length; i++) {
          expect(elements.tagsText(components)[i].children[0]).toEqual(
            extraTags[i],
          );
        }
        await waitFor(() => {});
      });

      it('should render the "tags-text" style correctly', async () => {
        const extraTags = tagsDataset(randomPositiveNumber(10, 1));
        const components = render(renderTags([], extraTags));
        await waitFor(() => {
          expect(elements.loadingsWrapper(components)).toEqual([]);
        });
        for (let i = 0; i < extraTags.length; i++) {
          expect(
            elements.tagsWrappers(components)[i].props.style[0].backgroundColor,
          ).toEqual(dark.colors.contrast);
          expect(elements.tagsText(components)[i].props.style[0].color).toEqual(
            'white',
          );
        }
        await waitFor(() => {});
      });
    });
  });
});
