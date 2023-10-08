import React from 'react';
import { ThemeProvider, Colors } from 'styled-components/native';
import { RenderAPI, render } from '@testing-library/react-native';

import { dark as theme } from '@styles/themes';
import {
  renderSVGIconConditionally,
  ConditionProps,
} from './render-svg-icon-conditionally';

const ICON_SIZE = 1;
const ifTrueProps = {
  color: 'fallbackImageBackground',
  size: ICON_SIZE,
  id: 'image',
};
const ifFalseProps = {
  color: 'fallbackImageBackground',
  size: ICON_SIZE,
  id: 'image-off',
};

const renderIconConditionally = (condition = false) => (
  <ThemeProvider theme={theme}>
    {renderSVGIconConditionally({
      condition,
      ifTrue: ifTrueProps as ConditionProps,
      ifFalse: ifFalseProps as ConditionProps,
    })}
  </ThemeProvider>
);

describe('Utils/render-svg-icon-conditionally', () => {
  const elements = {
    trueIcon: (api: RenderAPI) => api.queryByTestId(`icon-${ifTrueProps.id}`),
    falseIcon: (api: RenderAPI) => api.queryByTestId(`icon-${ifFalseProps.id}`),
  };

  it('should render the "ifTrue" svg When the condition is "true"', () => {
    const component = render(renderIconConditionally(true));
    expect(elements.trueIcon(component)).not.toBeNull();
    expect(elements.falseIcon(component)).toBeNull();
  });

  it('should render the "ifFalse" svg When the condition is "false"', () => {
    const component = render(renderIconConditionally(false));
    expect(elements.trueIcon(component)).toBeNull();
    expect(elements.falseIcon(component)).not.toBeNull();
  });
});
