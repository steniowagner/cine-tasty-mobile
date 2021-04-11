/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import * as TRANSLATIONS from 'i18n/tags';
import theme from 'styles/theme';

import { DEFAULT_NUMBER_OF_LINES } from './useMediaItemDescription';
import MediaListItemDescription from './MediaItemDescription';

const DESCRIPTION = 'SOME DESCRIPTION';

const renderMediaItemDescription = () => (
  <ThemeProvider theme={theme}>
    <MediaListItemDescription description={DESCRIPTION} />
  </ThemeProvider>
);

describe('Testing <MediaItemDescription />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render correctly when the text is greater than the value stored on DEFAULT_NUMBER_OF_LINES', () => {
    const { getByTestId } = render(renderMediaItemDescription());

    const textEvent = {
      nativeEvent: {
        lines: {
          length: DEFAULT_NUMBER_OF_LINES + 1,
        },
      },
    };

    fireEvent(getByTestId('description-text'), 'onTextLayout', textEvent);

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('description-text').props.numberOfLines).toEqual(
      DEFAULT_NUMBER_OF_LINES,
    );

    expect(getByTestId('expandable-read-text').children[0]).toEqual(
      TRANSLATIONS.FAMOUS_DETAIL_READ_MORE,
    );
  });

  it('should render correctly when the text is less than the value stored on DEFAULT_NUMBER_OF_LINES', () => {
    const { queryByTestId, getByTestId } = render(renderMediaItemDescription());

    const textEvent = {
      nativeEvent: {
        lines: {
          length: DEFAULT_NUMBER_OF_LINES - 1,
        },
      },
    };

    fireEvent(getByTestId('description-text'), 'onTextLayout', textEvent);

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('description-text').props.numberOfLines).toEqual(
      DEFAULT_NUMBER_OF_LINES - 1,
    );

    expect(queryByTestId('expandable-read-text')).toBeNull();
  });

  it('should render correctly when the text is equal to the value stored on DEFAULT_NUMBER_OF_LINES', () => {
    const { queryByTestId, getByTestId } = render(renderMediaItemDescription());

    const textEvent = {
      nativeEvent: {
        lines: {
          length: DEFAULT_NUMBER_OF_LINES,
        },
      },
    };

    fireEvent(getByTestId('description-text'), 'onTextLayout', textEvent);

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('description-text').props.numberOfLines).toEqual(
      DEFAULT_NUMBER_OF_LINES,
    );

    expect(queryByTestId('expandable-read-text')).toBeNull();
  });

  it('should show correctly when the user press the "READ-MORE" button', () => {
    const INCREASED_NUMBER_OF_LINES = DEFAULT_NUMBER_OF_LINES + 2;
    const { getByTestId } = render(renderMediaItemDescription());

    const textEvent = {
      nativeEvent: {
        lines: {
          length: INCREASED_NUMBER_OF_LINES,
        },
      },
    };

    fireEvent(getByTestId('description-text'), 'onTextLayout', textEvent);

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('description-text').props.numberOfLines).toEqual(
      DEFAULT_NUMBER_OF_LINES,
    );

    expect(getByTestId('expandable-read-text').children[0]).toEqual(
      TRANSLATIONS.FAMOUS_DETAIL_READ_MORE,
    );

    fireEvent.press(getByTestId('expandable-read-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('description-text').props.numberOfLines).toEqual(
      INCREASED_NUMBER_OF_LINES,
    );

    expect(getByTestId('expandable-read-text').children[0]).toEqual(
      TRANSLATIONS.FAMOUS_DETAIL_READ_LESS,
    );
  });

  it('should show correctly when the user press the "READ-LESS" button', () => {
    const INCREASED_NUMBER_OF_LINES = DEFAULT_NUMBER_OF_LINES + 2;
    const { getByTestId } = render(renderMediaItemDescription());

    const textEvent = {
      nativeEvent: {
        lines: {
          length: INCREASED_NUMBER_OF_LINES,
        },
      },
    };

    fireEvent(getByTestId('description-text'), 'onTextLayout', textEvent);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('expandable-read-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('description-text').props.numberOfLines).toEqual(
      INCREASED_NUMBER_OF_LINES,
    );

    expect(getByTestId('expandable-read-text').children[0]).toEqual(
      TRANSLATIONS.FAMOUS_DETAIL_READ_LESS,
    );

    fireEvent.press(getByTestId('expandable-read-button'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('description-text').props.numberOfLines).toEqual(
      DEFAULT_NUMBER_OF_LINES,
    );

    expect(getByTestId('expandable-read-text').children[0]).toEqual(
      TRANSLATIONS.FAMOUS_DETAIL_READ_MORE,
    );
  });
});
