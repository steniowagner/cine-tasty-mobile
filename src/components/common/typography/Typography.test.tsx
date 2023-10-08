import React from 'react';
import { RenderAPI, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes';
import typography from '@styles/typography';

import Typography, { DefaultTypographyProps } from './Typography';

const TEXT = 'SOME_TEXT';
const EXTRA_TEXT_PROPS = {
  bold: true,
  alignment: 'auto',
  style: {
    marginLeft: 1,
  },
  color: '#f0f',
};

const renderTypography = (
  params?: Omit<DefaultTypographyProps, 'children'>,
) => (
  <ThemeProvider theme={theme}>
    <Typography.ExtraSmallText {...params} testID="extra-small-text">
      {TEXT}
    </Typography.ExtraSmallText>
    <Typography.SmallText {...params} testID="small-text">
      {TEXT}
    </Typography.SmallText>
    <Typography.MediumText {...params} testID="medium-text">
      {TEXT}
    </Typography.MediumText>
    <Typography.LargeText {...params} testID="large-text">
      {TEXT}
    </Typography.LargeText>
    <Typography.ExtraLargeText {...params} testID="extra-large-text">
      {TEXT}
    </Typography.ExtraLargeText>
  </ThemeProvider>
);
describe('Components/Common/Typography', () => {
  const elements = {
    extraSmallText: (api: RenderAPI) => api.getByTestId('extra-small-text'),
    smallText: (api: RenderAPI) => api.getByTestId('small-text'),
    mediumText: (api: RenderAPI) => api.getByTestId('medium-text'),
    largeText: (api: RenderAPI) => api.getByTestId('large-text'),
    extraLargeText: (api: RenderAPI) => api.getByTestId('extra-large-text'),
  };

  describe('ExtraSmallText', () => {
    it('should render "ExtraSmallText" correctly with the default styles', () => {
      const component = render(renderTypography());
      const extraSmallText = elements.extraSmallText(component);
      expect(extraSmallText.props.style[0]).toEqual(typography.xs({}));
      expect(extraSmallText.props.style[2]).toEqual({
        textAlign: 'left',
        color: theme.colors.text,
      });
    });

    it('should render "ExtraSmallText" correctly when has some "custom-styles"', () => {
      const component = render(renderTypography(EXTRA_TEXT_PROPS));
      const extraSmallText = elements.extraSmallText(component);
      expect(extraSmallText.props.style[0]).toEqual(
        typography.xs({
          bold: true,
        }),
      );
      expect(extraSmallText.props.style[2]).toEqual({
        textAlign: EXTRA_TEXT_PROPS.alignment,
        color: EXTRA_TEXT_PROPS.color,
      });
    });
  });

  describe('SmallText', () => {
    it('should render the "SmallText" text with the correct styles', () => {
      const component = render(renderTypography());
      const smallText = elements.smallText(component);
      expect(smallText.props.style[0]).toEqual(typography.sm({}));
      expect(smallText.props.style[2]).toEqual({
        textAlign: 'left',
        color: theme.colors.text,
      });
    });

    it('should render "SmallText" correctly when has some "custom-styles"', () => {
      const component = render(renderTypography(EXTRA_TEXT_PROPS));
      const smallText = elements.smallText(component);
      expect(smallText.props.style[0]).toEqual(
        typography.sm({
          bold: true,
        }),
      );
      expect(smallText.props.style[2]).toEqual({
        textAlign: EXTRA_TEXT_PROPS.alignment,
        color: EXTRA_TEXT_PROPS.color,
      });
    });
  });

  describe('MediumText', () => {
    it('should render the "MediumText" text with the correct styles', () => {
      const component = render(renderTypography());
      const mediumText = elements.mediumText(component);
      expect(mediumText.props.style[0]).toEqual(typography.md({}));
      expect(mediumText.props.style[2]).toEqual({
        textAlign: 'left',
        color: theme.colors.text,
      });
    });

    it('should render "MediumText" correctly when has some "custom-styles"', () => {
      const component = render(renderTypography(EXTRA_TEXT_PROPS));
      const mediumText = elements.mediumText(component);
      expect(mediumText.props.style[0]).toEqual(
        typography.md({
          bold: true,
        }),
      );
      expect(mediumText.props.style[2]).toEqual({
        textAlign: EXTRA_TEXT_PROPS.alignment,
        color: EXTRA_TEXT_PROPS.color,
      });
    });
  });

  describe('LargeText', () => {
    it('should render the "LargeText" text with the correct styles', () => {
      const component = render(renderTypography());
      const largeText = elements.largeText(component);
      expect(largeText.props.style[0]).toEqual(typography.lg({}));
      expect(largeText.props.style[2]).toEqual({
        textAlign: 'left',
        color: theme.colors.text,
      });
    });

    it('should render "LargeText" correctly when has some "custom-styles"', () => {
      const component = render(renderTypography(EXTRA_TEXT_PROPS));
      const largeText = elements.largeText(component);
      expect(largeText.props.style[0]).toEqual(
        typography.lg({
          bold: true,
        }),
      );
      expect(largeText.props.style[2]).toEqual({
        textAlign: EXTRA_TEXT_PROPS.alignment,
        color: EXTRA_TEXT_PROPS.color,
      });
    });
  });

  describe('ExtraLargeText', () => {
    it('should render the "ExtraLargeText" text with the correct styles', () => {
      const component = render(renderTypography());
      const extraLargeText = elements.extraLargeText(component);
      expect(extraLargeText.props.style[0]).toEqual(typography.xl({}));
      expect(extraLargeText.props.style[2]).toEqual({
        textAlign: 'left',
        color: theme.colors.text,
      });
    });

    it('should render "ExtraLargeText" correctly when has some "custom-styles"', () => {
      const component = render(renderTypography(EXTRA_TEXT_PROPS));
      const largeText = elements.extraLargeText(component);
      expect(largeText.props.style[0]).toEqual(
        typography.xl({
          bold: true,
        }),
      );
      expect(largeText.props.style[2]).toEqual({
        textAlign: EXTRA_TEXT_PROPS.alignment,
        color: EXTRA_TEXT_PROPS.color,
      });
    });
  });
});
