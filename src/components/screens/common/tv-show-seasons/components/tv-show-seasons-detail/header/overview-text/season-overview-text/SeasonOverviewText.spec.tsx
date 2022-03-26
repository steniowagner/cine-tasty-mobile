import React from 'react';
import {fireEvent, cleanup, render, act} from '@testing-library/react-native';

import MockedNavigation from '@mocks/MockedNavigator';
import {ThemeContextProvider} from '@providers';
import * as TRANSLATIONS from '@i18n/tags';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {MAX_NUMBER_LINES} from './useSeasonOverviewText';
import SeasonOverviewText from './SeasonOverviewText';

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

const renderSeasonOverviewText = (overview?: string) => {
  const SeasonOverviewTextComponent = () => (
    <ThemeContextProvider>
      <SeasonOverviewText
        overview={overview}
        tvShowTitle="tvShowTitle"
        season={1}
      />
    </ThemeContextProvider>
  );

  return (
    <MockedNavigation
      component={SeasonOverviewTextComponent}
      params={{overview}}
    />
  );
};

describe('Testing <SeasonOverviewText />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render correctly when no overview is provided', () => {
    const {getByTestId, queryByTestId} = render(renderSeasonOverviewText());

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('overview-text')).not.toBeNull();

    expect(getByTestId('overview-text').children[0]).toEqual('...');

    expect(queryByTestId('read-more-button')).toBeNull();

    expect(queryByTestId('season-overview-wrapper')).toBeNull();
  });

  it('should render correctly when some overview is provided and it has less lines than the max', () => {
    const OVERVIEW_TEXT = 'some overview';

    const {getByTestId, queryByTestId} = render(
      renderSeasonOverviewText(OVERVIEW_TEXT),
    );

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

    fireEvent(getByTestId('overview-text'), 'onTextLayout', textEvent);

    expect(getByTestId('overview-text')).not.toBeNull();

    expect(getByTestId('overview-text').children[0]).toEqual(OVERVIEW_TEXT);

    expect(queryByTestId('read-more-button')).toBeNull();
  });

  it('should render correctly when some overview is provided and it has more lines than the max', () => {
    const OVERVIEW_TEXT = 'some overview';

    const {getByTestId} = render(renderSeasonOverviewText(OVERVIEW_TEXT));

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

    fireEvent(getByTestId('overview-text'), 'onTextLayout', textEvent);

    expect(getByTestId('overview-text')).not.toBeNull();

    expect(getByTestId('overview-text').children[0]).toEqual(OVERVIEW_TEXT);

    expect(getByTestId('read-more-button')).not.toBeNull();

    expect(getByTestId('read-more-text').children[0]).toEqual(
      TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_READ_MORE_SEASON_OVERVIEW,
    );
  });

  it('should navigate to the full-overview on a modal when the "read-more" button is pressed', () => {
    const OVERVIEW_TEXT = 'some overview';

    const {getByTestId} = render(renderSeasonOverviewText(OVERVIEW_TEXT));

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

    expect(mockedNavigate).toHaveBeenCalledTimes(0);

    fireEvent(getByTestId('overview-text'), 'onTextLayout', textEvent);

    fireEvent.press(getByTestId('read-more-button'));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);

    expect(mockedNavigate.mock.calls[0][0]).toEqual(
      Routes.CustomModal.CUSTOM_MODAL_STACK,
    );

    expect(mockedNavigate.mock.calls[0][1].type).toEqual(
      Types.CustomizedModalChildrenType.TV_SHOW_READ_MORE_DETAILS,
    );

    expect(mockedNavigate.mock.calls[0][1].extraData).toEqual({
      dataset: [{overview: OVERVIEW_TEXT}],
    });
  });
});
