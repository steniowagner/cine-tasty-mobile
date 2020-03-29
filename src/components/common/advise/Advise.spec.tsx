import React from 'react';
import { render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import Advise, { Props } from './Advise';

import { dark } from '../../../styles/themes';

type OptionalAdviseProps = {
  [K in keyof Props]?: string;
};

const DEFAULT_DESCRIPTION = 'description';
const DEFAULT_SUGGESTION = 'suggestion';
const DEFAULT_TITLE = 'title';
const DEFAULT_ICON = 'icon';

const getParam = (
  optionalFields: OptionalAdviseProps,
  defaultValue: string,
  field: keyof OptionalAdviseProps,
): string => {
  if (optionalFields[field] === '') {
    return '';
  }

  return optionalFields[field] || defaultValue;
};

const renderAdvise = (optionalAdviseProps: OptionalAdviseProps = {}) => (
  <ThemeProvider
    theme={dark}
  >
    <Advise
      description={getParam(optionalAdviseProps, DEFAULT_DESCRIPTION, 'description')}
      suggestion={getParam(optionalAdviseProps, DEFAULT_SUGGESTION, 'suggestion')}
      title={getParam(optionalAdviseProps, DEFAULT_TITLE, 'title')}
      icon={getParam(optionalAdviseProps, DEFAULT_ICON, 'icon')}
    />
  </ThemeProvider>
);

describe('Testing <Advise />', () => {
  it('should render correctly when all parameters are non-empty strings', () => {
    const { getByText, getByTestId } = render(renderAdvise());

    expect(getByTestId('icon-wrapper')).not.toBeNull();

    expect(getByText(DEFAULT_DESCRIPTION)).not.toBeNull();

    expect(getByText(DEFAULT_SUGGESTION)).not.toBeNull();

    expect(getByText(DEFAULT_TITLE)).not.toBeNull();
  });

  it('should render correctly when the title prop is an empty string', () => {
    const { getByText, getByTestId } = render(renderAdvise({ title: '' }));

    expect(getByTestId('icon-wrapper')).not.toBeNull();

    expect(getByText(DEFAULT_DESCRIPTION)).not.toBeNull();

    expect(getByText(DEFAULT_SUGGESTION)).not.toBeNull();

    try {
      getByText(DEFAULT_TITLE);
    } catch (err) {
      expect(err.message).toEqual('No instances found');
    }
  });

  it('should render correctly when the description prop is an empty string', () => {
    const { getByText, getByTestId } = render(renderAdvise({ description: '' }));

    expect(getByTestId('icon-wrapper')).not.toBeNull();

    expect(getByText(DEFAULT_TITLE)).not.toBeNull();

    expect(getByText(DEFAULT_SUGGESTION)).not.toBeNull();

    try {
      getByText(DEFAULT_DESCRIPTION);
    } catch (err) {
      expect(err.message).toEqual('No instances found');
    }
  });

  it('should render correctly when the suggestion prop is an empty string', () => {
    const { getByText, getByTestId } = render(renderAdvise({ suggestion: '' }));

    expect(getByTestId('icon-wrapper')).not.toBeNull();

    expect(getByText(DEFAULT_TITLE)).not.toBeNull();

    expect(getByText(DEFAULT_DESCRIPTION)).not.toBeNull();

    try {
      getByText(DEFAULT_SUGGESTION);
    } catch (err) {
      expect(err.message).toEqual('No instances found');
    }
  });
});
