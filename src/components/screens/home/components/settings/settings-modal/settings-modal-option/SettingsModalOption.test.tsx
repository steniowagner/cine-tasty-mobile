import React from 'react';
import {RenderAPI, fireEvent, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import {SettingsModalOption} from './SettingsModalOption';

const renderSettingsModalOption = (
  title: string = 'Title',
  onPress = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <SettingsModalOption title={title} onPress={onPress} icon="about" />
  </ThemeProvider>
);

describe('<SettingsModalOption />', () => {
  const elements = {
    button: (api: RenderAPI) =>
      api.queryByTestId('settings-modal-option-button'),
    text: (api: RenderAPI) => api.queryByTestId('settings-modal-option-text'),
    icon: (api: RenderAPI) => api.queryByTestId('icon-about'),
  };

  it('should call the "onPress" when the user presses the button', () => {
    const onPress = jest.fn();
    const component = render(renderSettingsModalOption('Some title', onPress));
    fireEvent.press(elements.button(component));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should show the title correctly', () => {
    const title = 'Some random title';
    const component = render(renderSettingsModalOption(title));
    expect(elements.text(component).children[0]).toEqual(title);
  });

  it('should show the icon correctly', () => {
    const component = render(renderSettingsModalOption());
    expect(elements.icon(component)).not.toBeNull();
  });
});
