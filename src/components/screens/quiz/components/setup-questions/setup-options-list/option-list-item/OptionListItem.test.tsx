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

const TITLE = 'ANY_TITLE';

const checkIsProperlySelected = (
  component: RenderAPI,
  elements: Record<string, any>,
) => {
  expect(elements.optionListItemButton(component)).not.toBeNull();
  expect(elements.optionListItemText(component)).not.toBeNull();
  expect(elements.optionListItemText(component).children[0]).toEqual(TITLE);
  expect(elements.checkboxCircle(component)).not.toBeNull();
  expect(
    elements.optionListItemButton(component).props.style.backgroundColor,
  ).toEqual(theme.colors.primary);
};

const checkIsProperlyUnselected = (
  component: RenderAPI,
  elements: Record<string, any>,
) => {
  expect(elements.optionListItemButton(component)).not.toBeNull();
  expect(elements.optionListItemText(component)).not.toBeNull();
  expect(elements.optionListItemText(component).children[0]).toEqual(TITLE);
  expect(elements.checkboxCircle(component)).toBeNull();
  expect(
    elements.optionListItemButton(component).props.style.backgroundColor,
  ).toEqual('transparent');
};

const renderOptionListItem = (isSelected = true, onPress = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <OptionListItem onPress={onPress} isSelected={isSelected} title={TITLE} />
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

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render correctly when "isSelected" is "true"', () => {
    const component = render(renderOptionListItem());
    act(() => {
      jest.runAllTimers();
    });
    checkIsProperlySelected(component, elements);
  });

  it('should render correctly when "isSelected" is "false"', () => {
    const component = render(renderOptionListItem(false));
    act(() => {
      jest.runAllTimers();
    });
    checkIsProperlyUnselected(component, elements);
  });

  it('should render correctly when "isSelected" is previously "false" and then it changes to "true"', () => {
    const component = render(renderOptionListItem(false));
    act(() => {
      jest.runAllTimers();
    });
    checkIsProperlyUnselected(component, elements);
    component.rerender(renderOptionListItem(true));
    checkIsProperlySelected(component, elements);
  });

  it('should render correctly when "isSelected" is previously "true" and then it changes to "false"', () => {
    const component = render(renderOptionListItem(true));
    act(() => {
      jest.runAllTimers();
    });
    checkIsProperlySelected(component, elements);
    component.rerender(renderOptionListItem(false));
    checkIsProperlyUnselected(component, elements);
  });

  it('should call "onPress" when the user presses the item and it is selected', () => {
    const onPress = jest.fn();
    const component = render(renderOptionListItem(true, onPress));
    fireEvent.press(elements.optionListItemButton(component));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should call "onPress" when the user presses the item and it is not selected', () => {
    const onPress = jest.fn();
    const component = render(renderOptionListItem(false, onPress));
    fireEvent.press(elements.optionListItemButton(component));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
