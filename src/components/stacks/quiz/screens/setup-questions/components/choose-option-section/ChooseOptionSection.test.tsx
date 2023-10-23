import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';

import { dark as theme } from '@styles/themes';

import { SetupQuestionsOptions } from '../../use-setup-questions/use-setup-questions';
import { ChooseOptionSection } from './ChooseOptionSection';

const sections: SetupQuestionsOptions[] = ['category', 'difficulty', 'type'];
const DEFAULT_SELECTED_OPTION = 'DEFAULT_SELECTED_OPTION';
const DEFAULT_TITLE = 'DEFAULT_TITLE';

const renderChooseOptionSection = (
  section: SetupQuestionsOptions,
  onPressOption = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <ChooseOptionSection
      selectedOption={DEFAULT_SELECTED_OPTION}
      onPressOption={onPressOption}
      section={section}
      title={DEFAULT_TITLE}
    />
  </ThemeProvider>
);

describe('Screens/Quiz/SetupQuestions/ChooseOptionSection', () => {
  const elements = {
    title: (api: RenderAPI) => api.getByTestId('section-title'),
    icon: (api: RenderAPI) => api.getByTestId('icon-chevron-down-box'),
  };

  describe('Rendering', () => {
    it('should render correctly', () => {
      const section: SetupQuestionsOptions = 'category';
      const component = render(renderChooseOptionSection(section));
      expect(elements.title(component)).not.toBeNull();
      expect(component.getByTestId(`dropdown-button-${section}`));
      expect(component.getByTestId(`dropdown-value-${section}`));
      expect(elements.icon(component)).not.toBeNull();
    });

    it('should render the "title" correctly', () => {
      const component = render(renderChooseOptionSection('category'));
      expect(elements.title(component).children[0]).toEqual(DEFAULT_TITLE);
    });

    it('should render the "selected-option" correctly', () => {
      const section: SetupQuestionsOptions = 'category';
      const component = render(renderChooseOptionSection(section));
      expect(
        component.getByTestId(`dropdown-value-${section}`).children[0],
      ).toEqual(DEFAULT_SELECTED_OPTION);
    });
  });

  describe('Pressing', () => {
    test.each(sections)(
      'should call "onPressOption" correctly when pressed and the section selected is %p',
      section => {
        const onPress = jest.fn();
        const component = render(renderChooseOptionSection(section, onPress));
        expect(onPress).toBeCalledTimes(0);
        fireEvent.press(component.getByTestId(`dropdown-button-${section}`));
        expect(onPress).toBeCalledTimes(1);
        expect(onPress).toBeCalledWith(section);
      },
    );
  });
});
