import React from 'react';
import {
  fireEvent,
  RenderAPI,
  cleanup,
  render,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {randomPositiveNumber} from '@mocks/utils';

import {SLIDER_MAX_VALUE, SLIDER_MIN_VALUE} from './useNumberOfQuestions';
import {NumberOfQuestions} from './NumberOfQuestionts';

const renderNumberOfQuestions = (
  numberOfQuestions: number,
  onSetNumberQuestions = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <NumberOfQuestions
      onSetNumberQuestions={onSetNumberQuestions}
      numberOfQuestions={numberOfQuestions}
    />
  </ThemeProvider>
);

describe('<NumberOfQuestions />', () => {
  const elements = {
    numberQuestionsText: (api: RenderAPI) =>
      api.queryByTestId('number-questions-text'),
    slider: (api: RenderAPI) => api.queryByTestId('slider'),
    minValueText: (api: RenderAPI) => api.queryByTestId('min-value-text'),
    maxValueText: (api: RenderAPI) => api.queryByTestId('max-value-text'),
  };

  afterEach(cleanup);

  it('should render correctly', () => {
    const numberOfQuestions = randomPositiveNumber(
      SLIDER_MIN_VALUE,
      SLIDER_MAX_VALUE,
    );
    const component = render(renderNumberOfQuestions(numberOfQuestions));
    fireEvent(elements.slider(component), 'onLayout');
    expect(elements.numberQuestionsText(component)).not.toBeNull();
    expect(elements.numberQuestionsText(component).children[0]).toEqual(
      `${numberOfQuestions}`,
    );
    expect(elements.slider(component)).not.toBeNull();
    expect(elements.minValueText(component)).not.toBeNull();
    expect(elements.minValueText(component).children[0]).toEqual(
      `${SLIDER_MIN_VALUE}`,
    );
    expect(elements.maxValueText(component)).not.toBeNull();
    expect(elements.maxValueText(component).children[0]).toEqual(
      `${SLIDER_MAX_VALUE}`,
    );
  });

  it('should call the "onSetNumberQuestions" when the user moves the slider', () => {
    const onSetNumberQuestions = jest.fn();
    const numberOfQuestions = randomPositiveNumber(
      SLIDER_MIN_VALUE,
      SLIDER_MAX_VALUE,
    );
    const distanceMoved = randomPositiveNumber(
      SLIDER_MIN_VALUE,
      SLIDER_MAX_VALUE,
    );
    const component = render(
      renderNumberOfQuestions(numberOfQuestions, onSetNumberQuestions),
    );
    fireEvent(elements.slider(component), 'onValueChange', distanceMoved);
    expect(onSetNumberQuestions).toHaveBeenCalledTimes(1);
    expect(onSetNumberQuestions).toHaveBeenCalledWith(distanceMoved);
  });
});
