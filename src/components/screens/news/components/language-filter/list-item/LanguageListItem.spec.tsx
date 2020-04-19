import React from 'react';
import { fireEvent, cleanup, render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import { dark } from '../../../../../../styles/themes';
import LanguageListItem from './LanguageListItem';
import Icon from '../../../../../common/Icon';
import languages from '../languages';

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
    const { getAllByTestId, getByTestId } = render(renderLanguageFilter(true));

    expect(getAllByTestId('icon')).not.toBeNull();

    expect(getByTestId('outter-flag-wrapper').props.isSelected).toBe(true);
  });

  it('should render correctly when is not selected', () => {
    const { getAllByTestId, getByTestId } = render(renderLanguageFilter(false));

    try {
      expect(getAllByTestId('icon'));
    } catch (err) {
      expect(err.message).toEqual('No instances found with testID: icon');
    }

    expect(getByTestId('outter-flag-wrapper').props.isSelected).toBe(false);
  });

  it('should call onPress when is pressed', () => {
    const onPress = jest.fn();

    const { getAllByTestId } = render(renderLanguageFilter(false, onPress));

    fireEvent.press(getAllByTestId('language-filter-list-item')[0]);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
