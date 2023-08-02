import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  act,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {DEFAULT_NUMBER_OF_LINES} from './useMediaItemDescription';
import {MediaItemDescription} from './MediaItemDescription';

const DESCRIPTION = 'SOME_DESCRIPTION';

const renderMediaItemDescription = () => (
  <ThemeProvider theme={theme}>
    <MediaItemDescription description={DESCRIPTION} />
  </ThemeProvider>
);

describe('<MediaItemDescription />', () => {
  const elements = {
    descriptionText: (api: RenderAPI) => api.queryByTestId('description-text'),
    expandableReadButton: (api: RenderAPI) =>
      api.queryByTestId('expandable-read-button'),
    expandableReadText: (api: RenderAPI) =>
      api.queryByTestId('expandable-read-text'),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  describe('Render correctly', () => {
    it('should render correctly when the text is greater than the value stored on DEFAULT_NUMBER_OF_LINES', () => {
      const component = render(renderMediaItemDescription());
      const textEvent = {
        nativeEvent: {
          lines: {
            length: DEFAULT_NUMBER_OF_LINES + 1,
          },
        },
      };
      fireEvent(elements.descriptionText(component), 'onTextLayout', textEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.expandableReadButton(component)).not.toBeNull();
      expect(elements.descriptionText(component).props.numberOfLines).toEqual(
        DEFAULT_NUMBER_OF_LINES,
      );
      expect(elements.expandableReadText(component).children[0]).toEqual(
        Translations.Tags.READ_MORE,
      );
    });

    it('should render correctly when the text is less than the value stored on DEFAULT_NUMBER_OF_LINES', () => {
      const component = render(renderMediaItemDescription());
      const textEvent = {
        nativeEvent: {
          lines: {
            length: DEFAULT_NUMBER_OF_LINES - 1,
          },
        },
      };
      fireEvent(elements.descriptionText(component), 'onTextLayout', textEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.descriptionText(component).props.numberOfLines).toEqual(
        DEFAULT_NUMBER_OF_LINES - 1,
      );
      expect(elements.expandableReadButton(component)).toBeNull();
      expect(elements.expandableReadText(component)).toBeNull();
    });

    it('should render correctly when the text is equal to the value stored on DEFAULT_NUMBER_OF_LINES', () => {
      const component = render(renderMediaItemDescription());
      const textEvent = {
        nativeEvent: {
          lines: {
            length: DEFAULT_NUMBER_OF_LINES,
          },
        },
      };
      fireEvent(elements.descriptionText(component), 'onTextLayout', textEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.descriptionText(component).props.numberOfLines).toEqual(
        DEFAULT_NUMBER_OF_LINES,
      );
      expect(elements.expandableReadButton(component)).toBeNull();
      expect(elements.expandableReadText(component)).toBeNull();
    });

    it('should a the "-" when description is undefined', () => {
      const renderMediaItemWithoutDescription = () => (
        <ThemeProvider theme={theme}>
          {/*@ts-ignore*/}
          <MediaItemDescription />
        </ThemeProvider>
      );
      const component = render(renderMediaItemWithoutDescription());
      expect(elements.descriptionText(component).children[0]).toEqual('-');
    });

    it('should a the "-" when description is an empty string', () => {
      const renderMediaItemWithoutDescription = () => (
        <ThemeProvider theme={theme}>
          <MediaItemDescription description="" />
        </ThemeProvider>
      );
      const component = render(renderMediaItemWithoutDescription());
      expect(elements.descriptionText(component).children[0]).toEqual('-');
    });
  });

  describe('Press the Read More/Less button', () => {
    it('should show correctly when the user presses the "READ-MORE" button', () => {
      const INCREASED_NUMBER_OF_LINES =
        DEFAULT_NUMBER_OF_LINES + randomPositiveNumber(10, 1);
      const component = render(renderMediaItemDescription());
      const textEvent = {
        nativeEvent: {
          lines: {
            length: INCREASED_NUMBER_OF_LINES,
          },
        },
      };
      fireEvent(elements.descriptionText(component), 'onTextLayout', textEvent);
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.descriptionText(component).props.numberOfLines).toEqual(
        DEFAULT_NUMBER_OF_LINES,
      );
      expect(elements.expandableReadText(component).children[0]).toEqual(
        Translations.Tags.READ_MORE,
      );
      fireEvent.press(elements.expandableReadButton(component));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.descriptionText(component).props.numberOfLines).toEqual(
        INCREASED_NUMBER_OF_LINES,
      );
      expect(elements.expandableReadText(component).children[0]).toEqual(
        Translations.Tags.READ_LESS,
      );
    });

    it('should show correctly when the user press the "READ-LESS" button', () => {
      const INCREASED_NUMBER_OF_LINES =
        DEFAULT_NUMBER_OF_LINES + randomPositiveNumber(10, 1);
      const component = render(renderMediaItemDescription());
      const textEvent = {
        nativeEvent: {
          lines: {
            length: INCREASED_NUMBER_OF_LINES,
          },
        },
      };
      fireEvent(elements.descriptionText(component), 'onTextLayout', textEvent);
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.press(elements.expandableReadButton(component));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.descriptionText(component).props.numberOfLines).toEqual(
        INCREASED_NUMBER_OF_LINES,
      );
      expect(elements.expandableReadText(component).children[0]).toEqual(
        Translations.Tags.READ_LESS,
      );
      fireEvent.press(elements.expandableReadButton(component));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.descriptionText(component).props.numberOfLines).toEqual(
        DEFAULT_NUMBER_OF_LINES,
      );
      expect(elements.expandableReadText(component).children[0]).toEqual(
        Translations.Tags.READ_MORE,
      );
    });
  });
});
