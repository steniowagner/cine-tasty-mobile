import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react-native';

import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {ImagesQuality} from './ImagesQuality';
import {qualities} from './useImagesQuality';

const mockChangeQuality = jest.fn();
let mockImageQualitySelected = '';

jest.mock('@src/providers/tmdb-image-qualities/TMDBImageQualities', () => ({
  useTMDBImageQualities: () => ({
    changeQuality: mockChangeQuality,
    imageQualitySelected: mockImageQualitySelected,
  }),
}));

const renderImagesQuality = () => (
  <ThemeProvider theme={theme}>
    <ImagesQuality />
  </ThemeProvider>
);

describe('<ImagesQuality />', () => {
  const elements = {
    optionButtons: (api: RenderAPI) => api.queryAllByTestId('option-settings'),
    optionTitles: (api: RenderAPI) => api.queryAllByTestId('option-title'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering the options', () => {
    it('should render the labels correctly', () => {
      const component = render(renderImagesQuality());
      for (let i = 0; i < qualities.length; i++) {
        expect(elements.optionTitles(component)[i].children[0]).toEqual(
          `${Translations.Tags.SETTINGS_IMAGES_QUALITIES}:${qualities[i]}`,
        );
      }
    });

    describe('should render the selected quality correctly', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
      });

      describe(`When "${qualities[0]}" is the quality selected`, () => {
        it('should render correctly', async () => {
          mockImageQualitySelected = qualities[0];
          const component = render(renderImagesQuality());
          await waitFor(() => {
            expect(elements.optionButtons(component).length).toBeGreaterThan(0);
          });
          const lowOption = elements.optionButtons(component)[0];
          const mediumOption = elements.optionButtons(component)[1];
          const highOption = elements.optionButtons(component)[2];
          const veryHighOption = elements.optionButtons(component)[3];
          expect(
            within(lowOption).queryByTestId('icon-radiobox-marked'),
          ).not.toBeNull();
          expect(
            within(lowOption).queryByTestId('icon-radiobox-blank'),
          ).toBeNull();
          expect(
            within(mediumOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(mediumOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(highOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(highOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(veryHighOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(veryHighOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
        });
      });

      describe(`When "${qualities[1]}" is the quality selected`, () => {
        it('should render correctly', async () => {
          mockImageQualitySelected = qualities[1];
          const component = render(renderImagesQuality());
          await waitFor(() => {
            expect(elements.optionButtons(component).length).toBeGreaterThan(0);
          });
          const lowOption = elements.optionButtons(component)[0];
          const mediumOption = elements.optionButtons(component)[1];
          const highOption = elements.optionButtons(component)[2];
          const veryHighOption = elements.optionButtons(component)[3];
          expect(
            within(lowOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(lowOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(mediumOption).queryByTestId('icon-radiobox-marked'),
          ).not.toBeNull();
          expect(
            within(mediumOption).queryByTestId('icon-radiobox-blank'),
          ).toBeNull();
          expect(
            within(highOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(highOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(veryHighOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(veryHighOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
        });
      });

      describe(`When "${qualities[2]}" is the quality selected`, () => {
        it('should render correctly', async () => {
          mockImageQualitySelected = qualities[2];
          const component = render(renderImagesQuality());
          await waitFor(() => {
            expect(elements.optionButtons(component).length).toBeGreaterThan(0);
          });
          const lowOption = elements.optionButtons(component)[0];
          const mediumOption = elements.optionButtons(component)[1];
          const highOption = elements.optionButtons(component)[2];
          const veryHighOption = elements.optionButtons(component)[3];
          expect(
            within(lowOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(lowOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(mediumOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(mediumOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(highOption).queryByTestId('icon-radiobox-marked'),
          ).not.toBeNull();
          expect(
            within(highOption).queryByTestId('icon-radiobox-blank'),
          ).toBeNull();
          expect(
            within(veryHighOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(veryHighOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
        });
      });

      describe(`When "${qualities[3]}" is the quality selected`, () => {
        it('should render correctly', async () => {
          mockImageQualitySelected = qualities[3];
          const component = render(renderImagesQuality());
          await waitFor(() => {
            expect(elements.optionButtons(component).length).toBeGreaterThan(0);
          });
          const lowOption = elements.optionButtons(component)[0];
          const mediumOption = elements.optionButtons(component)[1];
          const highOption = elements.optionButtons(component)[2];
          const veryHighOption = elements.optionButtons(component)[3];
          expect(
            within(lowOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(lowOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(mediumOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(mediumOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(highOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(highOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(veryHighOption).queryByTestId('icon-radiobox-marked'),
          ).not.toBeNull();
          expect(
            within(veryHighOption).queryByTestId('icon-radiobox-blank'),
          ).toBeNull();
        });
      });
    });
  });

  describe('Pressing the options', () => {
    describe(`When prerssing ${qualities[0]}`, () => {
      const indexOptionSelected = 0;

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "useTMDBImageQualities.changeQuality" correctly', () => {
        const component = render(renderImagesQuality());
        expect(mockChangeQuality).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        expect(mockChangeQuality).toHaveBeenCalledTimes(1);
        expect(mockChangeQuality).toHaveBeenCalledWith(
          qualities[indexOptionSelected],
        );
      });
    });

    describe(`When prerssing ${qualities[1]}`, () => {
      const indexOptionSelected = 1;

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "useTMDBImageQualities.changeQuality" correctly', () => {
        const component = render(renderImagesQuality());
        expect(mockChangeQuality).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        expect(mockChangeQuality).toHaveBeenCalledTimes(1);
        expect(mockChangeQuality).toHaveBeenCalledWith(
          qualities[indexOptionSelected],
        );
      });
    });

    describe(`When prerssing ${qualities[2]}`, () => {
      const indexOptionSelected = 2;

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "useTMDBImageQualities.changeQuality" correctly', () => {
        const component = render(renderImagesQuality());
        expect(mockChangeQuality).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        expect(mockChangeQuality).toHaveBeenCalledTimes(1);
        expect(mockChangeQuality).toHaveBeenCalledWith(
          qualities[indexOptionSelected],
        );
      });
    });

    describe(`When prerssing ${qualities[3]}`, () => {
      const indexOptionSelected = 3;

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "useTMDBImageQualities.changeQuality" correctly', () => {
        const component = render(renderImagesQuality());
        expect(mockChangeQuality).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        expect(mockChangeQuality).toHaveBeenCalledTimes(1);
        expect(mockChangeQuality).toHaveBeenCalledWith(
          qualities[indexOptionSelected],
        );
      });
    });
  });
});
