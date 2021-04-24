import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';

import { ThemeContextProvider } from '@providers';
import * as TRANSLATIONS from '@i18n/tags';

import { MAX_NUMBER_LINES } from './useSeasonOverviewText';
import SeasonOverviewText from './SeasonOverviewText';

const renderSeasonOverviewText = (overview?: string) => (
  <ThemeContextProvider>
    <SeasonOverviewText overview={overview} />
  </ThemeContextProvider>
);

describe('Testing <SeasonOverviewText />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render correctly when no overview is provided', () => {
    const { getByTestId, queryByTestId } = render(renderSeasonOverviewText());

    expect(getByTestId('overview-text')).not.toBeNull();

    expect(getByTestId('overview-text').children[0]).toEqual('...');

    expect(queryByTestId('read-more-button')).toBeNull();

    expect(queryByTestId('season-overview-wrapper')).toBeNull();
  });

  it('should render correctly when some overview is provided and it has less lines than the max', () => {
    const OVERVIEW_TEXT = 'some overview';

    const { getByTestId, queryByTestId } = render(
      renderSeasonOverviewText(OVERVIEW_TEXT),
    );

    const textEvent = {
      nativeEvent: {
        lines: {
          length: MAX_NUMBER_LINES - 1,
        },
      },
    };

    fireEvent(getByTestId('overview-text'), 'onTextLayout', textEvent);

    expect(getByTestId('overview-text')).not.toBeNull();

    expect(getByTestId('overview-text').children[0]).toEqual(OVERVIEW_TEXT);

    expect(queryByTestId('read-more-button')).toBeNull();
  });

  it('should render correctly when some overview is provided and it has more lines than the max', () => {
    const OVERVIEW_TEXT = 'some overview';

    const { getByTestId } = render(renderSeasonOverviewText(OVERVIEW_TEXT));

    const textEvent = {
      nativeEvent: {
        lines: {
          length: MAX_NUMBER_LINES + 1,
        },
      },
    };

    fireEvent(getByTestId('overview-text'), 'onTextLayout', textEvent);

    expect(getByTestId('overview-text')).not.toBeNull();

    expect(getByTestId('overview-text').children[0]).toEqual(OVERVIEW_TEXT);

    expect(getByTestId('read-more-button')).not.toBeNull();

    expect(getByTestId('read-more-text').children[0]).toEqual(
      TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_READ_MORE_SEASON_OVERVIEW,
    );
  });

  it('should show the full-overview on a modal when the "read-more" button is pressed', () => {
    const OVERVIEW_TEXT = 'some overview';

    const { queryByTestId, getByTestId } = render(
      renderSeasonOverviewText(OVERVIEW_TEXT),
    );

    const textEvent = {
      nativeEvent: {
        lines: {
          length: MAX_NUMBER_LINES + 1,
        },
      },
    };

    fireEvent(getByTestId('overview-text'), 'onTextLayout', textEvent);

    expect(queryByTestId('modal-wrapper')).toBeNull();

    fireEvent.press(getByTestId('read-more-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('modal-wrapper')).not.toBeNull();

    expect(getByTestId('overview-description-text')).not.toBeNull();

    expect(getByTestId('overview-description-text').children[0]).toEqual(OVERVIEW_TEXT);
  });

  it('should close the modal when the modal-close-button is pressed', () => {
    const OVERVIEW_TEXT = 'some overview';

    const { queryByTestId, getByTestId } = render(
      renderSeasonOverviewText(OVERVIEW_TEXT),
    );

    const textEvent = {
      nativeEvent: {
        lines: {
          length: MAX_NUMBER_LINES + 1,
        },
      },
    };

    fireEvent(getByTestId('overview-text'), 'onTextLayout', textEvent);

    fireEvent.press(getByTestId('read-more-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('modal-wrapper')).not.toBeNull();

    expect(getByTestId('overview-description-text')).not.toBeNull();

    expect(getByTestId('overview-description-text').children[0]).toEqual(OVERVIEW_TEXT);

    fireEvent.press(getByTestId('close-modal-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('modal-wrapper')).toBeNull();

    expect(queryByTestId('overview-description-text')).toBeNull();
  });
});
