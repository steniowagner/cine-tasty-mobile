import React from 'react';
import {
  fireEvent,
  RenderAPI,
  cleanup,
  render,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import OptionListItem from './OptionListItem';

const renderOptionListItem = (
  title: string,
  isSelected = true,
  onPress = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <OptionListItem onPress={onPress} isSelected={isSelected} title={title} />
  </ThemeProvider>
);

describe('<OptionListItem />', () => {
  const elements = {
    optionListItemButton: (api: RenderAPI) =>
      api.queryByTestId('option-list-item-button'),
    optionListItemText: (api: RenderAPI) =>
      api.queryByTestId('option-list-item-text'),
    checkboxCircle: (api: RenderAPI) =>
      api.queryByTestId('icon-checkbox-circle'),
  };
  const title = 'ANY_TITLE';

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render correctly when "isSelected" is "true"', () => {
    const component = render(renderOptionListItem(title));
    act(() => {
      jest.runAllTimers();
    });
    expect(elements.optionListItemButton(component)).not.toBeNull();
    expect(elements.optionListItemText(component)).not.toBeNull();
    expect(elements.optionListItemText(component).children[0]).toEqual(title);
    expect(elements.checkboxCircle(component)).not.toBeNull();
  });

  it('should render correctly when "isSelected" is "false"', () => {
    const component = render(renderOptionListItem(title, false));
    act(() => {
      jest.runAllTimers();
    });
    expect(elements.optionListItemButton(component)).not.toBeNull();
    expect(elements.optionListItemText(component)).not.toBeNull();
    expect(elements.optionListItemText(component).children[0]).toEqual(title);
    expect(elements.checkboxCircle(component)).toBeNull();
  });

  it('should render correctly when "isSelected" is previously "false" and then it changes to "true"', () => {
    const component = render(renderOptionListItem(title, false));
    act(() => {
      jest.runAllTimers();
    });
    expect(elements.optionListItemButton(component)).not.toBeNull();
    expect(elements.optionListItemText(component)).not.toBeNull();
    expect(elements.optionListItemText(component).children[0]).toEqual(title);
    expect(elements.checkboxCircle(component)).toBeNull();
    component.rerender(renderOptionListItem(title, true));
    expect(elements.optionListItemButton(component)).not.toBeNull();
    expect(elements.optionListItemText(component)).not.toBeNull();
    expect(elements.optionListItemText(component).children[0]).toEqual(title);
    expect(elements.checkboxCircle(component)).not.toBeNull();
  });

  it('should render correctly when "isSelected" is previously "true" and then it changes to "false"', () => {
    const component = render(renderOptionListItem(title, false));
    act(() => {
      jest.runAllTimers();
    });
    expect(elements.optionListItemButton(component)).not.toBeNull();
    expect(elements.optionListItemText(component)).not.toBeNull();
    expect(elements.optionListItemText(component).children[0]).toEqual(title);
    expect(elements.checkboxCircle(component)).toBeNull();
    component.rerender(renderOptionListItem(title, true));
    expect(elements.optionListItemButton(component)).not.toBeNull();
    expect(elements.optionListItemText(component)).not.toBeNull();
    expect(elements.optionListItemText(component).children[0]).toEqual(title);
    expect(elements.checkboxCircle(component)).not.toBeNull();
  });

  it('should call "onPress" when the user presses the item and it is selected', () => {
    const onPress = jest.fn();
    const component = render(renderOptionListItem(title, true, onPress));
    fireEvent.press(elements.optionListItemButton(component));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should call "onPress" when the user presses the item and it is not selected', () => {
    const onPress = jest.fn();
    const component = render(renderOptionListItem(title, false, onPress));
    fireEvent.press(elements.optionListItemButton(component));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
