jest.unmock('react-native-reanimated');
import React from 'react';
import {
  fireEvent,
  cleanup,
  render,
  act,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';
import {dark as theme} from '@styles/themes/dark';
import {randomPositiveNumber} from '@mocks/utils';
import {Translations} from '@i18n/tags';

import {MediaSwitcher} from './MediaSwitcher';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const labels = [Translations.Tags.HOME_MOVIES, Translations.Tags.HOME_TV_SHOWS];
const switchersWidth = [
  randomPositiveNumber(100, 1),
  randomPositiveNumber(100, 1),
];

type RenderMediaSwitcherProps = {
  onCalcuateSwitchWidth: jest.Mock;
  onPresSwitchTVShows: jest.Mock;
  onPressSwitchMovies: jest.Mock;
  isDisabled: boolean;
};

const triggerOnLayoutTextComponent = (
  textComponent: any,
  indexSwitcherWidth: number,
) => {
  fireEvent(textComponent, 'onLayout', {
    nativeEvent: {
      layout: {
        width: switchersWidth[indexSwitcherWidth],
      },
    },
  });
};

const renderMediaSwitcher = (props: Partial<RenderMediaSwitcherProps>) => (
  <ThemeProvider theme={theme}>
    <MediaSwitcher
      onCalcuateSwitchWidth={props.onCalcuateSwitchWidth || jest.fn()}
      onPresSwitchTVShows={props.onPresSwitchTVShows || jest.fn()}
      onPressSwitchMovies={props.onPressSwitchMovies || jest.fn()}
      isDisabled={props.isDisabled}
    />
  </ThemeProvider>
);

describe('<MediaSwitcher />', () => {
  const elements = {
    indicator: (api: RenderAPI) => api.getByTestId('switcher-indicator'),
    wrapper: (api: RenderAPI) => api.getByTestId('media-switcher-wrapper'),
    moviesButton: (api: RenderAPI) => api.getByTestId(`${labels[0]}-button`),
    moviesText: (api: RenderAPI) => api.getByTestId(`${labels[0]}-text`),
    tvShowsButton: (api: RenderAPI) => api.getByTestId(`${labels[1]}-button`),
    tvShowsText: (api: RenderAPI) => api.getByTestId(`${labels[1]}-text`),
  };

  describe('Rendering the Switchers', () => {
    describe("When it's measuring the switchers-width", () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render components correctly', () => {
        const component = render(renderMediaSwitcher({}));
        expect(elements.wrapper(component)).not.toBeNull();
        expect(elements.indicator(component)).not.toBeNull();
        expect(elements.moviesButton(component)).not.toBeNull();
        expect(elements.moviesText(component)).not.toBeNull();
        expect(elements.tvShowsButton(component)).not.toBeNull();
        expect(elements.tvShowsText(component)).not.toBeNull();
      });

      it('should not call the "onCalcuateSwitchWidth"', () => {
        const onCalcuateSwitchWidth = jest.fn();
        render(renderMediaSwitcher({onCalcuateSwitchWidth}));
        expect(onCalcuateSwitchWidth).not.toHaveBeenCalled();
      });

      it('should render the switcher-labels correctly', () => {
        const component = render(renderMediaSwitcher({}));
        expect(elements.moviesText(component).children[0]).toEqual(labels[0]);
        expect(elements.tvShowsText(component).children[0]).toEqual(labels[1]);
      });

      it('should render the "wrapper" with the correct "width"', async () => {
        const component = render(renderMediaSwitcher({}));
        expect(elements.wrapper(component).props.style[0].width).toEqual(
          theme.metrics.width * 2,
        );
      });

      it('should render the "indicator" with the correct "opacity"', async () => {
        const component = render(renderMediaSwitcher({}));
        expect(elements.indicator(component).props.style[1].opacity).toEqual(0);
      });

      it('should render the "swicthers" with the correct width', () => {
        const component = render(renderMediaSwitcher({}));
        expect(elements.moviesButton(component).props.style.width).toEqual(
          theme.metrics.width,
        );
        expect(elements.tvShowsButton(component).props.style.width).toEqual(
          theme.metrics.width,
        );
      });
    });

    describe('When only the "Movies" switch were measured', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render components correctly', () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        expect(elements.wrapper(component)).not.toBeNull();
        expect(elements.indicator(component)).not.toBeNull();
        expect(elements.moviesButton(component)).not.toBeNull();
        expect(elements.moviesText(component)).not.toBeNull();
        expect(elements.tvShowsButton(component)).not.toBeNull();
        expect(elements.tvShowsText(component)).not.toBeNull();
      });

      it('should not call the "onCalcuateSwitchWidth"', () => {
        const onCalcuateSwitchWidth = jest.fn();
        const component = render(renderMediaSwitcher({onCalcuateSwitchWidth}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        expect(onCalcuateSwitchWidth).not.toHaveBeenCalled();
      });

      it('should render the switcher-labels correctly', () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        expect(elements.moviesText(component).children[0]).toEqual(labels[0]);
        expect(elements.tvShowsText(component).children[0]).toEqual(labels[1]);
      });

      it('should render the "wrapper" with the correct "width"', async () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        expect(elements.wrapper(component).props.style[0].width).toEqual(
          theme.metrics.width * 2,
        );
      });

      it('should render the "indicator" with the correct "opacity"', async () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.indicator(component).props.style[1].opacity).toEqual(0);
      });

      it('should render the "swicthers" with the correct width', () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        expect(elements.moviesButton(component).props.style.width).toEqual(
          theme.metrics.width,
        );
        expect(elements.tvShowsButton(component).props.style.width).toEqual(
          theme.metrics.width,
        );
      });
    });

    describe('When only the "TV-Shows" switch were measured', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render components correctly', () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        expect(elements.wrapper(component)).not.toBeNull();
        expect(elements.indicator(component)).not.toBeNull();
        expect(elements.moviesButton(component)).not.toBeNull();
        expect(elements.moviesText(component)).not.toBeNull();
        expect(elements.tvShowsButton(component)).not.toBeNull();
        expect(elements.tvShowsText(component)).not.toBeNull();
      });

      it('should render the switcher-labels correctly', () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 1);
        expect(elements.moviesText(component).children[0]).toEqual(labels[0]);
        expect(elements.tvShowsText(component).children[0]).toEqual(labels[1]);
      });

      it('should render the "wrapper" with the correct "width"', async () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 1);
        expect(elements.wrapper(component).props.style[0].width).toEqual(
          theme.metrics.width * 2,
        );
      });

      it('should render the "indicator" with the correct "opacity"', async () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 1);
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.indicator(component).props.style[1].opacity).toEqual(0);
      });

      it('should render the "swicthers" with the correct width', () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 1);
        expect(elements.moviesButton(component).props.style.width).toEqual(
          theme.metrics.width,
        );
        expect(elements.tvShowsButton(component).props.style.width).toEqual(
          theme.metrics.width,
        );
      });
    });

    describe('When both switchers were measured', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render components correctly', async () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        triggerOnLayoutTextComponent(elements.tvShowsText(component), 1);
        await waitFor(() => {
          expect(elements.wrapper(component)).not.toBeNull();
          expect(elements.indicator(component)).not.toBeNull();
          expect(elements.moviesButton(component)).not.toBeNull();
          expect(elements.moviesText(component)).not.toBeNull();
          expect(elements.tvShowsButton(component)).not.toBeNull();
          expect(elements.tvShowsText(component)).not.toBeNull();
        });
      });

      it('should call the "onCalcuateSwitchWidth"', () => {
        const onCalcuateSwitchWidth = jest.fn();
        const component = render(renderMediaSwitcher({onCalcuateSwitchWidth}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        triggerOnLayoutTextComponent(elements.tvShowsText(component), 1);
        expect(onCalcuateSwitchWidth).toHaveBeenCalledTimes(1);
      });

      it('should render the switcher-labels correctly', () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        triggerOnLayoutTextComponent(elements.tvShowsText(component), 1);
        expect(elements.moviesText(component).children[0]).toEqual(labels[0]);
        expect(elements.tvShowsText(component).children[0]).toEqual(labels[1]);
      });

      it('should render the "wrapper" with the correct "width"', async () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        triggerOnLayoutTextComponent(elements.tvShowsText(component), 1);
        await waitFor(() => {
          expect(elements.wrapper(component).props.style[0].width).toEqual(
            Math.max(switchersWidth[0], switchersWidth[1]) * 2,
          );
        });
      });

      it('should render the "indicator" with the correct "opacity"', async () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        triggerOnLayoutTextComponent(elements.tvShowsText(component), 1);
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.indicator(component).props.style[1].opacity).toEqual(
            1,
          );
        });
      });

      it('should render the "swicthers" with the correct width', async () => {
        const component = render(renderMediaSwitcher({}));
        triggerOnLayoutTextComponent(elements.moviesText(component), 0);
        triggerOnLayoutTextComponent(elements.tvShowsText(component), 1);
        await waitFor(() => {
          expect(elements.moviesButton(component).props.style.width).toEqual(
            Math.max(switchersWidth[0], switchersWidth[1]),
          );
          expect(elements.tvShowsButton(component).props.style.width).toEqual(
            Math.max(switchersWidth[0], switchersWidth[1]),
          );
        });
      });
    });
  });

  describe('Pressing the Switchers', () => {
    describe('When press the "Movies" switcher', () => {
      describe('When "isDisabled" is "true"', () => {
        it('should not call "onPressSwitchMovies"', () => {
          const onPressSwitchMovies = jest.fn();
          const component = render(
            renderMediaSwitcher({onPressSwitchMovies, isDisabled: true}),
          );
          fireEvent.press(elements.moviesButton(component));
          expect(onPressSwitchMovies).not.toHaveBeenCalled();
        });
      });

      describe('When "isDisabled" is "false"', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should not call "onPressSwitchMovies" when the selected option is "Movies"', () => {
          const onPressSwitchMovies = jest.fn();
          const component = render(
            renderMediaSwitcher({onPressSwitchMovies, isDisabled: false}),
          );
          fireEvent.press(elements.moviesButton(component));
          act(() => {
            jest.runAllTimers();
          });
          expect(onPressSwitchMovies).toBeCalledTimes(0);
        });

        it('should call "onPressSwitchMovies" when the user selected the "Movies" option', () => {
          const onPressSwitchMovies = jest.fn();
          const component = render(
            renderMediaSwitcher({onPressSwitchMovies, isDisabled: false}),
          );
          fireEvent.press(elements.tvShowsButton(component));
          act(() => {
            jest.runAllTimers();
          });
          fireEvent.press(elements.moviesButton(component));
          act(() => {
            jest.runAllTimers();
          });
          expect(onPressSwitchMovies).toBeCalledTimes(1);
        });
      });
    });

    describe('When press the "TV-Shows" switcher', () => {
      describe('When "isDisabled" is "true"', () => {
        it('should not call "onPresSwitchTVShows"', () => {
          const onPresSwitchTVShows = jest.fn();
          const component = render(
            renderMediaSwitcher({onPresSwitchTVShows, isDisabled: true}),
          );
          fireEvent.press(elements.moviesButton(component));
          expect(onPresSwitchTVShows).not.toHaveBeenCalled();
        });
      });

      describe('When "isDisabled" is "false"', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should not call "onPresSwitchTVShows" when the selected option is "Movies"', () => {
          const onPresSwitchTVShows = jest.fn();
          const component = render(
            renderMediaSwitcher({onPresSwitchTVShows, isDisabled: false}),
          );
          fireEvent.press(elements.moviesButton(component));
          act(() => {
            jest.runAllTimers();
          });
          expect(onPresSwitchTVShows).toBeCalledTimes(0);
        });

        it('should call "onPresSwitchTVShows" when the user selected the "Movies" option', () => {
          const onPresSwitchTVShows = jest.fn();
          const component = render(
            renderMediaSwitcher({onPresSwitchTVShows, isDisabled: false}),
          );
          fireEvent.press(elements.tvShowsButton(component));
          act(() => {
            jest.runAllTimers();
          });
          fireEvent.press(elements.moviesButton(component));
          act(() => {
            jest.runAllTimers();
          });
          expect(onPresSwitchTVShows).toBeCalledTimes(1);
        });
      });
    });
  });
});
