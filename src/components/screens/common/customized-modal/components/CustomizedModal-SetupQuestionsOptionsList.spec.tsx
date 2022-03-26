import React from 'react';
import {fireEvent, cleanup, render, act} from '@testing-library/react-native';

import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {navigation} from '@mocks/navigationMock';
import {ThemeContextProvider} from '@providers';
import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {ANIMATION_TIMING} from './useCustomizedModal';
import CustomizedModal from './CustomizedModal';

const HEADER_TEXT = 'SETUP_QUESTIONS_OPTIONS_LIST_HEADER_TEXT';

const renderCustomizedModal = (onPressSelect = jest.fn, goBack = jest.fn) => (
  <ThemeContextProvider>
    <CustomizedModal
      navigation={{...navigation, goBack}}
      route={{
        name: Routes.CustomModal.CUSTOM_MODAL_STACK,
        key: `${Routes.CustomModal.CUSTOM_MODAL_STACK}-key`,
        params: {
          type: Types.CustomizedModalChildrenType.MEDIA_FILTER,
          headerText: HEADER_TEXT,
          extraData: {
            lastItemSelected: SchemaTypes.ArticleLanguage.PT,
            onPressSelect,
          },
        },
      }}
    />
  </ThemeContextProvider>
);

describe('Testing <CustomizedModal />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly', () => {
    const {queryByTestId, getByText, getByTestId} = render(
      renderCustomizedModal(),
    );

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

    const {getByTestId} = render(renderCustomizedModal(jest.fn, onClose));

    fireEvent.press(getByTestId('closeable-area'));

    act(() => {
      timeTravel(ANIMATION_TIMING);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
