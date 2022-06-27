import React from 'react';
import {RenderAPI, fireEvent, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import {HeaderIconButton} from './HeaderIconButton';

const ICON_NAME = 'tune';

const renderHeaderButton = (onPress = jest.fn(), disabled: boolean = false) => (
  <ThemeProvider theme={theme}>
    <HeaderIconButton
      iconName={ICON_NAME}
      disabled={disabled}
      onPress={onPress}
      color="primary"
    />
  </ThemeProvider>
);

describe('<HeaderIconButton />', () => {
  const elements = {
    icon: (api: RenderAPI) => api.queryByTestId(`icon-${ICON_NAME}`),
    iconButton: (api: RenderAPI) =>
      api.queryByTestId(`header-icon-button-wrapper-${ICON_NAME}`),
  };

  it('should render correctly when the button is disabled', () => {
    const component = render(renderHeaderButton());
    expect(elements.iconButton(component)).not.toBeNull();
    expect(elements.icon(component)).not.toBeNull();
  });

  it('should render correctly when the button is enabled', () => {
    const component = render(renderHeaderButton(undefined, true));
    expect(elements.iconButton(component)).not.toBeNull();
    expect(elements.icon(component)).not.toBeNull();
  });

  it('should call the "onPress" function when the user presses the "icon-button"', () => {
    const onPress = jest.fn();
    const component = render(renderHeaderButton(onPress));
    expect(onPress).toHaveBeenCalledTimes(0);
    fireEvent.press(elements.iconButton(component));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should not call the "onPress" function when the user presses the "icon-button" and the button is "disabled"', () => {
    const onPress = jest.fn();
    const component = render(renderHeaderButton(onPress, true));
    expect(onPress).toHaveBeenCalledTimes(0);
    fireEvent.press(elements.iconButton(component));
    expect(onPress).toHaveBeenCalledTimes(0);
  });
});
