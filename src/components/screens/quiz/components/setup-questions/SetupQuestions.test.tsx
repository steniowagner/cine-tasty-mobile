import React from 'react';
import {Alert} from 'react-native';
import {
  cleanup,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';

import MockedNavigation from '@mocks/MockedNavigator';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';
import {randomPositiveNumber} from '@mocks/utils';
import * as SchemaTypes from '@schema-types';

import {
  SLIDER_MAX_VALUE,
  SLIDER_MIN_VALUE,
} from './components/number-of-questions/useNumberOfQuestions';
import * as options from './hooks/make-selectable-options-datasets/options';
import {SetupQuestions} from './SetupQuestions';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.spyOn(Alert, 'alert');

let mockLanguage;

jest.mock('@hooks', () => ({
  useShowLanguageAlert: jest.requireActual('@hooks').useShowLanguageAlert,
  useTranslations: () => ({
    translate: (key: string) => key,
    language: mockLanguage,
  }),
}));

type Elements = Record<string, any>;

type HandleSelectOptionParams = {
  elements: Elements;
  component: RenderAPI;
  section: Types.QuizOption;
  indexOptionSelected: number;
};

const handleSelectOption = async (params: HandleSelectOptionParams) => {
  let dropdownButton: any;
  let dropdownText: any;
  let dropdownTextContent = '';
  switch (params.section) {
    case 'difficulty':
      dropdownButton = params.elements.dropdownDifficultyButton;
      dropdownTextContent = `${Translations.Tags.QUIZ_DIFFICULTY}_${
        options.difficulties[params.indexOptionSelected].id
      }`;
      dropdownText = params.elements.dropdownDifficultyText;
      break;
    case 'category':
      dropdownButton = params.elements.dropdownCategoryButton;
      dropdownTextContent = `${Translations.Tags.QUIZ_CATEGORY}_${
        options.categories[params.indexOptionSelected].id
      }`;
      dropdownText = params.elements.dropdownCategoryText;
      break;
    case 'type':
      dropdownButton = params.elements.dropdownTypeButton;
      dropdownTextContent = `${Translations.Tags.QUIZ_TYPE}_${
        options.types[params.indexOptionSelected].id
      }`;
      dropdownText = params.elements.dropdownTypeText;
      break;
  }
  fireEvent.press(dropdownButton(params.component));
  fireEvent.press(
    params.elements.optionListItemsButtons(params.component)[
      params.indexOptionSelected
    ],
  );
  fireEvent.press(params.elements.modalSelectButton(params.component));
  await waitFor(() => {
    expect(dropdownText(params.component).children[0]).toEqual(
      dropdownTextContent,
    );
  });
};

const renderSetupQuestions = (navigate = jest.fn) => {
  const SetupQuestionsComponent = ({navigation}) => (
    <SetupQuestions
      navigation={{
        ...navigation,
        navigate,
      }}
      route={{
        name: Routes.Quiz.SETUP_QUESTIONS,
        key: `${Routes.Quiz.SETUP_QUESTIONS}-key`,
      }}
    />
  );
  return <MockedNavigation component={SetupQuestionsComponent} />;
};

describe('<SetupQuestions />', () => {
  const elements = {
    startQuizButton: (api: RenderAPI) => api.queryByTestId('rounded-button'),
    startQuizButtonText: (api: RenderAPI) =>
      api.queryByTestId('rounded-button-text'),
    dropdownDifficultyButton: (api: RenderAPI) =>
      api.queryByTestId('dropdown-button-difficulty'),
    dropdownDifficultyText: (api: RenderAPI) =>
      api.queryByTestId('dropdown-value-difficulty'),
    dropdownCategoryButton: (api: RenderAPI) =>
      api.queryByTestId('dropdown-button-category'),
    dropdownCategoryText: (api: RenderAPI) =>
      api.queryByTestId('dropdown-value-category'),
    dropdownTypeButton: (api: RenderAPI) =>
      api.queryByTestId('dropdown-button-type'),
    dropdownTypeText: (api: RenderAPI) =>
      api.queryByTestId('dropdown-value-type'),
    slider: (api: RenderAPI) => api.queryByTestId('slider'),
    modalSheet: (api: RenderAPI) => api.queryByTestId('modal-sheet'),
    optionsList: (api: RenderAPI) => api.queryByTestId('options-list'),
    optionListItemsButtons: (api: RenderAPI) =>
      api.queryAllByTestId('option-list-item-button'),
    optionListItemsText: (api: RenderAPI) =>
      api.queryAllByTestId('option-list-item-text'),
    modalSelectButton: (api: RenderAPI) => api.queryByTestId('select-button'),
    modalSelectButtonText: (api: RenderAPI) =>
      api.queryByTestId('select-button-text'),
    sectionTitles: (api: RenderAPI) => api.queryAllByTestId('section-title'),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(cleanup);

  describe('Rendering the components', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should render all components correctly', () => {
      const component = render(renderSetupQuestions());
      expect(elements.dropdownDifficultyButton(component)).not.toBeNull();
      expect(elements.dropdownDifficultyText(component)).not.toBeNull();
      expect(elements.dropdownCategoryButton(component)).not.toBeNull();
      expect(elements.dropdownCategoryText(component)).not.toBeNull();
      expect(elements.dropdownTypeButton(component)).not.toBeNull();
      expect(elements.dropdownTypeText(component)).not.toBeNull();
      expect(elements.startQuizButton(component)).not.toBeNull();
      expect(elements.slider(component)).not.toBeNull();
      expect(elements.startQuizButton(component)).not.toBeNull();
      expect(elements.modalSheet(component)).not.toBeNull();
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.optionsList(component).children.length).toEqual(0);
    });

    describe('Sections titles', () => {
      it('should render the "Difficulty" section-title correctly', () => {
        const component = render(renderSetupQuestions());
        expect(elements.sectionTitles(component)[0].children[0]).toEqual(
          Translations.Tags.QUIZ_DIFFICULTY,
        );
      });

      it('should render the "Category" section-title correctly', () => {
        const component = render(renderSetupQuestions());
        expect(elements.sectionTitles(component)[1].children[0]).toEqual(
          Translations.Tags.QUIZ_CATEGORY,
        );
      });

      it('should render the "Type" section-title correctly', () => {
        const component = render(renderSetupQuestions());
        expect(elements.sectionTitles(component)[2].children[0]).toEqual(
          Translations.Tags.QUIZ_TYPE,
        );
      });

      it('should render the "Number of questions" section-title correctly', () => {
        const component = render(renderSetupQuestions());
        expect(elements.sectionTitles(component)[3].children[0]).toEqual(
          Translations.Tags.QUIZ_NUMBER_OF_QUESTIONS,
        );
      });

      it('should render the "START QUIZ" button-title correctly', () => {
        const component = render(renderSetupQuestions());
        expect(elements.startQuizButtonText(component).children[0]).toEqual(
          Translations.Tags.QUIZ_START_BUTTON,
        );
      });
    });
  });

  describe('Questions-Options sections', () => {
    describe('Difficulty', () => {
      const i18nSection = Translations.Tags.QUIZ_DIFFICULTY;
      const dataset = options.difficulties;

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "MIXED" value as the selected option by default', () => {
        const component = render(renderSetupQuestions());
        expect(elements.dropdownDifficultyText(component).children[0]).toEqual(
          `${i18nSection}_${dataset[0].id}`,
        );
      });

      it('should open the "ModalSheet" when the user clicks on the "option-button"', () => {
        const component = render(renderSetupQuestions());
        expect(elements.modalSheet(component).props.visible).toEqual(false);
        fireEvent.press(elements.dropdownDifficultyButton(component));
        expect(elements.modalSheet(component).props.visible).toEqual(true);
      });

      it('should change the "option-text" correctly when the user choose some option from the "ModalSheet"', async () => {
        const modalSheetIndexOptionSelected = randomPositiveNumber(
          dataset.length - 1,
        );
        const component = render(renderSetupQuestions());
        await handleSelectOption({
          indexOptionSelected: modalSheetIndexOptionSelected,
          section: 'difficulty',
          elements,
          component,
        });
      });
    });

    describe('Category', () => {
      const i18nSection = Translations.Tags.QUIZ_CATEGORY;
      const dataset = options.categories;

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "MIXED" value as the selected option by default', () => {
        const component = render(renderSetupQuestions());
        expect(elements.dropdownCategoryText(component).children[0]).toEqual(
          `${i18nSection}_${dataset[0].id}`,
        );
      });

      it('should open the "ModalSheet" when the user clicks on the "option-button"', () => {
        const component = render(renderSetupQuestions());
        expect(elements.modalSheet(component).props.visible).toEqual(false);
        fireEvent.press(elements.dropdownCategoryButton(component));
        expect(elements.modalSheet(component).props.visible).toEqual(true);
      });

      it('should change the "option-text" correctly when the user choose some option from the "ModalSheet"', async () => {
        const modalSheetIndexOptionSelected = randomPositiveNumber(
          dataset.length - 1,
        );
        const component = render(renderSetupQuestions());
        await handleSelectOption({
          indexOptionSelected: modalSheetIndexOptionSelected,
          section: 'category',
          elements,
          component,
        });
      });
    });

    describe('Type', () => {
      const i18nSection = Translations.Tags.QUIZ_TYPE;
      const dataset = options.types;

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "MIXED" value as the selected option by default', () => {
        const component = render(renderSetupQuestions());
        expect(elements.dropdownTypeText(component).children[0]).toEqual(
          `${i18nSection}_${dataset[0].id}`,
        );
      });

      it('should open the "ModalSheet" when the user clicks on the "option-button"', () => {
        const component = render(renderSetupQuestions());
        expect(elements.modalSheet(component).props.visible).toEqual(false);
        fireEvent.press(elements.dropdownTypeButton(component));
        expect(elements.modalSheet(component).props.visible).toEqual(true);
      });

      it('should change the "option-text" correctly when the user choose some option from the "ModalSheet"', async () => {
        const modalSheetIndexOptionSelected = randomPositiveNumber(
          dataset.length - 1,
        );
        const component = render(renderSetupQuestions());
        await handleSelectOption({
          indexOptionSelected: modalSheetIndexOptionSelected,
          section: 'type',
          elements,
          component,
        });
      });
    });
  });

  describe('Setting up the Questions', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should navigate to the "Quiz" screen correctly', async () => {
      mockLanguage = SchemaTypes.ISO6391Language.EN;
      const navigate = jest.fn();
      const component = render(renderSetupQuestions(navigate));
      const indexDifficultySelected = randomPositiveNumber(
        options.difficulties.length - 1,
      );
      const indexCategorySelected = randomPositiveNumber(
        options.categories.length - 1,
      );
      const indexTypeSelected = randomPositiveNumber(options.types.length - 1);
      const numberOfQuestionsSelected = randomPositiveNumber(
        SLIDER_MAX_VALUE,
        SLIDER_MIN_VALUE,
      );
      await handleSelectOption({
        indexOptionSelected: indexDifficultySelected,
        section: 'difficulty',
        elements,
        component,
      });
      await handleSelectOption({
        indexOptionSelected: indexCategorySelected,
        section: 'category',
        elements,
        component,
      });
      await handleSelectOption({
        indexOptionSelected: indexTypeSelected,
        section: 'type',
        elements,
        component,
      });
      fireEvent(
        elements.slider(component),
        'onValueChange',
        numberOfQuestionsSelected,
      );
      fireEvent.press(elements.startQuizButton(component));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(Routes.Quiz.QUESTIONS, {
        difficulty: options.difficulties[indexDifficultySelected].value,
        category: options.categories[indexCategorySelected].value,
        type: options.types[indexTypeSelected].value,
        numberOfQuestions: numberOfQuestionsSelected,
      });
    });
  });

  describe('Showing the language alert', () => {
    describe('When the "language" used is "English"', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should not call "Alert.alert" and call the "navigate" when the user press the "START QUIZ" button', () => {
        mockLanguage = SchemaTypes.ISO6391Language.EN;
        const navigate = jest.fn();
        const component = render(renderSetupQuestions(navigate));
        fireEvent.press(elements.startQuizButton(component));
        expect(Alert.alert).toHaveBeenCalledTimes(0);
        expect(navigate).toHaveBeenCalledTimes(1);
      });
    });

    describe('When the "language" used is "Portuguese"', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should call the "Alert.alert" and not call the "navigate " when the user presses the "START QUIZ" button', () => {
        mockLanguage = SchemaTypes.ISO6391Language.PTBR;
        const navigate = jest.fn();
        const component = render(renderSetupQuestions(navigate));
        fireEvent.press(elements.startQuizButton(component));
        expect(Alert.alert).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledTimes(0);
      });

      it('should call the "Alert.alert" with the correct params when the "language" is "Portuguese" and the user presses the "START QUIZ" button', () => {
        mockLanguage = SchemaTypes.ISO6391Language.PTBR;
        const component = render(renderSetupQuestions());
        fireEvent.press(elements.startQuizButton(component));
        expect(Alert.alert).toHaveBeenCalledTimes(1);
        expect((Alert.alert as jest.Mock).mock.calls[0][0]).toEqual(
          Translations.Tags.LANGUAGE_WARNING_QUIZ_TITLE,
        );
        expect((Alert.alert as jest.Mock).mock.calls[0][1]).toEqual(
          Translations.Tags.LANGUAGE_WARNING_QUIZ_DESCRIPTION,
        );
        expect((Alert.alert as jest.Mock).mock.calls[0][2][0].text).toEqual(
          Translations.Tags.LANGUAGE_WARNING_QUIZ_NEGATIVE_ACTION,
        );
        expect((Alert.alert as jest.Mock).mock.calls[0][2][0].style).toEqual(
          'cancel',
        );
        expect((Alert.alert as jest.Mock).mock.calls[0][2][1].text).toEqual(
          Translations.Tags.LANGUAGE_WARNING_QUIZ_POSITIVE_ACTION,
        );
        expect((Alert.alert as jest.Mock).mock.calls[0][3].cancelable).toEqual(
          false,
        );
      });
    });

    describe('When the "language" used is "Spanish"', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should call the "Alert.alert" when the user press the "START QUIZ" button', () => {
        mockLanguage = SchemaTypes.ISO6391Language.ES;
        const navigate = jest.fn();
        const component = render(renderSetupQuestions(navigate));
        fireEvent.press(elements.startQuizButton(component));
        expect(Alert.alert).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledTimes(0);
      });

      it('should call the "Alert.alert" with the correct params when the language is "Spanish"', () => {
        mockLanguage = SchemaTypes.ISO6391Language.ES;
        const component = render(renderSetupQuestions());
        fireEvent.press(elements.startQuizButton(component));
        expect(Alert.alert).toHaveBeenCalledTimes(1);
        expect((Alert.alert as jest.Mock).mock.calls[0][0]).toEqual(
          Translations.Tags.LANGUAGE_WARNING_QUIZ_TITLE,
        );
        expect((Alert.alert as jest.Mock).mock.calls[0][1]).toEqual(
          Translations.Tags.LANGUAGE_WARNING_QUIZ_DESCRIPTION,
        );
        expect((Alert.alert as jest.Mock).mock.calls[0][2][0].text).toEqual(
          Translations.Tags.LANGUAGE_WARNING_QUIZ_NEGATIVE_ACTION,
        );
        expect((Alert.alert as jest.Mock).mock.calls[0][2][0].style).toEqual(
          'cancel',
        );
        expect((Alert.alert as jest.Mock).mock.calls[0][2][1].text).toEqual(
          Translations.Tags.LANGUAGE_WARNING_QUIZ_POSITIVE_ACTION,
        );
        expect((Alert.alert as jest.Mock).mock.calls[0][3].cancelable).toEqual(
          false,
        );
      });
    });
  });
});
