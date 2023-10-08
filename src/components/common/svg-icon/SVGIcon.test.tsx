import React from 'react';
import { render } from '@testing-library/react-native';
import { Colors, ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes';

import { SVGIcon } from './SVGIcon';
import { icons } from './icons';

type RenderSVGIconParams = {
  color?: keyof Colors;
  testID?: string;
  style?: Record<string, any>;
};

const renderSVGIcon = (props: RenderSVGIconParams) => (
  <ThemeProvider theme={theme}>
    <SVGIcon
      id="about"
      size={10}
      color={props.color}
      testID={props.testID}
      style={props.style}
    />
  </ThemeProvider>
);

describe('Components/Common/SVGIcon', () => {
  it('should render with the correct xml when the color is not defined', () => {
    const component = render(renderSVGIcon({}));
    expect(component.getByTestId('icon-about').props.xml).toEqual(
      icons(theme.colors.text).about,
    );
  });

  it('should render with the correct xml when the color is defined', () => {
    const component = render(renderSVGIcon({ color: 'primary' }));
    expect(component.getByTestId('icon-about').props.xml).toEqual(
      icons(theme.colors.primary).about,
    );
  });

  it('should render correctly with the custom props', () => {
    const component = render(
      renderSVGIcon({
        color: 'primary',
        testID: 'test-id',
        style: { marginTop: 1 },
      }),
    );
    expect(component.getByTestId('test-id').props.style[1]).toEqual({
      marginTop: 1,
    });
    expect(component.getByTestId('test-id').props.style[2].width).toEqual(10);
    expect(component.getByTestId('test-id').props.style[2].height).toEqual(10);
  });
});
