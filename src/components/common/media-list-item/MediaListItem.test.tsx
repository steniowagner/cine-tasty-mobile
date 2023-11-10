import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import { TMDBImageQualitiesProvider } from '@/providers';
import { dark as theme } from '@styles/themes';
import metrics from '@/styles/metrics';
import { Routes } from '@/navigation';

import { UseMediaListItemParams as RenderMediaListItemProps } from './use-media-list-item';
import { randomPositiveNumber } from '../../../../__mocks__/utils';
import { MediaListItem } from './MediaListItem';

const mockPush = jest.fn();
const mockGetState = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualReactNavigationNative = jest.requireActual(
    '@react-navigation/native',
  );
  return {
    ...actualReactNavigationNative,
    useNavigation: () => ({
      push: mockPush,
      getState: mockGetState,
    }),
  };
});

const renderMediaListItem = (props: RenderMediaListItemProps) => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualitiesProvider>
      <MediaListItem {...props} />
    </TMDBImageQualitiesProvider>
  </ThemeProvider>
);

describe('Components/Common/MediaListItem', () => {
  const elements = {
    title: (component: RenderAPI) =>
      component.getByTestId('media-list-item-title'),
    votesWrapper: (component: RenderAPI) =>
      component.queryByTestId('media-list-item-votes-wrapper'),
    votes: (component: RenderAPI) =>
      component.queryByTestId('media-list-item-votes'),
    image: (component: RenderAPI) =>
      component.queryByTestId('tmdb-fallback-image'),
    button: (component: RenderAPI) => component.getByTestId('media-list-item'),
  };

  describe('Rendering', () => {
    describe('Title', () => {
      it('should render correctly when "title" is "defined"', async () => {
        const title = 'TITLE';
        const component = render(
          renderMediaListItem({
            layoutSize:
              randomPositiveNumber(2, 1) % 2 === 0 ? 'large' : 'medium',
            title,
            mediaType:
              randomPositiveNumber(2, 1) % 2 === 0 ? 'MOVIE' : 'TV_SHOW',
          }),
        );
        expect(elements.title(component).children[0]).toEqual(title);
        await waitFor(() => {});
      });

      it('should render correctly when "title" is "undefined"', async () => {
        const component = render(
          renderMediaListItem({
            layoutSize:
              randomPositiveNumber(2, 1) % 2 === 0 ? 'large' : 'medium',
            mediaType:
              randomPositiveNumber(2, 1) % 2 === 0 ? 'MOVIE' : 'TV_SHOW',
          }),
        );
        expect(elements.title(component).children[0]).toEqual('-');
        await waitFor(() => {});
      });
    });

    describe('Votes', () => {
      describe('When "voteAverage" is "undefined"', () => {
        it('should not be rendered when "voteCount" is "undefined"', async () => {
          const component = render(
            renderMediaListItem({
              layoutSize:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'large' : 'medium',
              mediaType:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'MOVIE' : 'TV_SHOW',
            }),
          );
          expect(elements.votesWrapper(component)).toBeNull();
          await waitFor(() => {});
        });

        it('should not be rendered when "voteCount" is "defined"', async () => {
          const component = render(
            renderMediaListItem({
              voteCount: randomPositiveNumber(10, 1),
              layoutSize:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'large' : 'medium',
              mediaType:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'MOVIE' : 'TV_SHOW',
            }),
          );
          expect(elements.votesWrapper(component)).toBeNull();
          await waitFor(() => {});
        });
      });

      describe('When "voteCount" is "undefined"', () => {
        it('should not be rendered when "voteAverage" is "undefined"', async () => {
          const component = render(
            renderMediaListItem({
              layoutSize:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'large' : 'medium',
              mediaType:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'MOVIE' : 'TV_SHOW',
            }),
          );
          expect(elements.votesWrapper(component)).toBeNull();
          await waitFor(() => {});
        });

        it('should not be rendered when "voteAverage" is "defined"', async () => {
          const component = render(
            renderMediaListItem({
              voteAverage: randomPositiveNumber(10, 1),
              layoutSize:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'large' : 'medium',
              mediaType:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'MOVIE' : 'TV_SHOW',
            }),
          );
          expect(elements.votesWrapper(component)).toBeNull();
          await waitFor(() => {});
        });
      });

      it('should render when "voteCount" and "voteAverage" are "defined"', async () => {
        const voteCount = randomPositiveNumber(10);
        const voteAverage = randomPositiveNumber(10);
        const component = render(
          renderMediaListItem({
            voteAverage,
            voteCount,
            layoutSize:
              randomPositiveNumber(2, 1) % 2 === 0 ? 'large' : 'medium',
            mediaType:
              randomPositiveNumber(2, 1) % 2 === 0 ? 'MOVIE' : 'TV_SHOW',
          }),
        );
        expect(elements.votesWrapper(component)).not.toBeNull();
        expect(elements.votes(component)!.children[0]).toEqual(
          `${voteAverage.toFixed(1)} (${voteCount})`,
        );
        await waitFor(() => {});
      });
    });
  });

  describe('Style', () => {
    describe('When "layout-size" is "large"', () => {
      it('should render with the correct dimensions', async () => {
        const component = render(
          renderMediaListItem({
            layoutSize: 'large',
            mediaType:
              randomPositiveNumber(2, 1) % 2 === 0 ? 'MOVIE' : 'TV_SHOW',
          }),
        );
        await waitFor(() => {
          expect(elements.image(component)?.props.style.width).toEqual(
            metrics.getWidthFromDP('40'),
          );
          expect(elements.image(component)?.props.style.height).toEqual(
            metrics.getWidthFromDP('60'),
          );
        });
      });
    });

    describe('When "layout-size" is "medium"', () => {
      it('should render with the correct dimensions', async () => {
        const component = render(
          renderMediaListItem({
            layoutSize: 'medium',
            mediaType:
              randomPositiveNumber(2, 1) % 2 === 0 ? 'MOVIE' : 'TV_SHOW',
          }),
        );
        await waitFor(() => {
          expect(elements.image(component)?.props.style.width).toEqual(
            metrics.getWidthFromDP('30'),
          );
          expect(elements.image(component)?.props.style.height).toEqual(
            metrics.getWidthFromDP('40'),
          );
        });
      });
    });
  });

  describe('Pressing the item', () => {
    describe('When the "current-stack" is "Home"', () => {
      describe('When "media-type" is "Movie"', () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        it('should call "navigation.push" correctly', async () => {
          const component = render(
            renderMediaListItem({
              layoutSize:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'large' : 'medium',
              mediaType: 'MOVIE',
            }),
          );
          mockGetState.mockReturnValue({
            routes: [
              {
                name: Routes.Home.HOME,
              },
            ],
          });
          expect(mockPush).toBeCalledTimes(0);
          fireEvent.press(elements.button(component));
          expect(mockPush).toBeCalledTimes(1);
          expect(mockPush).toBeCalledWith(Routes.Home.MOVIE_DETAILS);
          await waitFor(() => {});
        });
      });

      describe('When "media-type" is "TV-show"', () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        it('should call "navigation.push" correctly', async () => {
          const component = render(
            renderMediaListItem({
              layoutSize:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'large' : 'medium',
              mediaType: 'TV_SHOW',
            }),
          );
          mockGetState.mockReturnValue({
            routes: [
              {
                name: Routes.Home.HOME,
              },
            ],
          });
          expect(mockPush).toBeCalledTimes(0);
          fireEvent.press(elements.button(component));
          expect(mockPush).toBeCalledTimes(1);
          expect(mockPush).toBeCalledWith(Routes.Home.TV_SHOW_DETAILS);
          await waitFor(() => {});
        });
      });
    });

    describe('When the "current-stack" is "Famous"', () => {
      describe('When "media-type" is "Movie"', () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        it('should call "navigation.push" correctly', async () => {
          const component = render(
            renderMediaListItem({
              layoutSize:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'large' : 'medium',
              mediaType: 'MOVIE',
            }),
          );
          mockGetState.mockReturnValue({
            routes: [
              {
                name: Routes.Famous.TRENDING_FAMOUS,
              },
            ],
          });
          expect(mockPush).toBeCalledTimes(0);
          fireEvent.press(elements.button(component));
          expect(mockPush).toBeCalledTimes(1);
          expect(mockPush).toBeCalledWith(Routes.Famous.MOVIE_DETAILS);
          await waitFor(() => {});
        });
      });

      describe('When "media-type" is "TV-show"', () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        it('should call "navigation.push" correctly', async () => {
          const component = render(
            renderMediaListItem({
              layoutSize:
                randomPositiveNumber(2, 1) % 2 === 0 ? 'large' : 'medium',
              mediaType: 'TV_SHOW',
            }),
          );
          mockGetState.mockReturnValue({
            routes: [
              {
                name: Routes.Famous.TRENDING_FAMOUS,
              },
            ],
          });
          expect(mockPush).toBeCalledTimes(0);
          fireEvent.press(elements.button(component));
          expect(mockPush).toBeCalledTimes(1);
          expect(mockPush).toBeCalledWith(Routes.Famous.TV_SHOW_DETAILS);
          await waitFor(() => {});
        });
      });
    });
  });
});
