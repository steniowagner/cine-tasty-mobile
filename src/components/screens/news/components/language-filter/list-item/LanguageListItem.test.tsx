import React from 'react';
import {
  RenderAPI,
  fireEvent,
  cleanup,
  render,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark} from '@styles/themes/dark';

import LanguageListItem from './LanguageListItem';
import {languages} from '../languages/languages';

const renderLanguageFilter = (isSelected: boolean, onPress = jest.fn()) => (
  <ThemeProvider theme={dark}>
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
    languageText: (api: RenderAPI) => api.queryByTestId('language-text'),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render correctly when is selected', () => {
    const component = render(renderLanguageFilter(true));
    expect(elements.iconCheckboxCircle(component)).not.toBeNull();
    expect(elements.outterFlagWrapper(component)).not.toBeNull();
    expect(elements.languageText(component).props.style[0].color).toEqual(
      dark.colors.text,
    );
    expect(elements.wrapper(component).props.style.backgroundColor).toEqual(
      dark.colors.background,
    );
  });

  it('should render correctly when is not selected', () => {
    const component = render(renderLanguageFilter(false));
    expect(elements.iconCheckboxCircle(component)).toBeNull();
    expect(elements.outterFlagWrapper(component)).not.toBeNull();
    expect(elements.languageText(component).props.style[0].color).toEqual(
      dark.colors.background,
    );
    expect(elements.wrapper(component).props.style.backgroundColor).toEqual(
      dark.colors.text,
    );
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
