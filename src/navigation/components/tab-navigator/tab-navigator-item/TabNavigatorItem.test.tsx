import React from 'react';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider, DefaultTheme } from 'styled-components/native';

import { dark, light } from '@styles/themes';

import { TabNavigatorItem } from './TabNavigatorItem';

const TITLE = 'SOME_TITLE';

type RenderTabNavigatorItemParams = {
  isSelected: boolean;
  onPress?: jest.Mock;
  theme?: DefaultTheme;
};

const renderTabNavigatorItem = (params: RenderTabNavigatorItemParams) => (
  <ThemeProvider theme={params.theme || dark}>
    <TabNavigatorItem
      inactiveIcon="home-inactive"
      activeIcon="home-active"
      onPress={params.onPress || jest.fn()}
      isSelected={params.isSelected}
      title={TITLE}
    />
  </ThemeProvider>
);

describe('Navigation/components/TabNavigatorItem', () => {
  const elements = {
    button: (api: RenderAPI) => api.getByTestId('tab-button'),
    text: (api: RenderAPI) => api.getByTestId('tab-title'),
  };

  describe('When it is "selected"', () => {
    const isSelected = true;

    it('should render all components correctly', () => {
      const component = render(renderTabNavigatorItem({ isSelected }));
      expect(component.queryByTestId('icon-home-active')).not.toBeNull();
      expect(elements.button(component)).not.toBeNull();
      expect(elements.text(component)).not.toBeNull();
      expect(elements.text(component).children[0]).toEqual(TITLE);
    });

    describe('Rendering the Icon', () => {
      it('should render the icon correctly when the theme is "dark"', () => {
        const component = render(
          renderTabNavigatorItem({ isSelected, theme: dark }),
        );
        expect(
          component
            .getByTestId('icon-home-active')
            .props.xml.includes(`fill=\"${dark.colors.primary}\"`),
        ).toEqual(true);
      });

      it('should render the icon correctly when the theme is "light"', () => {
        const component = render(
          renderTabNavigatorItem({ isSelected, theme: light }),
        );
        expect(
          component
            .getByTestId('icon-home-active')
            .props.xml.includes(`fill=\"${light.colors.text}\"`),
        ).toEqual(true);
      });
    });

    it('should call "onPress" when "press" the "button"', () => {
      const onPress = jest.fn();
      const component = render(renderTabNavigatorItem({ isSelected, onPress }));
      expect(onPress).toBeCalledTimes(0);
      fireEvent.press(elements.button(component));
      expect(onPress).toBeCalledTimes(1);
    });
  });

  describe('When it is "not selected"', () => {
    const isSelected = false;

    it('should render all components correctly', () => {
      const component = render(renderTabNavigatorItem({ isSelected }));
      expect(component.queryByTestId('icon-home-inactive')).not.toBeNull();
      expect(elements.button(component)).not.toBeNull();
      expect(elements.text(component)).not.toBeNull();
      expect(elements.text(component).children[0]).toEqual(TITLE);
    });

    describe('Rendering the Icon', () => {
      it('should render the icon correctly when the theme is "dark"', () => {
        const component = render(
          renderTabNavigatorItem({ isSelected, theme: dark }),
        );
        expect(
          component
            .getByTestId('icon-home-inactive')
            .props.xml.includes(`fill=\"${dark.colors.inactiveWhite}\"`),
        ).toEqual(true);
      });

      it('should render the icon correctly when the theme is "light"', () => {
        const component = render(
          renderTabNavigatorItem({ isSelected, theme: light }),
        );
        expect(
          component
            .getByTestId('icon-home-inactive')
            .props.xml.includes(`fill=\"${light.colors.inactiveWhite}\"`),
        ).toEqual(true);
      });
    });

    it('should call "onPress" when "press" the "button"', () => {
      const onPress = jest.fn();
      const component = render(renderTabNavigatorItem({ isSelected, onPress }));
      expect(onPress).toBeCalledTimes(0);
      fireEvent.press(elements.button(component));
      expect(onPress).toBeCalledTimes(1);
    });
  });

  it('should render all components correctly when rerenders', () => {
    // active
    const component = render(renderTabNavigatorItem({ isSelected: true }));
    expect(component.queryByTestId('icon-home-active')).not.toBeNull();
    expect(component.queryByTestId('icon-home-inactive')).toBeNull();
    expect(elements.button(component)).not.toBeNull();
    expect(elements.text(component)).not.toBeNull();
    expect(elements.text(component).children[0]).toEqual(TITLE);
    // inactive
    component.rerender(renderTabNavigatorItem({ isSelected: false }));
    expect(component.queryByTestId('icon-home-active')).toBeNull();
    expect(component.queryByTestId('icon-home-inactive')).not.toBeNull();
    expect(elements.button(component)).not.toBeNull();
    expect(elements.text(component)).not.toBeNull();
    expect(elements.text(component).children[0]).toEqual(TITLE);
  });
});
