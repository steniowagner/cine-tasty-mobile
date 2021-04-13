import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';
import theme from '@styles/theme';

import timeTravel, { setupTimeTravel } from '../../../../../../__mocks__/timeTravel';
import { ANIMATION_TIMING } from './useCustomizedModal';
import CustomizedModal from './CustomizedModal';

const HEADER_TEXT = 'LANGUAGE_FILTER_HEADER_TEXT';

const getRouteParam = (onPressSelect = jest.fn) => ({
  params: {
    type: Types.CustomizedModalChildrenType.LANGUAGE,
    headerText: HEADER_TEXT,
    extraData: {
      lastItemSelected: SchemaTypes.ArticleLanguage.PT,
      onPressSelect,
    },
  },
});

const getNavigationParam = (goBack = jest.fn) => ({
  goBack,
});

const renderCustomizedModal = (onPressSelect = jest.fn, goBack = jest.fn) => (
  <ThemeProvider theme={theme}>
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

    expect(getByTestId('languages-list')).not.toBeNull();

    expect(getByTestId('select-button')).not.toBeNull();

    expect(queryByTestId('options-list')).toBeNull();

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
