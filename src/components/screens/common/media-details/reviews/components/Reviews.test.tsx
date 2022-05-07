import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {randomPositiveNumber} from '@mocks/utils';
import {navigation} from '@mocks/navigationMock';
import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';

import {Review} from '../routes/route-params-types';
import {Reviews} from './Reviews';

const makeReviews = (length: number): Review[] =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      content: `CONTENT-${index}`,
      author: `AUTHOR-${index}`,
    }));

const renderReviews = (reviews?: Review[]) => {
  const params = reviews
    ? {
        mediaTitle: 'SOME_MEDIAL_TITLE',
        reviews,
      }
    : undefined;
  return (
    <ThemeProvider theme={theme}>
      <Reviews
        navigation={navigation}
        route={{
          name: Routes.MediaDetail.REVIEWS,
          key: `${Routes.MediaDetail.REVIEWS}-key`,
          params,
        }}
      />
    </ThemeProvider>
  );
};

describe('<Reviews />', () => {
  const elements = {
    reviewWrapper: (api: RenderAPI) => api.queryAllByTestId('review-wrapper'),
    reviewAuthor: (api: RenderAPI) => api.queryAllByTestId('review-author'),
    reviewSeparator: (api: RenderAPI) => api.queryAllByTestId('separator'),
    reviewsText: (api: RenderAPI) => api.getByTestId('reviews-text'),
    reviewDescription: (api: RenderAPI) =>
      api.queryAllByTestId('description-text'),
  };

  describe('When the Reviews are defined', () => {
    it('should render all the reviews correctly', () => {
      const length = randomPositiveNumber(10, 1);
      const reviews = makeReviews(length);
      const component = render(renderReviews(reviews));
      expect(elements.reviewWrapper(component).length).toEqual(length);
    });

    it('should render the reviews correctly on the correct sequence', () => {
      const length = randomPositiveNumber(10, 1);
      const reviews = makeReviews(length);
      const component = render(renderReviews(reviews));
      for (let i = 0; i < length; i++) {
        expect(elements.reviewAuthor(component)[i].children[0]).toEqual(
          reviews[i].author,
        );
        expect(elements.reviewDescription(component)[i].children[0]).toEqual(
          reviews[i].content,
        );
      }
    });

    it('should render the separators correctly', () => {
      const length = randomPositiveNumber(10, 1);
      const reviews = makeReviews(length);
      const component = render(renderReviews(reviews));
      expect(elements.reviewSeparator(component).length).toEqual(length - 1);
    });

    it('should render the "Reviews" text correctly', () => {
      const length = randomPositiveNumber(10, 1);
      const reviews = makeReviews(length);
      const component = render(renderReviews(reviews));
      expect(elements.reviewsText(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_REVIEW,
      );
    });
  });

  describe('When the Reviews are not defined', () => {
    it('should only render the "Reviews" text', () => {
      const component = render(renderReviews());
      expect(elements.reviewsText(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_REVIEW,
      );
      expect(elements.reviewWrapper(component)).toEqual([]);
      expect(elements.reviewAuthor(component)).toEqual([]);
      expect(elements.reviewSeparator(component)).toEqual([]);
      expect(elements.reviewDescription(component)).toEqual([]);
    });
  });
});
