import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { dark as theme } from '@styles/themes';
import { Translations } from '@/i18n/tags';

import {
  MockedNavigator,
  randomPositiveNumber,
} from '../../../../../../__mocks__';
import { SetupQuestionsProps } from '../../routes/route-params-types';
import { SetupQuestions } from './SetupQuesionts';
import * as options from './use-setup-questions/options';
import {
  SLIDER_MAX_VALUE,
  SLIDER_MIN_VALUE,
} from './components/number-of-questions/use-number-of-questions';
import { Routes } from '@/navigation';

const renderSetupQuestions = (navigate = jest.fn()) => {
  const SetupQuestionsComponent = (props: SetupQuestionsProps) => (
    <ThemeProvider theme={theme}>
      <SetupQuestions
        {...props}
        navigation={{ ...props.navigation, navigate }}
      />
    </ThemeProvider>
  );
  return <MockedNavigator component={SetupQuestionsComponent} />;
};

describe('Stacks/Quiz/Screens/SetupQuestions', () => {
  const elements = {
    sections: (api: RenderAPI) => api.getAllByTestId('section-wrapper'),
    sectionTitles: (api: RenderAPI) => api.getAllByTestId('section-title'),
    sectionButtons: (api: RenderAPI) => api.getAllByTestId(/dropdown-button-/),
    sectionOptionSelected: (api: RenderAPI) =>
      api.getAllByTestId(/dropdown-value-/),
    numberOfQuestionsSlider: (api: RenderAPI) => api.getByTestId('slider'),
    startQuizButton: (api: RenderAPI) => api.getByTestId('rounded-button'),
    startQuizButtonText: (api: RenderAPI) =>
      api.getByTestId('rounded-button-text'),
    modal: (component: RenderAPI) => component.queryByTestId('modal-sheet'),
    modalCta: (component: RenderAPI) =>
      component.queryByTestId('select-button'),
    modalCtaTitle: (component: RenderAPI) =>
      component.queryByTestId('select-button-text'),
    modalTitle: (component: RenderAPI) =>
      component.queryByTestId('modal-sheet-title'),
    modalOptionsTexts: (component: RenderAPI) =>
      component.queryAllByTestId('option-list-item-text'),
    modalOptionsButtons: (component: RenderAPI) =>
      component.queryAllByTestId('option-list-item-button'),
  };

  describe('Rendering', () => {
    describe('Sections', () => {
      it('should render the correct number of sections', () => {
        const component = render(renderSetupQuestions());
        expect(elements.sections(component).length).toEqual(4);
      });

      it('should render the sections in the correct order', () => {
        const component = render(renderSetupQuestions());
        expect(elements.sectionTitles(component)[0].children[0]).toEqual(
          Translations.Quiz.QUIZ_DIFFICULTY,
        );
        expect(elements.sectionTitles(component)[1].children[0]).toEqual(
          Translations.Quiz.QUIZ_CATEGORY,
        );
        expect(elements.sectionTitles(component)[2].children[0]).toEqual(
          Translations.Quiz.QUIZ_TYPE,
        );
        expect(elements.sectionTitles(component)[3].children[0]).toEqual(
          Translations.Quiz.QUIZ_NUMBER_OF_QUESTIONS,
        );
      });

      it('should render the "default-options-selected" correctly', () => {
        const component = render(renderSetupQuestions());
        expect(
          elements.sectionOptionSelected(component)[0].children[0],
        ).toEqual(Translations.Quiz.QUIZ_DIFFICULTY_MIXED);
        expect(
          elements.sectionOptionSelected(component)[1].children[0],
        ).toEqual(Translations.Quiz.QUIZ_CATEGORY_MIXED);
        expect(
          elements.sectionOptionSelected(component)[2].children[0],
        ).toEqual(Translations.Quiz.QUIZ_TYPE_MIXED);
      });
    });

    it('should render the "start-quiz-button-title" correctly', () => {
      const component = render(renderSetupQuestions());
      expect(elements.startQuizButtonText(component).children[0]).toEqual(
        Translations.Quiz.QUIZ_START_BUTTON,
      );
    });

    describe('Modal', () => {
      it('should render the "modal-cta-title" correctly', async () => {
        const component = render(renderSetupQuestions());
        fireEvent.press(elements.sectionButtons(component)[0]);
        await waitFor(() => {
          expect(elements.modal(component)!.props.visible).toEqual(true);
        });
        expect(elements.modalCtaTitle(component)!.children[0]).toEqual(
          Translations.Quiz.QUIZ_MODAL_SELECT_TEXT,
        );
      });

      describe('When selecting "Difficulty"', () => {
        it('should show the "modal-title" correctly', async () => {
          const component = render(renderSetupQuestions());
          fireEvent.press(elements.sectionButtons(component)[0]);
          await waitFor(() => {
            expect(elements.modal(component)!.props.visible).toEqual(true);
          });
          expect(elements.modalTitle(component)?.children[0]).toEqual(
            Translations.Quiz.QUIZ_SET_DIFFICULTY,
          );
        });

        it('should show the "options" correctly', async () => {
          const component = render(renderSetupQuestions());
          fireEvent.press(elements.sectionButtons(component)[0]);
          await waitFor(() => {
            expect(elements.modal(component)!.props.visible).toEqual(true);
          });
          for (let i = 0; i < options.difficulties.length; i++) {
            expect(
              elements.modalOptionsTexts(component)[i].children[0],
            ).toEqual(options.difficulties[i].translationTag);
          }
        });
      });

      describe('When selecting "Category"', () => {
        it('should show the "modal-title" correctly', async () => {
          const component = render(renderSetupQuestions());
          fireEvent.press(elements.sectionButtons(component)[1]);
          await waitFor(() => {
            expect(elements.modal(component)!.props.visible).toEqual(true);
          });
          expect(elements.modalTitle(component)?.children[0]).toEqual(
            Translations.Quiz.QUIZ_SET_CATEGORY,
          );
        });

        it('should show the "options" correctly', async () => {
          const component = render(renderSetupQuestions());
          fireEvent.press(elements.sectionButtons(component)[1]);
          await waitFor(() => {
            expect(elements.modal(component)!.props.visible).toEqual(true);
          });
          for (let i = 0; i < options.categories.length; i++) {
            expect(
              elements.modalOptionsTexts(component)[i].children[0],
            ).toEqual(options.categories[i].translationTag);
          }
        });
      });

      describe('When selecting "Type"', () => {
        it('should show the "modal-title" correctly', async () => {
          const component = render(renderSetupQuestions());
          fireEvent.press(elements.sectionButtons(component)[2]);
          await waitFor(() => {
            expect(elements.modal(component)!.props.visible).toEqual(true);
          });
          expect(elements.modalTitle(component)?.children[0]).toEqual(
            Translations.Quiz.QUIZ_SET_TYPE,
          );
        });

        it('should show the "options" correctly', async () => {
          const component = render(renderSetupQuestions());
          fireEvent.press(elements.sectionButtons(component)[2]);
          await waitFor(() => {
            expect(elements.modal(component)!.props.visible).toEqual(true);
          });
          for (let i = 0; i < options.types.length; i++) {
            expect(
              elements.modalOptionsTexts(component)[i].children[0],
            ).toEqual(options.types[i].translationTag);
          }
        });
      });
    });

    describe('Selecting options', () => {
      it('should call "navigation.navigate" correctly when press "start-quiz"', async () => {
        const navigate = jest.fn();
        const component = render(renderSetupQuestions(navigate));
        const indexDifficultySelected = randomPositiveNumber(
          options.difficulties.length - 1,
        );
        const indexCategorySelected = randomPositiveNumber(
          options.categories.length - 1,
        );
        const indexTypeSelected = randomPositiveNumber(
          options.types.length - 1,
        );
        const numberOfQuestions = randomPositiveNumber(
          SLIDER_MAX_VALUE,
          SLIDER_MIN_VALUE,
        );
        // Selecting "difficulty"
        fireEvent.press(elements.sectionButtons(component)[0]);
        await waitFor(() => {
          expect(elements.modal(component)!.props.visible).toEqual(true);
        });
        act(() => {
          fireEvent.press(
            elements.modalOptionsButtons(component)[indexDifficultySelected],
          );
        });
        act(() => {
          fireEvent.press(elements.modalCta(component)!);
        });
        await waitFor(() => {
          expect(elements.modal(component)!.props.visible).toEqual(false);
        });
        // Selecting "Category"
        fireEvent.press(elements.sectionButtons(component)[1]);
        await waitFor(() => {
          expect(elements.modal(component)!.props.visible).toEqual(true);
        });
        act(() => {
          fireEvent.press(
            elements.modalOptionsButtons(component)[indexCategorySelected],
          );
        });
        act(() => {
          fireEvent.press(elements.modalCta(component)!);
        });
        await waitFor(() => {
          expect(elements.modal(component)!.props.visible).toEqual(false);
        });
        // Selecting "Type"
        fireEvent.press(elements.sectionButtons(component)[2]);
        await waitFor(() => {
          expect(elements.modal(component)!.props.visible).toEqual(true);
        });
        act(() => {
          fireEvent.press(
            elements.modalOptionsButtons(component)[indexTypeSelected],
          );
        });
        act(() => {
          fireEvent.press(elements.modalCta(component)!);
        });
        await waitFor(() => {
          expect(elements.modal(component)!.props.visible).toEqual(false);
        });
        fireEvent(
          elements.numberOfQuestionsSlider(component),
          'onValueChange',
          numberOfQuestions,
        );
        expect(navigate).toBeCalledTimes(0);
        act(() => {
          fireEvent.press(elements.startQuizButton(component));
        });
        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toBeCalledWith(Routes.Quiz.QUESTIONS, {
          numberOfQuestions,
          category: options.categories[indexCategorySelected].value,
          difficulty: options.difficulties[indexDifficultySelected].value,
          type: options.types[indexTypeSelected].value,
        });
      });
    });
  });
});
