import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { RenderAPI, render } from '@testing-library/react-native';
import { dark as theme } from '@styles/themes';

import { randomPositiveNumber } from '../../../../__mocks__/utils';
import {
  MediaHorizontalList,
  MediaHorizontalListProps,
  MediaHorizontalItem,
} from './MediaHorizontalList';

const renderMediaHorizontalList = (
  props: Omit<MediaHorizontalListProps, 'title'>,
) => {
  return (
    <ThemeProvider theme={theme}>
      <MediaHorizontalList
        title="TITLE"
        type={props.type}
        dataset={props.dataset}
      />
    </ThemeProvider>
  );
};

describe('Components/Common/MediaHorizontalList', () => {
  const elements = {
    items: (api: RenderAPI) => api.queryAllByTestId('media-list-item'),
    moviesList: (api: RenderAPI) =>
      api.queryByTestId('media-horizontal-list-MOVIE'),
    tvShowsList: (api: RenderAPI) =>
      api.queryByTestId('media-horizontal-list-TV_SHOW'),
  };

  describe('When "type" is "MOVIE"', () => {
    const dataset = Array(randomPositiveNumber(10, 1))
      .fill({})
      .map(
        (_, index) =>
          ({
            __typename: 'CastMovie',
            voteAverage: randomPositiveNumber(10, 1),
            posterPath: '/image.jpg',
            voteCount: randomPositiveNumber(10, 1),
            title: `MOVIE_${index}`,
            id: index,
          } as MediaHorizontalItem),
      );

    it('should render correctly when "has some items"', () => {
      const component = render(
        renderMediaHorizontalList({ type: 'MOVIE', dataset }),
      );
      expect(elements.moviesList(component)).not.toBeNull();
      expect(elements.tvShowsList(component)).toBeNull();
      expect(elements.items(component).length).toEqual(dataset.length);
    });

    it('should render correctly when "has no items"', () => {
      const component = render(
        renderMediaHorizontalList({ type: 'MOVIE', dataset: [] }),
      );
      expect(elements.moviesList(component)).toBeNull();
      expect(elements.tvShowsList(component)).toBeNull();
      expect(elements.items(component).length).toEqual(0);
    });
  });

  describe('When "type" is "TV"', () => {
    const dataset = Array(randomPositiveNumber(10, 1))
      .fill({})
      .map(
        (_, index) =>
          ({
            __typename: 'CastTVShow',
            voteAverage: randomPositiveNumber(10, 1),
            posterPath: '/image.jpg',
            voteCount: randomPositiveNumber(10, 1),
            title: `TV_SHOW_${index}`,
            id: index,
          } as MediaHorizontalItem),
      );

    it('should render correctly when "has some items"', () => {
      const component = render(
        renderMediaHorizontalList({ type: 'TV_SHOW', dataset }),
      );
      expect(elements.moviesList(component)).toBeNull();
      expect(elements.tvShowsList(component)).not.toBeNull();
      expect(elements.items(component).length).toEqual(dataset.length);
    });

    it('should render correctly when "has no items"', () => {
      const component = render(
        renderMediaHorizontalList({ type: 'TV_SHOW', dataset: [] }),
      );
      expect(elements.moviesList(component)).toBeNull();
      expect(elements.tvShowsList(component)).toBeNull();
      expect(elements.items(component).length).toEqual(0);
    });
  });
});
