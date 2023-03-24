import React from 'react';
import {act, fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {randomPositiveNumber} from '@mocks/utils';
import {dark} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {ReviewsSection, Review} from './ReviewsSection';

jest.mock('@styles/metrics', () => {
  const metricsModule = jest.requireActual('@styles/metrics');
  return {
    ...metricsModule,
    getWidthFromDP: jest.fn().mockReturnValue(25),
    getHeightFromDP: jest.fn().mockReturnValue(50),
    extraLargeSize: 10,
    largeSize: 5,
    width: 100,
  };
});

const reviews = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      __typename: 'Review',
      author: `AUTHOR_${index}`,
      content: `CONTENT_${index}`,
      id: `ID_${index}`,
    })) as Review[];

const renderReviewSection = (
  dataset: Review[] = [],
  onPressViewAll = jest.fn(),
) => (
  <ThemeProvider theme={dark}>
    <ReviewsSection reviews={dataset} onPressViewAll={onPressViewAll} />
  </ThemeProvider>
);

describe('<ReviewsSection />', () => {
  const elements = {
    viewAllButton: (api: RenderAPI) =>
      api.queryByTestId('view-all-button-reviews'),
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    dot: (api: RenderAPI) => api.queryAllByTestId('dot'),
    reviewsPreviewList: (api: RenderAPI) =>
      api.queryByTestId('reviews-preview-list'),
    reviewItemWrapper: (api: RenderAPI) =>
      api.queryAllByTestId('reviews-section-list-item-wrapper'),
    reviewItemAuthor: (api: RenderAPI) =>
      api.queryAllByTestId('reviews-section-list-item-author'),
    reviewItemReview: (api: RenderAPI) =>
      api.queryAllByTestId('reviews-section-list-item-review'),
  };

  describe('When has more than one review', () => {
    it('should render correctly when has multiple reviews to show', () => {
      const reviewsDataset = reviews(randomPositiveNumber(10, 2));
      const component = render(renderReviewSection(reviewsDataset));
      expect(elements.viewAllButton(component)).not.toBeNull();
      expect(elements.sectionTitle(component)).not.toBeNull();
      expect(elements.sectionTitle(component).children[0]).toEqual(
        `${Translations.Tags.MEDIA_DETAIL_SECTIONS_REVIEW} (${reviewsDataset.length})`,
      );
      expect(elements.dot(component).length).toBeGreaterThan(1);
      expect(elements.reviewsPreviewList(component)).not.toBeNull();
      expect(elements.reviewItemWrapper(component).length).toEqual(
        Math.min(reviewsDataset.length, 3),
      );
      for (let i = 0; i < Math.min(reviewsDataset.length, 3); i++) {
        expect(elements.reviewItemAuthor(component)[i].children[0]).toEqual(
          reviewsDataset[i].author,
        );
        expect(elements.reviewItemReview(component)[i].children[0]).toEqual(
          reviewsDataset[i].content,
        );
      }
    });

    it('should call "onPressViewAll" when the user press the "view-all" button', () => {
      const onPressViewAll = jest.fn();
      const reviewsDataset = reviews(randomPositiveNumber(10, 2));
      const component = render(
        renderReviewSection(reviewsDataset, onPressViewAll),
      );
      expect(onPressViewAll).toHaveBeenCalledTimes(0);
      expect(elements.viewAllButton(component)).not.toBeNull();
      fireEvent.press(elements.viewAllButton(component));
      expect(onPressViewAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('When has just one review', () => {
    it('should render correctly when has just one review to show', () => {
      const reviewsDataset = reviews(1);
      const component = render(renderReviewSection(reviewsDataset));
      expect(elements.viewAllButton(component)).not.toBeNull();
      expect(elements.sectionTitle(component)).not.toBeNull();
      expect(elements.sectionTitle(component).children[0]).toEqual(
        `${Translations.Tags.MEDIA_DETAIL_SECTIONS_REVIEW} (1)`,
      );
      expect(elements.dot(component).length).toEqual(0);
      expect(elements.reviewsPreviewList(component)).not.toBeNull();
      expect(elements.reviewItemWrapper(component).length).toEqual(1);
      expect(elements.reviewItemAuthor(component)[0].children[0]).toEqual(
        reviewsDataset[0].author,
      );
      expect(elements.reviewItemReview(component)[0].children[0]).toEqual(
        reviewsDataset[0].content,
      );
    });

    it('should call "onPressViewAll" when the user press the "view-all" button', () => {
      const onPressViewAll = jest.fn();
      const reviewsDataset = reviews(1);
      const component = render(
        renderReviewSection(reviewsDataset, onPressViewAll),
      );
      expect(onPressViewAll).toHaveBeenCalledTimes(0);
      expect(elements.viewAllButton(component)).not.toBeNull();
      fireEvent.press(elements.viewAllButton(component));
      expect(onPressViewAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('When has no review', () => {
    it('should render correctly when has no reviews to show', () => {
      const component = render(renderReviewSection());
      expect(elements.viewAllButton(component)).toBeNull();
      expect(elements.sectionTitle(component)).not.toBeNull();
      expect(elements.sectionTitle(component).children[0]).toEqual(
        `${Translations.Tags.MEDIA_DETAIL_SECTIONS_REVIEW} (0)`,
      );
      expect(elements.dot(component).length).toEqual(0);
      expect(elements.reviewsPreviewList(component)).not.toBeNull();
      expect(elements.reviewItemWrapper(component).length).toEqual(0);
      expect(elements.reviewItemAuthor(component).length).toEqual(0);
      expect(elements.reviewItemReview(component).length).toEqual(0);
    });
  });

  describe('Interacting with the "reviews-list"', () => {
    describe('When has just two reviews', () => {
      it('should move the "selected-dot" from the "first-dot" to the "second-dot" when the user swipe to the right', () => {
        const reviewsDataset = reviews(2);
        const component = render(renderReviewSection(reviewsDataset));
        expect(elements.dot(component)[0].props.isSelected).toEqual(true);
        expect(elements.dot(component)[1].props.isSelected).toEqual(false);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: 100 * 1,
              },
            },
          },
        );
        expect(elements.dot(component)[0].props.isSelected).toEqual(false);
        expect(elements.dot(component)[1].props.isSelected).toEqual(true);
      });

      it('should move the "selected-dot" from the "second-dot" to the "first-dot" when the user swipe to the left', () => {
        const reviewsDataset = reviews(2);
        const component = render(renderReviewSection(reviewsDataset));
        expect(elements.dot(component)[0].props.isSelected).toEqual(true);
        expect(elements.dot(component)[1].props.isSelected).toEqual(false);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: 100 * 1,
              },
            },
          },
        );
        expect(elements.dot(component)[0].props.isSelected).toEqual(false);
        expect(elements.dot(component)[1].props.isSelected).toEqual(true);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: -100,
              },
            },
          },
        );
        expect(elements.dot(component)[0].props.isSelected).toEqual(true);
        expect(elements.dot(component)[1].props.isSelected).toEqual(false);
      });
    });

    describe('When has at least three reviews', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should move the "selected-dot" from the "first-dot" to the "second-dot" when the user swipe #1 => #2', () => {
        const length = randomPositiveNumber(10, 3);
        const reviewsDataset = reviews(length);
        const component = render(renderReviewSection(reviewsDataset));
        expect(elements.dot(component)[0].props.isSelected).toEqual(true);
        expect(elements.dot(component)[1].props.isSelected).toEqual(false);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: 100 * 1,
              },
            },
          },
        );
        expect(elements.dot(component)[0].props.isSelected).toEqual(false);
        expect(elements.dot(component)[1].props.isSelected).toEqual(true);
      });

      it('should move the "selected-dot" from the "second-dot" to the "third-dot" #1 => #2 => #3', () => {
        const length = randomPositiveNumber(10, 3);
        const reviewsDataset = reviews(length);
        const component = render(renderReviewSection(reviewsDataset));
        expect(elements.dot(component)[0].props.isSelected).toEqual(true);
        expect(elements.dot(component)[1].props.isSelected).toEqual(false);
        expect(elements.dot(component)[2].props.isSelected).toEqual(false);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: 100,
              },
            },
          },
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.dot(component)[0].props.isSelected).toEqual(false);
        expect(elements.dot(component)[1].props.isSelected).toEqual(true);
        expect(elements.dot(component)[2].props.isSelected).toEqual(false);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: 200,
              },
            },
          },
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.dot(component)[0].props.isSelected).toEqual(false);
        expect(elements.dot(component)[1].props.isSelected).toEqual(false);
        expect(elements.dot(component)[2].props.isSelected).toEqual(true);
      });

      it('should move the "selected-dot" from the "third-dot" to the "second-dot" when the user swipe #1 => #2 => #3 => #2', () => {
        const length = randomPositiveNumber(10, 3);
        const reviewsDataset = reviews(length);
        const component = render(renderReviewSection(reviewsDataset));
        expect(elements.dot(component)[0].props.isSelected).toEqual(true);
        expect(elements.dot(component)[1].props.isSelected).toEqual(false);
        expect(elements.dot(component)[2].props.isSelected).toEqual(false);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: 100,
              },
            },
          },
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.dot(component)[0].props.isSelected).toEqual(false);
        expect(elements.dot(component)[1].props.isSelected).toEqual(true);
        expect(elements.dot(component)[2].props.isSelected).toEqual(false);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: 200,
              },
            },
          },
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.dot(component)[0].props.isSelected).toEqual(false);
        expect(elements.dot(component)[1].props.isSelected).toEqual(false);
        expect(elements.dot(component)[2].props.isSelected).toEqual(true);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: 100,
              },
            },
          },
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.dot(component)[0].props.isSelected).toEqual(false);
        expect(elements.dot(component)[1].props.isSelected).toEqual(true);
        expect(elements.dot(component)[2].props.isSelected).toEqual(false);
      });

      it('should move the "selected-dot" from the "second-dot" to the "first-dot" when the user swipe #1 => #2 => #3 => #2 => #1', () => {
        const length = randomPositiveNumber(10, 3);
        const reviewsDataset = reviews(length);
        const component = render(renderReviewSection(reviewsDataset));
        expect(elements.dot(component)[0].props.isSelected).toEqual(true);
        expect(elements.dot(component)[1].props.isSelected).toEqual(false);
        expect(elements.dot(component)[2].props.isSelected).toEqual(false);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: 100,
              },
            },
          },
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.dot(component)[0].props.isSelected).toEqual(false);
        expect(elements.dot(component)[1].props.isSelected).toEqual(true);
        expect(elements.dot(component)[2].props.isSelected).toEqual(false);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: 200,
              },
            },
          },
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.dot(component)[0].props.isSelected).toEqual(false);
        expect(elements.dot(component)[1].props.isSelected).toEqual(false);
        expect(elements.dot(component)[2].props.isSelected).toEqual(true);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: 100,
              },
            },
          },
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.dot(component)[0].props.isSelected).toEqual(false);
        expect(elements.dot(component)[1].props.isSelected).toEqual(true);
        expect(elements.dot(component)[2].props.isSelected).toEqual(false);
        fireEvent(
          elements.reviewsPreviewList(component),
          'onMomentumScrollEnd',
          {
            nativeEvent: {
              contentOffset: {
                x: -100,
              },
            },
          },
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.dot(component)[0].props.isSelected).toEqual(true);
        expect(elements.dot(component)[1].props.isSelected).toEqual(false);
        expect(elements.dot(component)[2].props.isSelected).toEqual(false);
      });
    });
  });
});
