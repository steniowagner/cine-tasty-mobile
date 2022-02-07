import React from 'react';
import {
  RenderAPI,
  fireEvent,
  cleanup,
  render,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import LanguageListItem from './LanguageListItem';
import languages from '../languages';

const renderLanguageFilter = (isSelected: boolean, onPress = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <LanguageListItem
      name={languages[0].name}
      flag={languages[0].flag}
      isSelected={isSelected}
      onPress={onPress}
    />
  </ThemeProvider>
);

describe('<LangugeListItem />', () => {
  const elements = {
    iconCheckboxCircle: (api: RenderAPI) =>
      api.queryByTestId('icon-checkbox-circle'),
    outterFlagWrapper: (api: RenderAPI) =>
      api.queryByTestId('outter-flag-wrapper'),
    wrapper: (api: RenderAPI) => api.queryByTestId('language-filter-list-item'),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render correctly when is selected', () => {
    const component = render(renderLanguageFilter(true));
    expect(elements.iconCheckboxCircle(component)).not.toBeNull();
    expect(elements.outterFlagWrapper(component)).not.toBeNull();
  });

  it('should render correctly when is not selected', () => {
    const component = render(renderLanguageFilter(false));
    expect(elements.iconCheckboxCircle(component)).toBeNull();
    expect(elements.outterFlagWrapper(component)).not.toBeNull();
  });

  it('should render correctly when is selected and then the user unselects', () => {
    const component = render(renderLanguageFilter(true));
    expect(elements.iconCheckboxCircle(component)).not.toBeNull();
    expect(elements.outterFlagWrapper(component)).not.toBeNull();
    component.rerender(renderLanguageFilter(false));
    act(() => {
      jest.runAllTimers();
    });
    expect(elements.iconCheckboxCircle(component)).toBeNull();
    expect(elements.outterFlagWrapper(component)).not.toBeNull();
  });

  it('should render correctly when is not selected and then selects', () => {
    const component = render(renderLanguageFilter(false));
    expect(elements.iconCheckboxCircle(component)).toBeNull();
    expect(elements.outterFlagWrapper(component)).not.toBeNull();
    component.rerender(renderLanguageFilter(true));
    act(() => {
      jest.runAllTimers();
    });
    expect(elements.iconCheckboxCircle(component)).not.toBeNull();
    expect(elements.outterFlagWrapper(component)).not.toBeNull();
  });

  it('should call onPress when is pressed', () => {
    const onPress = jest.fn();
    const component = render(renderLanguageFilter(false, onPress));
    expect(onPress).toHaveBeenCalledTimes(0);
    fireEvent.press(elements.wrapper(component));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
