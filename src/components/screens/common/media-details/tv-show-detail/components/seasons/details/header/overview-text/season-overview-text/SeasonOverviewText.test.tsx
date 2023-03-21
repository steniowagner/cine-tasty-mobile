import React from 'react';
import {
  fireEvent,
  cleanup,
  render,
  act,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {MAX_NUMBER_LINES} from './useSeasonOverviewText';
import {SeasonOverviewText} from './SeasonOverviewText';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...actualNavigation,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const renderSeasonOverviewText = (overview?: string) => (
  <ThemeProvider theme={theme}>
    <SeasonOverviewText overview={overview} season={1} />
  </ThemeProvider>
);

describe('<SeasonOverviewText />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  const elements = {
    overviewText: (api: RenderAPI) => api.queryByTestId('overview-text'),
    readMoreButton: (api: RenderAPI) => api.queryByTestId('read-more-button'),
    readMoreText: (api: RenderAPI) => api.queryByTestId('read-more-text'),
  };

  describe('When the "overview" is provided', () => {
    it('should render correctly when some overview is provided and it has less lines than the max', () => {
      const OVERVIEW_TEXT = 'some overview';
      const components = render(renderSeasonOverviewText(OVERVIEW_TEXT));
      const textEvent = {
        nativeEvent: {
          lines: {
            length: MAX_NUMBER_LINES - 1,
          },
        },
      };
      act(() => {
        jest.runAllTimers();
      });
      fireEvent(elements.overviewText(components), 'onTextLayout', textEvent);
      expect(elements.overviewText(components)).not.toBeNull();
      expect(elements.overviewText(components).children[0]).toEqual(
        OVERVIEW_TEXT,
      );
      expect(elements.readMoreButton(components)).toBeNull();
    });

    it('should render correctly when some overview is provided and it has more lines than the max', () => {
      const OVERVIEW_TEXT = 'some overview';
      const component = render(renderSeasonOverviewText(OVERVIEW_TEXT));
      const textEvent = {
        nativeEvent: {
          lines: {
            length: MAX_NUMBER_LINES + 1,
          },
        },
      };
      act(() => {
        jest.runAllTimers();
      });
      fireEvent(elements.overviewText(component), 'onTextLayout', textEvent);
      expect(elements.overviewText(component)).not.toBeNull();
      expect(elements.overviewText(component).children[0]).toEqual(
        OVERVIEW_TEXT,
      );
      expect(elements.readMoreButton(component)).not.toBeNull();
      expect(elements.readMoreText(component).children[0]).toEqual(
        Translations.Tags
          .MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_READ_MORE_SEASON_OVERVIEW,
      );
    });
  });

  describe('When the "overview" is not provided', () => {
    it('should render correctly', () => {
      const component = render(renderSeasonOverviewText());
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.overviewText(component)).not.toBeNull();
      expect(elements.overviewText(component).children[0]).toEqual('...');
      expect(elements.readMoreButton(component)).toBeNull();
    });
  });

  describe.skip('Show the "full-overview"', () => {
    it('should show the "full-overview" when the user press the "read-more" text', () => {
      // todo
    });
  });
});
