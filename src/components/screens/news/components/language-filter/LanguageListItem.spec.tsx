import React from 'react';
import { fireEvent, cleanup, render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import { dark } from '../../../../../styles/themes';
import LanguageListItem from './LanguageListItem';
import Icon from '../../../../common/Icon';
import languages from './languages';

const renderLanguageFilter = (isSelected: boolean, onPress = jest.fn()) => (
  <ThemeProvider
    theme={dark}
  >
    <LanguageListItem
      name={languages[0].name}
      Flag={languages[0].Flag}
      isSelected={isSelected}
      onPress={onPress}
    />
  </ThemeProvider>
);

describe('Testing <LangugeListItem />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly when is selected', () => {
    const { getAllByType, getByTestId } = render(renderLanguageFilter(true));

    expect(getAllByType(Icon)).not.toBeNull();

    expect(getByTestId('outter-flag-wrapper').props.isSelected).toBe(true);
  });

  it('should render correctly when is not selected', () => {
    const { getAllByType, getByTestId } = render(renderLanguageFilter(false));

    try {
      expect(getAllByType(Icon));
    } catch (err) {
      expect(err.message).toEqual('No instances found');
    }

    expect(getByTestId('outter-flag-wrapper').props.isSelected).toBe(false);
  });

  it('should call onPress when is pressed', () => {
    const onPress = jest.fn();

    const { getAllByType } = render(renderLanguageFilter(false, onPress));

    fireEvent.press(getAllByType(LanguageListItem)[0]);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
