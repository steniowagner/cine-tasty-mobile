import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { CustomizedModalChildrenType } from 'types';
import { ArticleLanguage } from 'types/schema';
import { dark } from 'styles/themes';

import timeTravel, { setupTimeTravel } from '../../../../../../__mocks__/timeTravel';
import { ANIMATION_TIMING } from './useCustomizedModal';
import CustomizedModal from './CustomizedModal';

const HEADER_TEXT = 'SETUP_QUESTIONS_OPTIONS_LIST_HEADER_TEXT';

const getRouteParam = (onPressSelect = jest.fn) => ({
  params: {
    type: CustomizedModalChildrenType.MEDIA_FILTER,
    headerText: HEADER_TEXT,
    extraData: {
      lastItemSelected: ArticleLanguage.PT,
      onPressSelect,
    },
  },
});

const getNavigationParam = (goBack = jest.fn) => ({
  goBack,
});

const renderCustomizedModal = (onPressSelect = jest.fn, goBack = jest.fn) => (
  <ThemeProvider theme={dark}>
    <CustomizedModal
      navigation={getNavigationParam(goBack)}
      route={getRouteParam(onPressSelect)}
    />
  </ThemeProvider>
);

describe('Testing <CustomizedModal />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByTestId, getByText, getByTestId } = render(renderCustomizedModal());

    expect(getByTestId('customized-modal')).not.toBeNull();

    expect(getByTestId('card-wrapper')).not.toBeNull();

    expect(getByTestId('closeable-area')).not.toBeNull();

    expect(getByTestId('options-list')).not.toBeNull();

    expect(getByTestId('select-button')).not.toBeNull();

    expect(queryByTestId('languages-list')).toBeNull();

    expect(getByText(HEADER_TEXT)).not.toBeNull();
  });

  it('should call onClose when the CloseableArea is pressed', () => {
    const onClose = jest.fn();

    const { getByTestId } = render(renderCustomizedModal(jest.fn, onClose));

    fireEvent.press(getByTestId('closeable-area'));

    act(() => {
      timeTravel(ANIMATION_TIMING);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
