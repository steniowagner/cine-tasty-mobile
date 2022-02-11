import React from 'react';
import {Alert} from 'react-native';
import {
  cleanup,
  fireEvent,
  render,
  RenderAPI,
} from '@testing-library/react-native';

import MockedNavigation from '@mocks/MockedNavigator';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {INITIAL_NUMBER_QUESTIONS} from './useSetupQuestions';
import {difficulties, categories, types} from './options';
import SetupQuestions from './SetupQuestions';

jest.spyOn(Alert, 'alert');

let mockLanguage;

jest.mock('@hooks', () => {
  const hooksModule = jest.requireActual('@hooks');
  return {
    ...hooksModule,
    useTranslations: () => ({
      translate: (key: string) => key,
      language: mockLanguage,
    }),
  };
});

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
    roundedButton: (api: RenderAPI) => api.queryByTestId('rounded-button'),
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
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(cleanup);

  describe('Render', () => {
    it('should render correctly with the default params', () => {
      const component = render(renderSetupQuestions());
      expect(elements.dropdownDifficultyButton(component)).not.toBeNull();
      expect(elements.dropdownDifficultyText(component)).not.toBeNull();
      expect(elements.dropdownDifficultyText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_DIFFICULTY_MIXED,
      );
      expect(elements.dropdownCategoryButton(component)).not.toBeNull();
      expect(elements.dropdownCategoryText(component)).not.toBeNull();
      expect(elements.dropdownCategoryText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_CATEGORY_MIXED,
      );
      expect(elements.dropdownTypeButton(component)).not.toBeNull();
      expect(elements.dropdownTypeText(component)).not.toBeNull();
      expect(elements.dropdownTypeText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_TYPE_MIXED,
      );
    });
  });

  describe('Dropdown options', () => {
    it('should open the "difficulties-options-list" correctly when the user press the "difficulty-dropdown"', () => {
      const navigate = jest.fn();
      const component = render(renderSetupQuestions(navigate));
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.dropdownDifficultyButton(component));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(typeof navigate.mock.calls[0][1].extraData.onPressSelect).toEqual(
        'function',
      );
      expect(navigate.mock.calls[0][1].extraData.dataset).toEqual(difficulties);
      expect(navigate.mock.calls[0][1].extraData.lastItemSelected).toEqual(0);
      expect(navigate.mock.calls[0][1].type).toEqual(
        Types.CustomizedModalChildrenType.MEDIA_FILTER,
      );
      expect(navigate.mock.calls[0][1].headerText).toEqual(
        Translations.Tags.QUIZ_SET_DIFFICULTY,
      );
      expect(navigate.mock.calls[0][0]).toEqual(
        Routes.CustomModal.CUSTOM_MODAL_STACK,
      );
    });

    it('should open the "categories-options-list" correctly when the user press the "category-dropdown"', () => {
      const navigate = jest.fn();
      const component = render(renderSetupQuestions(navigate));
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.dropdownCategoryButton(component));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(typeof navigate.mock.calls[0][1].extraData.onPressSelect).toEqual(
        'function',
      );
      expect(navigate.mock.calls[0][1].extraData.dataset).toEqual(categories);
      expect(navigate.mock.calls[0][1].extraData.lastItemSelected).toEqual(0);
      expect(navigate.mock.calls[0][1].type).toEqual(
        Types.CustomizedModalChildrenType.MEDIA_FILTER,
      );
      expect(navigate.mock.calls[0][1].headerText).toEqual(
        Translations.Tags.QUIZ_SET_CATEGORY,
      );
      expect(navigate.mock.calls[0][0]).toEqual(
        Routes.CustomModal.CUSTOM_MODAL_STACK,
      );
    });

    it('should open the "type-options-list" correctly when the user press the "type-dropdown"', () => {
      const navigate = jest.fn();
      const component = render(renderSetupQuestions(navigate));
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.dropdownTypeButton(component));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(typeof navigate.mock.calls[0][1].extraData.onPressSelect).toEqual(
        'function',
      );
      expect(navigate.mock.calls[0][1].extraData.dataset).toEqual(types);
      expect(navigate.mock.calls[0][1].extraData.lastItemSelected).toEqual(0);
      expect(navigate.mock.calls[0][1].type).toEqual(
        Types.CustomizedModalChildrenType.MEDIA_FILTER,
      );
      expect(navigate.mock.calls[0][1].headerText).toEqual(
        Translations.Tags.QUIZ_SET_TYPE,
      );
      expect(navigate.mock.calls[0][0]).toEqual(
        Routes.CustomModal.CUSTOM_MODAL_STACK,
      );
    });
  });

  describe('Block navigate to the "Questions" screen depending on the App-language', () => {
    it('should navigate to "Questions" when the language is "English', () => {
      const navigate = jest.fn();
      mockLanguage = SchemaTypes.ISO6391Language.EN;
      const component = render(renderSetupQuestions(navigate));
      expect(Alert.alert).toHaveBeenCalledTimes(0);
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.roundedButton(component));
      expect(Alert.alert).toHaveBeenCalledTimes(0);
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toBeCalledWith(Routes.Quiz.QUESTIONS, {
        numberOfQuestions: INITIAL_NUMBER_QUESTIONS,
        difficulty: difficulties[0].value,
        category: categories[0].value,
        type: types[0].value,
      });
    });

    it('should not navigate to "Questions" when the language is "Brazilian Portuguese"', () => {
      const navigate = jest.fn();
      mockLanguage = SchemaTypes.ISO6391Language.PTBR;
      const component = render(renderSetupQuestions(navigate));
      expect(Alert.alert).toHaveBeenCalledTimes(0);
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.roundedButton(component));
      expect(Alert.alert).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledTimes(0);
    });

    it('should not navigate to "Questions" when the language is "Portuguese"', () => {
      const navigate = jest.fn();
      mockLanguage = SchemaTypes.ISO6391Language.PT;
      const component = render(renderSetupQuestions(navigate));
      expect(Alert.alert).toHaveBeenCalledTimes(0);
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.roundedButton(component));
      expect(Alert.alert).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledTimes(0);
    });

    it('should not navigate to "Questions" when the language is "Spanish"', () => {
      const navigate = jest.fn();
      mockLanguage = SchemaTypes.ISO6391Language.ES;
      const component = render(renderSetupQuestions(navigate));
      expect(Alert.alert).toHaveBeenCalledTimes(0);
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.roundedButton(component));
      expect(Alert.alert).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledTimes(0);
    });
  });

  describe('Showing Language-alert', () => {
    it('should not call the "Alert.alert" when the language is "English"', () => {
      mockLanguage = SchemaTypes.ISO6391Language.EN;
      const component = render(renderSetupQuestions());
      fireEvent.press(elements.roundedButton(component));
      expect(Alert.alert).toHaveBeenCalledTimes(0);
    });

    it('should call the "Alert.alert" with the correct params when the language is "Brazilian Portuguese"', () => {
      mockLanguage = SchemaTypes.ISO6391Language.PTBR;
      const component = render(renderSetupQuestions());
      fireEvent.press(elements.roundedButton(component));
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

    it('should call the "Alert.alert" with the correct params when the language is "Portuguese"', () => {
      mockLanguage = SchemaTypes.ISO6391Language.PT;
      const component = render(renderSetupQuestions());
      fireEvent.press(elements.roundedButton(component));
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

    it('should call the "Alert.alert" with the correct params when the language is "Spanish"', () => {
      mockLanguage = SchemaTypes.ISO6391Language.ES;
      const component = render(renderSetupQuestions());
      fireEvent.press(elements.roundedButton(component));
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
