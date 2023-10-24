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

import * as options from '../../use-setup-questions/options';
import {
  SetupQuestionsModal,
  SetupQuestionsModalProps,
} from './SetupQuestionModal';

const MODAL_TITLE = 'MODAL_TITLE';

const renderSetupQuestionModal = (
  props: Omit<SetupQuestionsModalProps, 'modalTitle'>,
) => (
  <ThemeProvider theme={theme}>
    <SetupQuestionsModal {...props} modalTitle={MODAL_TITLE} />
  </ThemeProvider>
);

describe('Screens/Quiz/SetupQuestions/SetupQuestionModal', () => {
  const elements = {
    modal: (component: RenderAPI) => component.queryByTestId('modal-sheet'),
    modalCTA: (component: RenderAPI) =>
      component.queryByTestId('select-button'),
    modalCTATitle: (component: RenderAPI) =>
      component.queryByTestId('select-button-text'),
    modalTitle: (component: RenderAPI) =>
      component.queryByTestId('modal-sheet-title'),
    optionButtons: (component: RenderAPI) =>
      component.queryAllByTestId('option-list-item-button'),
    optionTitles: (component: RenderAPI) =>
      component.queryAllByTestId('option-list-item-text'),
  };

  describe('Rendering', () => {
    describe('When "isOpen" is "true"', () => {
      it('should show the modal', () => {
        const component = render(
          renderSetupQuestionModal({
            options: [],
            onConfirmSelectedOption: jest.fn(),
            onClose: jest.fn(),
            isOpen: true,
          }),
        );
        expect(expect(elements.modal(component)!.props.visible).toEqual(true));
      });

      it('should render the "modal-cta" with the "correct text"', () => {
        const component = render(
          renderSetupQuestionModal({
            options: [],
            onConfirmSelectedOption: jest.fn(),
            onClose: jest.fn(),
            isOpen: true,
          }),
        );
        expect(elements.modalCTATitle(component)?.children[0]).toEqual(
          Translations.Quiz.QUIZ_MODAL_SELECT_TEXT,
        );
      });

      it('should render the "modal-title" with the "correct text"', () => {
        const component = render(
          renderSetupQuestionModal({
            options: [],
            onConfirmSelectedOption: jest.fn(),
            onClose: jest.fn(),
            isOpen: true,
          }),
        );
        expect(elements.modalTitle(component)?.children[0]).toEqual(
          MODAL_TITLE,
        );
      });

      describe('Rendering the options-texts', () => {
        describe('When the option selected is "difficulty"', () => {
          test.each(options.difficulties)(
            'should show the "options" correctly when the "difficulty" is %p',
            difficulty => {
              const indexDifficulty = options.difficulties.findIndex(
                ({ value }) => value === difficulty.value,
              );
              const component = render(
                renderSetupQuestionModal({
                  options: options.difficulties,
                  onConfirmSelectedOption: jest.fn(),
                  onClose: jest.fn(),
                  isOpen: true,
                }),
              );
              expect(
                elements.optionTitles(component)[indexDifficulty]!.children[0],
              ).toEqual(difficulty.translationTag);
            },
          );
        });

        describe('When the option selected is "category"', () => {
          test.each(options.categories)(
            'should show the "options" correctly when the "category" is %p',
            category => {
              const indexCategory = options.categories.findIndex(
                ({ value }) => value === category.value,
              );
              const component = render(
                renderSetupQuestionModal({
                  options: options.categories,
                  onConfirmSelectedOption: jest.fn(),
                  onClose: jest.fn(),
                  isOpen: true,
                }),
              );
              expect(
                elements.optionTitles(component)[indexCategory]!.children[0],
              ).toEqual(category.translationTag);
            },
          );
        });

        describe('When the option selected is "type"', () => {
          test.each(options.types)(
            'should show the "options" correctly when the "type" is %p',
            type => {
              const indexType = options.types.findIndex(
                ({ value }) => value === type.value,
              );
              const component = render(
                renderSetupQuestionModal({
                  options: options.types,
                  onConfirmSelectedOption: jest.fn(),
                  onClose: jest.fn(),
                  isOpen: true,
                }),
              );
              expect(
                elements.optionTitles(component)[indexType]!.children[0],
              ).toEqual(type.translationTag);
            },
          );
        });
      });

      describe('Rendering the option-selected', () => {
        describe('When the option selected is "difficulty"', () => {
          test.each(options.difficulties)(
            'should show the "selected-option" correctly when the "difficulty" is %p',
            difficulty => {
              const indexDifficulty = options.difficulties.findIndex(
                ({ value }) => value === difficulty.value,
              );
              const component = render(
                renderSetupQuestionModal({
                  options: options.difficulties,
                  optionSelected: difficulty.value,
                  onConfirmSelectedOption: jest.fn(),
                  onClose: jest.fn(),
                  isOpen: true,
                }),
              );
              expect(
                elements.optionButtons(component)[indexDifficulty]!.props.style
                  .backgroundColor,
              ).toEqual(theme.colors.background);
            },
          );
        });

        describe('When the option selected is "category"', () => {
          test.each(options.categories)(
            'should show the "selected-option" correctly when the "category" is %p',
            category => {
              const indexCategory = options.categories.findIndex(
                ({ value }) => value === category.value,
              );
              const component = render(
                renderSetupQuestionModal({
                  options: options.categories,
                  optionSelected: category.value,
                  onConfirmSelectedOption: jest.fn(),
                  onClose: jest.fn(),
                  isOpen: true,
                }),
              );
              expect(
                elements.optionButtons(component)[indexCategory]!.props.style
                  .backgroundColor,
              ).toEqual(theme.colors.background);
            },
          );
        });

        describe('When the option selected is "type"', () => {
          test.each(options.types)(
            'should show the "selected-option" correctly when the "type" is %p',
            type => {
              const indexType = options.types.findIndex(
                ({ value }) => value === type.value,
              );
              const component = render(
                renderSetupQuestionModal({
                  options: options.types,
                  optionSelected: type.value,
                  onConfirmSelectedOption: jest.fn(),
                  onClose: jest.fn(),
                  isOpen: true,
                }),
              );
              expect(
                elements.optionButtons(component)[indexType]!.props.style
                  .backgroundColor,
              ).toEqual(theme.colors.background);
            },
          );
        });
      });
    });

    describe('When "isOpen" is "false"', () => {
      it('should not show the modal', () => {
        const component = render(
          renderSetupQuestionModal({
            options: [],
            onConfirmSelectedOption: jest.fn(),
            onClose: jest.fn(),
            isOpen: false,
          }),
        );
        expect(expect(elements.modal(component)!.props.visible).toEqual(false));
      });
    });
  });

  describe('Selecting option', () => {
    it('should not call "onConfirmSelectedOption" when there is "no option selected" and user presses the "modal-cta"', () => {
      jest.useFakeTimers();
      const onConfirmSelectedOption = jest.fn();
      const component = render(
        renderSetupQuestionModal({
          options: options.difficulties,
          onConfirmSelectedOption,
          onClose: jest.fn(),
          isOpen: true,
        }),
      );
      expect(onConfirmSelectedOption).toBeCalledTimes(0);
      fireEvent.press(elements.modalCTA(component)!);
      act(() => {
        jest.runAllTimers();
      });
      expect(onConfirmSelectedOption).toBeCalledTimes(0);
    });

    describe('When the option to be selected is "difficulty"', () => {
      test.each(options.difficulties)(
        'should call "onConfirmSelectedOption" correctly when the "difficulty selected" is %p and the user "presses modal-cta"',
        async difficulty => {
          const onConfirmSelectedOption = jest.fn();
          const indexDifficulty = options.difficulties.findIndex(
            ({ value }) => value === difficulty.value,
          );
          const component = render(
            renderSetupQuestionModal({
              options: options.difficulties,
              onConfirmSelectedOption,
              onClose: jest.fn(),
              isOpen: true,
            }),
          );
          fireEvent.press(elements.optionButtons(component)[indexDifficulty]);
          expect(onConfirmSelectedOption).toBeCalledTimes(0);
          fireEvent.press(elements.modalCTA(component)!);
          await waitFor(() => {
            expect(onConfirmSelectedOption).toBeCalledTimes(1);
            expect(onConfirmSelectedOption).toBeCalledWith(difficulty.value);
          });
        },
      );
    });

    describe('When the option to be selected is "category"', () => {
      test.each(options.categories)(
        'should call "onConfirmSelectedOption" correctly when the "category selected" is %p and the user "presses modal-cta"',
        async category => {
          const onConfirmSelectedOption = jest.fn();
          const indexCategory = options.categories.findIndex(
            ({ value }) => value === category.value,
          );
          const component = render(
            renderSetupQuestionModal({
              options: options.categories,
              onConfirmSelectedOption,
              onClose: jest.fn(),
              isOpen: true,
            }),
          );
          fireEvent.press(elements.optionButtons(component)[indexCategory]);
          expect(onConfirmSelectedOption).toBeCalledTimes(0);
          fireEvent.press(elements.modalCTA(component)!);
          await waitFor(() => {
            expect(onConfirmSelectedOption).toBeCalledTimes(1);
            expect(onConfirmSelectedOption).toBeCalledWith(category.value);
          });
        },
      );
    });

    describe('When the option to be selected is "type"', () => {
      test.each(options.types)(
        'should call "onConfirmSelectedOption" correctly when the "type selected" is %p and the user "presses modal-cta"',
        async type => {
          const onConfirmSelectedOption = jest.fn();
          const indexType = options.types.findIndex(
            ({ value }) => value === type.value,
          );
          const component = render(
            renderSetupQuestionModal({
              options: options.types,
              onConfirmSelectedOption,
              onClose: jest.fn(),
              isOpen: true,
            }),
          );
          fireEvent.press(elements.optionButtons(component)[indexType]);
          expect(onConfirmSelectedOption).toBeCalledTimes(0);
          fireEvent.press(elements.modalCTA(component)!);
          await waitFor(() => {
            expect(onConfirmSelectedOption).toBeCalledTimes(1);
            expect(onConfirmSelectedOption).toBeCalledWith(type.value);
          });
        },
      );
    });
  });
});
