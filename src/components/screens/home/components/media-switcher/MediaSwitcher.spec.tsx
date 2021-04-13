import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { dark as theme } from '@styles/themes/dark';

import timeTravel, { setupTimeTravel } from '../../../../../../__mocks__/timeTravel';
import { SWITCH_ANIMATION_DURATION_MS } from './useMediaSwitcher';
import MediaSwitcher from './MediaSwitcher';

const ACTIVE_TEXT_RGBA = theme.colors.buttonText;
const INACTIVE_TEXT_RGBA = theme.colors.text;

const NUMBER_SWITCH_ITEMS = 2;
const switchTitlesI18NRefs = Array(NUMBER_SWITCH_ITEMS)
  .fill('')
  .map((_, index) => `switch-title-${index}`);
const defaultPresses = Array(NUMBER_SWITCH_ITEMS).fill(() => {});

type SwitchPress = () => void;

const getMediaSwitcherProps = (switchPresses: SwitchPress[]) =>
  Array(NUMBER_SWITCH_ITEMS)
    .fill({})
    .map((_, index) => ({
      titlei18nRef: switchTitlesI18NRefs[index],
      onPress: switchPresses[index],
    }));

const renderMediaSwitcher = (switchPresses = defaultPresses, isDisabled = false) => (
  <ThemeProvider theme={theme}>
    <MediaSwitcher items={getMediaSwitcherProps(switchPresses)} isDisabled={isDisabled} />
  </ThemeProvider>
);

