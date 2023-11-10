import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

import { dark as theme } from '@styles/themes';

import { DEFAULT_NUMBER_OF_LINES } from './use-media-item-description';
import { MediaItemDescription } from './MediaItemDescription';
import { Translations } from '@/i18n/tags';
import { randomPositiveNumber } from '../../../../__mocks__/utils';

const renderMediaItemDescription = (description = 'SOME_DESCRIPTION') => (
  <ThemeProvider theme={theme}>
    <MediaItemDescription description={description} />
  </ThemeProvider>
);

describe('Components/Common/MediaItemDescription', () => {
  const elements = {
    descriptionText: (api: RenderAPI) => api.getByTestId('description-text'),
    expandableReadButton: (api: RenderAPI) =>
      api.queryByTestId('expandable-read-button'),
    expandableReadText: (api: RenderAPI) =>
      api.queryByTestId('expandable-read-text'),
  };

  describe('Rendering', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it(`should render correctly when the "text-length is greater than" "${DEFAULT_NUMBER_OF_LINES}"`, () => {
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
      expect(elements.expandableReadText(component)!.children[0]).toEqual(
        Translations.Miscellaneous.READ_MORE,
      );
    });

    it(`should render correctly when the "text-length is less than" "${DEFAULT_NUMBER_OF_LINES}"`, () => {
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

    it(`should render correctly when the "text is equal to" "${DEFAULT_NUMBER_OF_LINES}"`, () => {
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

    it('should a the "-" when description is an empty string', () => {
      const component = render(renderMediaItemDescription(''));
      expect(elements.descriptionText(component).children[0]).toEqual('-');
    });
  });

  describe('Pressing the Read More/Less', () => {
    describe('When the text is colapsed', () => {
      const numberOfLines =
        DEFAULT_NUMBER_OF_LINES + randomPositiveNumber(10, 1);
      const textEvent = {
        nativeEvent: {
          lines: {
            length: numberOfLines,
          },
        },
      };

      it('should change the "cta-title" from "READ-MORE" to "READ-LESS" when "pressing the cta"', () => {
        const component = render(renderMediaItemDescription());
        fireEvent(
          elements.descriptionText(component),
          'onTextLayout',
          textEvent,
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.expandableReadText(component)!.children[0]).toEqual(
          Translations.Miscellaneous.READ_MORE,
        );
        fireEvent.press(elements.expandableReadButton(component)!);
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.expandableReadText(component)!.children[0]).toEqual(
          Translations.Miscellaneous.READ_LESS,
        );
      });

      it('should uncolapse the text correctly', () => {
        const component = render(renderMediaItemDescription());
        fireEvent(
          elements.descriptionText(component),
          'onTextLayout',
          textEvent,
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.descriptionText(component).props.numberOfLines).toEqual(
          DEFAULT_NUMBER_OF_LINES,
        );
        fireEvent.press(elements.expandableReadButton(component)!);
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.descriptionText(component).props.numberOfLines).toEqual(
          numberOfLines,
        );
        expect(elements.expandableReadText(component)!.children[0]).toEqual(
          Translations.Miscellaneous.READ_LESS,
        );
      });
    });

    describe('When the text is not colapsed', () => {
      const numberOfLines =
        DEFAULT_NUMBER_OF_LINES + randomPositiveNumber(10, 1);
      const textEvent = {
        nativeEvent: {
          lines: {
            length: numberOfLines,
          },
        },
      };

      it('should change the "cta-title" from "READ-LESS" to "READ-MORE" when "pressing the cta"', () => {
        const component = render(renderMediaItemDescription());
        fireEvent(
          elements.descriptionText(component),
          'onTextLayout',
          textEvent,
        );
        act(() => {
          jest.runAllTimers();
        });
        fireEvent.press(elements.expandableReadButton(component)!);
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.expandableReadText(component)!.children[0]).toEqual(
          Translations.Miscellaneous.READ_LESS,
        );
        fireEvent.press(elements.expandableReadButton(component)!);
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.expandableReadText(component)!.children[0]).toEqual(
          Translations.Miscellaneous.READ_MORE,
        );
      });

      it('should colapse the text correctly', () => {
        const component = render(renderMediaItemDescription());
        fireEvent(
          elements.descriptionText(component),
          'onTextLayout',
          textEvent,
        );
        act(() => {
          jest.runAllTimers();
        });
        fireEvent.press(elements.expandableReadButton(component)!);
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.descriptionText(component).props.numberOfLines).toEqual(
          numberOfLines,
        );
        fireEvent.press(elements.expandableReadButton(component)!);
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.descriptionText(component).props.numberOfLines).toEqual(
          DEFAULT_NUMBER_OF_LINES,
        );
      });
    });
  });
});
