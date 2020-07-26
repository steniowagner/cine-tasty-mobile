import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, act } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import CustomModal, { ANIMATION_TIMING } from './CustomModal';

const HEADER_TEXT = 'HEADER_TEXT';
const FOOTER_TEXT = 'FOOTER_TEXT';

const CHILDREN_TEST_ID = 'custom-modal-children';
const Children = () => (
  <View
    testID={CHILDREN_TEST_ID}
  />
);

type CallableFunction = () => void;

const renderCustomModal = (
  onPressSelect: CallableFunction = jest.fn,
  onClose: CallableFunction = jest.fn,
) => (
  <ThemeProvider
    theme={dark}
  >
    <CustomModal
      onPressSelect={onPressSelect}
      headerText={HEADER_TEXT}
      footerText={FOOTER_TEXT}
      onClose={onClose}
    >
      <Children />
    </CustomModal>
  </ThemeProvider>
);

jest.useFakeTimers();

describe('Testing <CustomModal />', () => {
  it('should render correctly', () => {
    const { getByText, getByTestId } = render(renderCustomModal());

    expect(getByTestId('custom-modal')).not.toBeNull();

    expect(getByTestId('card-wrapper')).not.toBeNull();

    expect(getByTestId('card-header-wrapper')).not.toBeNull();

    expect(getByTestId('select-button')).not.toBeNull();

    expect(getByTestId('closeable-area')).not.toBeNull();

    expect(getByTestId(CHILDREN_TEST_ID)).not.toBeNull();

    expect(getByText(HEADER_TEXT)).not.toBeNull();

    expect(getByText(FOOTER_TEXT)).not.toBeNull();
  });

  it('should call onClose when the CloseableArea is pressed', () => {
    const onClose = jest.fn();

    const { getByTestId } = render(renderCustomModal(jest.fn, onClose));

    fireEvent.press(getByTestId('closeable-area'));

    act(() => {
      global.timeTravel(ANIMATION_TIMING);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onPressSelect when the SelectButton is pressed', () => {
    const onPressSelect = jest.fn();

    const { getByTestId } = render(renderCustomModal(onPressSelect));

    fireEvent.press(getByTestId('select-button'));

    act(() => {
      global.timeTravel(ANIMATION_TIMING);
    });

    expect(onPressSelect).toHaveBeenCalledTimes(1);
  });
});