describe('Testing <MediaSwitcher />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly on the first render', () => {
    const { getByTestId, getByText } = render(renderMediaSwitcher());

    expect(switchTitlesI18NRefs.every(titlei18nRef => getByText(titlei18nRef))).toBe(
      true,
    );

    expect(getByTestId('switch-title-0-text').props.style.color).toEqual(
      ACTIVE_TEXT_RGBA,
    );

    expect(getByTestId('switch-title-1-text').props.style.color).toEqual(
      INACTIVE_TEXT_RGBA,
    );

    expect(getByTestId('switcher-indicator').props.style.opacity).toEqual(1);

    expect(getByTestId('switcher-indicator').props.style.transform[0].translateX).toEqual(
      0,
    );
  });

  it('should switch the selection from the currently-selected-item to the next-item when the next-item is pressed', () => {
    const pressFirstItem = jest.fn();
    const pressSecondItem = jest.fn();

    const { getByTestId } = render(
      renderMediaSwitcher([pressFirstItem, pressSecondItem]),
    );

    expect(getByTestId('switch-title-0-text').props.style.color).toEqual(
      ACTIVE_TEXT_RGBA,
    );

    expect(getByTestId('switch-title-1-text').props.style.color).toEqual(
      INACTIVE_TEXT_RGBA,
    );

    fireEvent.press(getByTestId('switch-title-1-button'));

    act(() => {
      timeTravel(SWITCH_ANIMATION_DURATION_MS);
    });

    expect(getByTestId('switch-title-0-text').props.style.color).toEqual(
      INACTIVE_TEXT_RGBA,
    );

    expect(getByTestId('switch-title-1-text').props.style.color).toEqual(
      ACTIVE_TEXT_RGBA,
    );

    expect(getByTestId('switcher-indicator').props.style.transform[0].translateX).toEqual(
      750,
    );

    expect(pressFirstItem).toHaveBeenCalledTimes(0);

    expect(pressSecondItem).toHaveBeenCalledTimes(1);
  });

  it('should switch the selection from the currently-selected-item to the next-item (user press next-item) and the back to the firstly-selected-item (user press previous-item)', () => {
    const pressFirstItem = jest.fn();
    const pressSecondItem = jest.fn();

    const { getByTestId } = render(
      renderMediaSwitcher([pressFirstItem, pressSecondItem]),
    );

    expect(getByTestId('switch-title-0-text').props.style.color).toEqual(
      ACTIVE_TEXT_RGBA,
    );

    expect(getByTestId('switch-title-1-text').props.style.color).toEqual(
      INACTIVE_TEXT_RGBA,
    );

    expect(getByTestId('switcher-indicator').props.style.transform[0].translateX).toEqual(
      0,
    );

    fireEvent.press(getByTestId('switch-title-1-button'));

    act(() => {
      timeTravel(SWITCH_ANIMATION_DURATION_MS);
    });

    expect(getByTestId('switch-title-0-text').props.style.color).toEqual(
      INACTIVE_TEXT_RGBA,
    );

    expect(getByTestId('switch-title-1-text').props.style.color).toEqual(
      ACTIVE_TEXT_RGBA,
    );

    expect(getByTestId('switcher-indicator').props.style.transform[0].translateX).toEqual(
      750,
    );

    fireEvent.press(getByTestId('switch-title-0-button'));

    act(() => {
      timeTravel(SWITCH_ANIMATION_DURATION_MS);
    });

    expect(getByTestId('switch-title-0-text').props.style.color).toEqual(
      ACTIVE_TEXT_RGBA,
    );

    expect(getByTestId('switch-title-1-text').props.style.color).toEqual(
      INACTIVE_TEXT_RGBA,
    );

    expect(getByTestId('switcher-indicator').props.style.transform[0].translateX).toEqual(
      0,
    );

    expect(pressFirstItem).toHaveBeenCalledTimes(1);

    expect(pressSecondItem).toHaveBeenCalledTimes(1);
  });

  it('should not change the the current-item-selected when the item-pressed is the current-item-selected', () => {
    const pressFirstItem = jest.fn();
    const pressSecondItem = jest.fn();

    const { getByTestId } = render(
      renderMediaSwitcher([pressFirstItem, pressSecondItem]),
    );

    fireEvent.press(getByTestId('switch-title-0-button'));

    act(() => {
      timeTravel(SWITCH_ANIMATION_DURATION_MS);
    });

    expect(pressFirstItem).toHaveBeenCalledTimes(0);

    expect(pressSecondItem).toHaveBeenCalledTimes(0);
  });

  it('should not change the the current-item-selected when the item-pressed is the current-item-selected', () => {
    const pressFirstItem = jest.fn();
    const pressSecondItem = jest.fn();

    const { getByTestId } = render(
      renderMediaSwitcher([pressFirstItem, pressSecondItem]),
    );

    fireEvent.press(getByTestId('switch-title-1-button'));

    act(() => {
      timeTravel(SWITCH_ANIMATION_DURATION_MS);
    });

    fireEvent.press(getByTestId('switch-title-1-button'));

    act(() => {
      timeTravel(SWITCH_ANIMATION_DURATION_MS);
    });

    expect(pressFirstItem).toHaveBeenCalledTimes(0);

    expect(pressSecondItem).toHaveBeenCalledTimes(1);
  });

  it('should not call the press-first-item-callback when "isDisabled" is "true" and the user press the first-item', () => {
    const pressFirstItem = jest.fn();

    const { getByTestId } = render(
      renderMediaSwitcher([pressFirstItem, jest.fn()], true),
    );

    fireEvent.press(getByTestId('switch-title-0-button'));

    act(() => {
      timeTravel(SWITCH_ANIMATION_DURATION_MS);
    });

    expect(pressFirstItem).toHaveBeenCalledTimes(0);
  });

  it('should not call the press-first-item-callback when "isDisabled" is "true" and the user press the second-item', () => {
    const pressSecondItem = jest.fn();

    const { getByTestId } = render(
      renderMediaSwitcher([jest.fn(), pressSecondItem], true),
    );

    fireEvent.press(getByTestId('switch-title-1-button'));

    act(() => {
      timeTravel(SWITCH_ANIMATION_DURATION_MS);
    });

    expect(pressSecondItem).toHaveBeenCalledTimes(0);
  });

  it('should render correctly when "isDisabled" is "true"', () => {
    const { getByTestId } = render(renderMediaSwitcher(undefined, true));

    expect(getByTestId('switcher-indicator').props.style.opacity).toEqual(0.5);
  });
});
