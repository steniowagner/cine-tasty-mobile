import React from 'react';
import { View } from 'react-native';
import { cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import ListItemWrapperQuestion from './ListItemWrapperQuestion';

type Props = {
  currentQuestionIndex: number;
  hasSelectedAnswer: boolean;
  numberOfQuestions: number;
  onPressNext: () => void;
  question: string;
};

const renderQuestions = (props: Props) => (
  <ThemeProvider theme={dark}>
    <ListItemWrapperQuestion
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      <View />
    </ListItemWrapperQuestion>
  </ThemeProvider>
);

const defaultProps = {
  currentQuestionIndex: 1,
  hasSelectedAnswer: false,
  numberOfQuestions: 1,
  onPressNext: jest.fn(),
  question: 'question',
};

describe('Testing <ListItemWrapperQuestion />', () => {
  afterEach(cleanup);

  it('it should render correctly when has no answer selected', () => {
    const { queryByTestId, getByTestId } = render(renderQuestions(defaultProps));

    expect(getByTestId('question-indicator-text').props.children.join('')).toBe(
      `${defaultProps.currentQuestionIndex}/${defaultProps.numberOfQuestions}`,
    );

    expect(getByTestId('question-text').props.children).toBe(defaultProps.question);

    expect(getByTestId('next-button-disabled')).not.toBeNull();

    expect(queryByTestId('next-button')).toBeNull();
  });

  it('it should render correctly when has an answer selected', () => {
    const props = {
      ...defaultProps,
      hasSelectedAnswer: true,
    };

    const { queryByTestId, getByTestId } = render(renderQuestions(props));

    expect(getByTestId('question-indicator-text').props.children.join('')).toBe(
      `${props.currentQuestionIndex}/${props.numberOfQuestions}`,
    );

    expect(getByTestId('question-text').props.children).toBe(props.question);

    expect(getByTestId('next-button')).not.toBeNull();

    expect(queryByTestId('next-button-disabled')).toBeNull();
  });
});
