import React from 'react';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark } from '@styles/themes/dark';

import { languages } from '../filter-languages/languages';
import LanguageListItem from './LanguageListItem';

const language = languages[9];

const renderLanguageFilter = (isSelected: boolean, onPress = jest.fn()) => (
  <ThemeProvider theme={dark}>
    <LanguageListItem
      title={language.name}
      flag={language.flag}
      isSelected={isSelected}
      onPress={onPress}
    />
  </ThemeProvider>
);

describe('Screen/News/LanguagesFilterListItem', () => {
  const elements = {
    iconCheckboxCircle: (api: RenderAPI) =>
      api.queryByTestId('icon-checkbox-circle'),
    outterFlagWrapper: (api: RenderAPI) =>
      api.getByTestId('outter-flag-wrapper'),
    flag: (api: RenderAPI) => api.getByTestId(`flag-svg-${language.flag}`),
    wrapper: (api: RenderAPI) => api.getByTestId('language-filter-list-item'),
    languageText: (api: RenderAPI) => api.getByTestId('language-text'),
  };

  it('should render correctly when is "selected"', () => {
    const component = render(renderLanguageFilter(true));
    expect(elements.iconCheckboxCircle(component)).not.toBeNull();
    expect(elements.outterFlagWrapper(component)).not.toBeNull();
    expect(elements.languageText(component).children[0]).toEqual(language.name);
    expect(elements.flag(component)).not.toBeNull();
    const textStyles = elements.languageText(component).props.style;
    expect(textStyles[textStyles.length - 1].color).toEqual(dark.colors.text);
    expect(elements.wrapper(component).props.style.backgroundColor).toEqual(
      dark.colors.background,
    );
  });

  it('should render correctly when is "not selected"', () => {
    const component = render(renderLanguageFilter(false));
    expect(elements.iconCheckboxCircle(component)).toBeNull();
    expect(elements.outterFlagWrapper(component)).not.toBeNull();
    expect(elements.languageText(component).children[0]).toEqual(language.name);
    expect(elements.flag(component)).not.toBeNull();
    const textStyles = elements.languageText(component).props.style;
    expect(textStyles[textStyles.length - 1].color).toEqual(
      dark.colors.background,
    );
    expect(elements.wrapper(component).props.style.backgroundColor).toEqual(
      dark.colors.text,
    );
  });

  it('should call onPress when is pressed', () => {
    const onPress = jest.fn();
    const component = render(renderLanguageFilter(false, onPress));
    expect(onPress).toHaveBeenCalledTimes(0);
    fireEvent.press(elements.wrapper(component));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
