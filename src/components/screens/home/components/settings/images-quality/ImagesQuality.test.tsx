import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import RNRestart from 'react-native-restart';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react-native';

import {dark as theme} from '@styles/themes/dark';
import {storage, CONSTANTS} from '@utils';

import {ImagesQuality} from './ImagesQuality';
import {qualities} from './useImagesQuality';
import {Translations} from '@i18n/tags';

const mockRestart = jest.fn().mockImplementation();

jest.mock('react-native-restart');

// @ts-ignore
RNRestart.Restart = mockRestart;

jest.mock('@utils', () => {
  const utilsModule = jest.requireActual('@utils');
  return {
    ...utilsModule,
    storage: {
      set: jest.fn().mockResolvedValue(''),
      get: jest.fn().mockResolvedValue(''),
    },
  };
});

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

  it('should call the "storage.get" correctly when get the last "quality-image" selected from the storage', () => {
    render(renderImagesQuality());
    expect(storage.get).toHaveBeenCalledTimes(1);
    expect(storage.get).toHaveBeenCalledWith(
      CONSTANTS.KEYS.IMAGES_QUALITY,
      undefined,
    );
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

      describe('When the quality selected is unknown', () => {
        it('should render correctly', async () => {
          (storage.get as jest.Mock).mockResolvedValue(undefined);
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
          ).toBeNull();
          expect(
            within(veryHighOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
        });
      });

      describe(`When "${qualities[0]}" is the quality selected`, () => {
        it('should render correctly', async () => {
          (storage.get as jest.Mock).mockResolvedValue(qualities[0]);
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
          (storage.get as jest.Mock).mockResolvedValue(qualities[1]);
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
          (storage.get as jest.Mock).mockResolvedValue(qualities[2]);
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
          (storage.get as jest.Mock).mockResolvedValue(qualities[3]);
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

      it('should call "storage.set" correctly', () => {
        const component = render(renderImagesQuality());
        expect(storage.set).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        expect(storage.set).toHaveBeenCalledTimes(1);
        expect(storage.set).toHaveBeenCalledWith(
          CONSTANTS.KEYS.IMAGES_QUALITY,
          qualities[indexOptionSelected],
        );
      });

      it('should call "RNRestart.Restart" correctly', async () => {
        const component = render(renderImagesQuality());
        expect(mockRestart).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        await waitFor(() => {
          expect(mockRestart).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe(`When prerssing ${qualities[1]}`, () => {
      const indexOptionSelected = 1;

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "storage.set" correctly', () => {
        const component = render(renderImagesQuality());
        expect(storage.set).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        expect(storage.set).toHaveBeenCalledTimes(1);
        expect(storage.set).toHaveBeenCalledWith(
          CONSTANTS.KEYS.IMAGES_QUALITY,
          qualities[indexOptionSelected],
        );
      });

      it('should call "RNRestart.Restart" correctly', async () => {
        const component = render(renderImagesQuality());
        expect(mockRestart).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        await waitFor(() => {
          expect(mockRestart).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe(`When prerssing ${qualities[2]}`, () => {
      const indexOptionSelected = 2;

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "storage.set" correctly', () => {
        const component = render(renderImagesQuality());
        expect(storage.set).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        expect(storage.set).toHaveBeenCalledTimes(1);
        expect(storage.set).toHaveBeenCalledWith(
          CONSTANTS.KEYS.IMAGES_QUALITY,
          qualities[indexOptionSelected],
        );
      });

      it('should call "RNRestart.Restart" correctly', async () => {
        const component = render(renderImagesQuality());
        expect(mockRestart).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        await waitFor(() => {
          expect(mockRestart).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe(`When prerssing ${qualities[3]}`, () => {
      const indexOptionSelected = 3;

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "storage.set" correctly', () => {
        const component = render(renderImagesQuality());
        expect(storage.set).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        expect(storage.set).toHaveBeenCalledTimes(1);
        expect(storage.set).toHaveBeenCalledWith(
          CONSTANTS.KEYS.IMAGES_QUALITY,
          qualities[indexOptionSelected],
        );
      });

      it('should call "RNRestart.Restart" correctly', async () => {
        const component = render(renderImagesQuality());
        expect(mockRestart).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        await waitFor(() => {
          expect(mockRestart).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
