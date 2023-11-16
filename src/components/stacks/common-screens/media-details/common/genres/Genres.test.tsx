import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { RenderAPI, render } from '@testing-library/react-native';

import { dark as theme } from '@styles/themes';

import { randomPositiveNumber } from '../../../../../../../__mocks__/utils';
import { Genres } from './Genres';

const MEDIA_TYPE = 'MEDIA_TYPE';

const renderGenres = (genres: string[] = []) => (
  <ThemeProvider theme={theme}>
    <Genres mediaType={MEDIA_TYPE} genres={genres} />
  </ThemeProvider>
);

describe('Common-screens/MediaDetails/Genres', () => {
  const elements = {
    mediaTypeText: (api: RenderAPI) => api.getByTestId('genre-media-type-text'),
    mediaTypeItem: (api: RenderAPI) => api.getByTestId('genre-media-type-item'),
    genreItems: (api: RenderAPI) => api.getAllByTestId('genre-item'),
    genreTexts: (api: RenderAPI) => api.getAllByTestId('genre-text'),
  };

  describe('Rendering', () => {
    describe('Media-Type', () => {
      it('should render with the correct styles', () => {
        const component = render(renderGenres());
        expect(
          elements.mediaTypeItem(component).props.style.backgroundColor,
        ).toEqual(theme.colors.contrast);
      });

      it('should render the text correctly', () => {
        const component = render(renderGenres());
        expect(elements.mediaTypeText(component).children[0]).toEqual(
          MEDIA_TYPE,
        );
      });
    });

    describe('Genres', () => {
      it('should render with the correct styles', () => {
        const component = render(renderGenres(['GENRE']));
        expect(
          elements.genreItems(component)[0].props.style.backgroundColor,
        ).toEqual(theme.colors.primary);
      });

      it('should render the texts correctly', () => {
        const genres = Array(randomPositiveNumber(10, 1))
          .fill('')
          .map((_, index) => `GENRE_${index}`);
        const component = render(renderGenres(genres));
        for (let i = 0; i < genres.length; i++) {
          expect(elements.genreTexts(component)[i].children[0]).toEqual(
            genres[i],
          );
        }
      });
    });
  });
});
