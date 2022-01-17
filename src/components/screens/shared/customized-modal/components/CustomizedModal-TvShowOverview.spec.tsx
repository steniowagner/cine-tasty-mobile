import React from 'react';
import {fireEvent, cleanup, render, act} from '@testing-library/react-native';

import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {navigation} from '@mocks/navigationMock';
import {ThemeContextProvider} from '@providers';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {ANIMATION_TIMING} from './useCustomizedModal';
import CustomizedModal from './CustomizedModal';

const HEADER_TEXT = 'LANGUAGE_FILTER_HEADER_TEXT';
const OVERVIEW_TEXT = 'OVERVIEW_TEXT';

const renderCustomizedModal = (onPressSelect = jest.fn, goBack = jest.fn) => (
  <ThemeContextProvider>
    <CustomizedModal
      navigation={{...navigation, goBack}}
      route={{
        name: Routes.CustomModal.CUSTOM_MODAL_STACK,
        key: `${Routes.CustomModal.CUSTOM_MODAL_STACK}-key`,
        params: {
          type: Types.CustomizedModalChildrenType.TV_SHOW_READ_MORE_DETAILS,
          headerText: HEADER_TEXT,
          extraData: {
            dataset: [{overview: OVERVIEW_TEXT}],
          },
        },
      }}
    />
  </ThemeContextProvider>
);

describe('Testing <CustomizedModal /> -- TVShowOverview', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly', () => {
    const {getByText, getByTestId} = render(renderCustomizedModal());

    act(() => {
      timeTravel(ANIMATION_TIMING);
      jest.runAllTimers();
    });

    expect(getByTestId('customized-modal')).not.toBeNull();

    expect(getByTestId('card-wrapper')).not.toBeNull();

    expect(getByTestId('closeable-area')).not.toBeNull();

    expect(getByTestId('season-full-overview-wrapper')).not.toBeNull();

    expect(getByTestId('overview-text')).not.toBeNull();

    expect(getByTestId('overview-text').children[0]).toEqual(OVERVIEW_TEXT);

    expect(getByText(HEADER_TEXT)).not.toBeNull();
  });

  it('should call onClose when the CloseableArea is pressed', () => {
    const onClose = jest.fn();

    const {getByTestId} = render(renderCustomizedModal(jest.fn, onClose));

    fireEvent.press(getByTestId('closeable-area'));

    act(() => {
      timeTravel(ANIMATION_TIMING);
      jest.runAllTimers();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
