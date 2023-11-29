import React from 'react';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes';
import { Routes } from '@/navigation';

import { randomPositiveNumber } from '../../../../../../../../../__mocks__/utils';
import { SeasonsSection } from './SeasonsSection';

const NAME = 'SOME_TV_SHOW';
const ID = 1;

const mockTranslation = jest.fn();
const mockNavigate = jest.fn();
const mockGetState = jest.fn();

jest.mock('@hooks', () => ({
  useTranslation: () => mockTranslation(),
}));

jest.mock('@react-navigation/native', () => {
  const actualReactNavigationNative = jest.requireActual(
    '@react-navigation/native',
  );
  return {
    ...actualReactNavigationNative,
    useNavigation: () => ({
      navigate: mockNavigate,
      getState: mockGetState,
    }),
  };
});

const renderSeasonsSection = (
  numberOfSeasons = randomPositiveNumber(10, 1),
) => (
  <ThemeProvider theme={theme}>
    <SeasonsSection
      tvShowName={NAME}
      tvShowId={ID}
      numberOfSeasons={numberOfSeasons}
    />
  </ThemeProvider>
);

describe('Common-screens/TVShowDetails/SeasonsSection', () => {
  const elements = {
    buttons: (component: RenderAPI) =>
      component.getAllByTestId('season-button'),
    titles: (component: RenderAPI) => component.getAllByTestId('season-title'),
  };

  describe('Rendering', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('When the "language-selected" is "pt"', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        mockTranslation.mockReturnValueOnce({
          translate: (key: string) => key,
          currentLanguage: 'pt',
        });
      });

      it('should render the correct "number of seasons"', () => {
        const numberOfSeasons = randomPositiveNumber(10, 1);
        const component = render(renderSeasonsSection(numberOfSeasons));
        expect(elements.buttons(component).length).toEqual(numberOfSeasons);
      });

      it('should render the "items-title" correctly', () => {
        const component = render(renderSeasonsSection());
        for (let i = 0; i < elements.titles(component).length; i++) {
          expect(elements.titles(component)[i].children[0]).toEqual(
            `T${i + 1}`,
          );
        }
      });
    });

    describe('When the "language-selected" is "es"', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        mockTranslation.mockReturnValueOnce({
          translate: (key: string) => key,
          currentLanguage: 'es',
        });
      });

      it('should render the correct "number of seasons"', () => {
        const numberOfSeasons = randomPositiveNumber(10, 1);
        const component = render(renderSeasonsSection(numberOfSeasons));
        expect(elements.buttons(component).length).toEqual(numberOfSeasons);
      });

      it('should render the "items-title" correctly', () => {
        const component = render(renderSeasonsSection());
        for (let i = 0; i < elements.titles(component).length; i++) {
          expect(elements.titles(component)[i].children[0]).toEqual(
            `T${i + 1}`,
          );
        }
      });
    });

    describe('When the "language-selected" is "en"', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        mockTranslation.mockReturnValueOnce({
          translate: (key: string) => key,
          currentLanguage: 'en',
        });
      });

      it('should render the correct "number of seasons"', () => {
        const numberOfSeasons = randomPositiveNumber(10, 1);
        const component = render(renderSeasonsSection(numberOfSeasons));
        expect(elements.buttons(component).length).toEqual(numberOfSeasons);
      });

      it('should render the "items-title" correctly', () => {
        const component = render(renderSeasonsSection());
        for (let i = 0; i < elements.titles(component).length; i++) {
          expect(elements.titles(component)[i].children[0]).toEqual(
            `S${i + 1}`,
          );
        }
      });
    });
  });

  describe('Pressing the items', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockTranslation.mockReturnValueOnce({
        translate: (key: string) => key,
        currentLanguage: 'pt',
      });
    });

    describe('When the "current-stack" is "Home"', () => {
      it('should call "navigate" correctly', () => {
        mockGetState.mockReturnValue({
          routes: [
            {
              name: Routes.Home.TV_SHOW_DETAILS,
            },
          ],
        });
        const numberOfSeasons = randomPositiveNumber(10, 1);
        const indexSeasonSelected = randomPositiveNumber(
          numberOfSeasons - 1,
          0,
        );
        const component = render(renderSeasonsSection(numberOfSeasons));
        expect(mockNavigate).toBeCalledTimes(0);
        fireEvent.press(elements.buttons(component)[indexSeasonSelected]);
        expect(mockNavigate).toBeCalledTimes(1);
        expect(mockNavigate).toBeCalledWith(Routes.Home.TV_SHOW_SEASON, {
          id: ID,
          name: NAME,
          season: indexSeasonSelected + 1,
        });
      });
    });

    describe('When the "current-stack" is "Famous"', () => {
      it('should call "navigate" correctly', () => {
        mockGetState.mockReturnValue({
          routes: [
            {
              name: Routes.Famous.TV_SHOW_DETAILS,
            },
          ],
        });
        const numberOfSeasons = randomPositiveNumber(10, 1);
        const indexSeasonSelected = randomPositiveNumber(
          numberOfSeasons - 1,
          0,
        );
        const component = render(renderSeasonsSection(numberOfSeasons));
        expect(mockNavigate).toBeCalledTimes(0);
        fireEvent.press(elements.buttons(component)[indexSeasonSelected]);
        expect(mockNavigate).toBeCalledTimes(1);
        expect(mockNavigate).toBeCalledWith(Routes.Famous.TV_SHOW_SEASON, {
          id: ID,
          name: NAME,
          season: indexSeasonSelected + 1,
        });
      });
    });
  });
});
