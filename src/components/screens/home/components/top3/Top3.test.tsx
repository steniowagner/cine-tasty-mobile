import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';
import * as Types from '@local-types';
import {Translations} from '@i18n/tags';

import * as Styles from './Top3.styles';
import {Top3Props, Top3} from './Top3';

type Typename = 'BaseTVShow' | 'BaseMovie';

const TOP3_LENGTH = 3;

const makeTop3Items = (typename: Typename, onPress = jest.fn()) =>
  Array(TOP3_LENGTH)
    .fill({})
    .map((_, index: number) => ({
      __typename: typename,
      voteAverage: index,
      title: `TITLE_${index}`,
      posterPath: `POSTER_PATH_${index}`,
      voteCount: index,
      genreIds: Array(randomPositiveNumber(5, 0))
        .fill('')
        .map((__, _index: number) => `GENRE_${_index}`),
      id: index,
      onPress,
    })) as Types.HomeTop3Item[];

const renderTop3 = (props: Top3Props) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <Top3 {...props} />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<Top3 />', () => {
  const elements = {
    list: (api: RenderAPI) => api.getByTestId('top3-list'),
    items: (api: RenderAPI) => api.getAllByTestId('top3-wrapper'),
    titles: (api: RenderAPI) => api.getAllByTestId('top3-title'),
    genres: (api: RenderAPI) => api.getAllByTestId('top3-genres'),
    learnMoreButtons: (api: RenderAPI) => api.getAllByTestId('rounded-button'),
    learnMoreButtonTexts: (api: RenderAPI) =>
      api.getAllByTestId('rounded-button-text'),
  };

  describe('When the "media-type" is "Movies"', () => {
    describe('UI', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should render all the items correctly', async () => {
        const items = makeTop3Items('BaseMovie');
        const component = render(renderTop3({items}));
        expect(elements.list(component)).not.toBeNull();
        expect(elements.items(component).length).toEqual(TOP3_LENGTH);
        expect(elements.titles(component).length).toEqual(TOP3_LENGTH);
        expect(elements.genres(component).length).toEqual(TOP3_LENGTH);
        expect(elements.learnMoreButtons(component).length).toEqual(
          TOP3_LENGTH,
        );
        expect(elements.learnMoreButtonTexts(component).length).toEqual(
          TOP3_LENGTH,
        );
        await waitFor(() => {});
      });

      it('should render the items on the correct sequence', async () => {
        const items = makeTop3Items('BaseMovie');
        const component = render(renderTop3({items}));
        for (let i = 0; i < TOP3_LENGTH; i++) {
          expect(elements.titles(component)[i].children[0]).toEqual(
            items[i].title,
          );
          expect(elements.genres(component)[i].children[0]).toEqual(
            items[i].genreIds.join('  \u2022  '),
          );
          expect(
            elements.learnMoreButtonTexts(component)[i].children[0],
          ).toEqual(Translations.Tags.HOME_LEARN_MORE);
        }
        await waitFor(() => {});
      });

      it('should render the list on the correct position by default', async () => {
        const items = makeTop3Items('BaseMovie');
        const component = render(renderTop3({items}));
        expect(elements.list(component).props.contentOffset).toEqual({
          x: Styles.INITIAL_SCROLL_POSITION,
          y: 0,
        });
        await waitFor(() => {});
      });
    });

    describe('Pressing the "LEARN M0RE" button', () => {
      it('should call "onPress" when the user press the "LEARN MORE" button', async () => {
        const onPress = jest.fn();
        const items = makeTop3Items('BaseMovie', onPress);
        const component = render(renderTop3({items}));
        const itemSelected = randomPositiveNumber(2, 0);
        expect(onPress).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.learnMoreButtons(component)[itemSelected]);
        expect(onPress).toHaveBeenCalledTimes(1);
        await waitFor(() => {});
      });
    });
  });

  describe('When the "media-type" is "TV Shows"', () => {
    describe('UI', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should render all the items correctly', async () => {
        const items = makeTop3Items('BaseTVShow');
        const component = render(renderTop3({items}));
        expect(elements.list(component)).not.toBeNull();
        expect(elements.items(component).length).toEqual(TOP3_LENGTH);
        expect(elements.titles(component).length).toEqual(TOP3_LENGTH);
        expect(elements.genres(component).length).toEqual(TOP3_LENGTH);
        expect(elements.learnMoreButtons(component).length).toEqual(
          TOP3_LENGTH,
        );
        expect(elements.learnMoreButtonTexts(component).length).toEqual(
          TOP3_LENGTH,
        );
        await waitFor(() => {});
      });

      it('should render the items on the correct sequence', async () => {
        const items = makeTop3Items('BaseTVShow');
        const component = render(renderTop3({items}));
        for (let i = 0; i < TOP3_LENGTH; i++) {
          expect(elements.titles(component)[i].children[0]).toEqual(
            items[i].title,
          );
          expect(elements.genres(component)[i].children[0]).toEqual(
            items[i].genreIds.join('  \u2022  '),
          );
          expect(
            elements.learnMoreButtonTexts(component)[i].children[0],
          ).toEqual(Translations.Tags.HOME_LEARN_MORE);
        }
        await waitFor(() => {});
      });

      it('should render the list on the correct position by default', async () => {
        const items = makeTop3Items('BaseTVShow');
        const component = render(renderTop3({items}));
        expect(elements.list(component).props.contentOffset).toEqual({
          x: Styles.INITIAL_SCROLL_POSITION,
          y: 0,
        });
        await waitFor(() => {});
      });
    });

    describe('Pressing the "LEARN M0RE" button', () => {
      it('should call "onPress" when the user press the "LEARN MORE" button', async () => {
        const onPress = jest.fn();
        const items = makeTop3Items('BaseTVShow', onPress);
        const component = render(renderTop3({items}));
        const itemSelected = randomPositiveNumber(2, 0);
        expect(onPress).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.learnMoreButtons(component)[itemSelected]);
        expect(onPress).toHaveBeenCalledTimes(1);
        await waitFor(() => {});
      });
    });
  });
});
