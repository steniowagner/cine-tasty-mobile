import React from 'react';
import {View} from 'react-native';
import {RenderAPI, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import metrics from '@styles/metrics';
import {CONSTANTS} from '@utils';

import {SectionProps, Section} from './Section';

const TITLE = 'TITLE';

const renderSection = (
  props: Pick<
    SectionProps,
    'withHorizontalPadding' | 'noMarginBottom' | 'noMarginTop'
  >,
) => (
  <ThemeProvider theme={theme}>
    <Section {...props} title={TITLE}>
      <View testID="children" />
    </Section>
  </ThemeProvider>
);

describe('<Section />', () => {
  const elements = {
    sectionWrapper: (api: RenderAPI) => api.queryByTestId('section-wrapper'),
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    children: (api: RenderAPI) => api.queryByTestId('children'),
  };

  it('should render correctly when the optional-style params are not defined', () => {
    const component = render(renderSection({}));
    expect(elements.sectionWrapper(component)).not.toBeNull();
    expect(elements.sectionTitle(component)).not.toBeNull();
    expect(elements.sectionTitle(component).children[0]).toEqual(TITLE);
    expect(elements.children(component)).not.toBeNull();
    expect(
      elements.sectionWrapper(component).props.style[0].paddingHorizontal,
    ).toEqual(0);
    expect(elements.sectionWrapper(component).props.style[0].marginTop).toEqual(
      metrics.extraLargeSize,
    );
    expect(
      elements.sectionWrapper(component).props.style[0].marginBottom,
    ).toEqual(metrics.extraLargeSize);
  });

  it('should have the "padding-horizontal" set with "CONSTANTS.VALUES.DEFAULT_SPACING" when "withHorizontalPadding" is "true"', () => {
    const component = render(renderSection({withHorizontalPadding: true}));
    expect(elements.sectionWrapper(component)).not.toBeNull();
    expect(elements.sectionTitle(component)).not.toBeNull();
    expect(elements.sectionTitle(component).children[0]).toEqual(TITLE);
    expect(elements.children(component)).not.toBeNull();
    expect(
      elements.sectionWrapper(component).props.style[0].paddingHorizontal,
    ).toEqual(CONSTANTS.VALUES.DEFAULT_SPACING);
    expect(elements.sectionWrapper(component).props.style[0].marginTop).toEqual(
      metrics.extraLargeSize,
    );
    expect(
      elements.sectionWrapper(component).props.style[0].marginBottom,
    ).toEqual(metrics.extraLargeSize);
  });

  it('shoud have the "margin-bottom" as "0" when the "noMarginBottom" is "true"', () => {
    const component = render(renderSection({noMarginBottom: true}));
    expect(elements.sectionWrapper(component)).not.toBeNull();
    expect(elements.sectionTitle(component)).not.toBeNull();
    expect(elements.sectionTitle(component).children[0]).toEqual(TITLE);
    expect(elements.children(component)).not.toBeNull();
    expect(
      elements.sectionWrapper(component).props.style[0].paddingHorizontal,
    ).toEqual(0);
    expect(elements.sectionWrapper(component).props.style[0].marginTop).toEqual(
      metrics.extraLargeSize,
    );
    expect(
      elements.sectionWrapper(component).props.style[0].marginBottom,
    ).toEqual(0);
  });

  it('shoud have the "margin-top" as "0" when the "noMarginTop" is "true"', () => {
    const component = render(renderSection({noMarginTop: true}));
    expect(elements.sectionWrapper(component)).not.toBeNull();
    expect(elements.sectionTitle(component)).not.toBeNull();
    expect(elements.sectionTitle(component).children[0]).toEqual(TITLE);
    expect(elements.children(component)).not.toBeNull();
    expect(
      elements.sectionWrapper(component).props.style[0].paddingHorizontal,
    ).toEqual(0);
    expect(elements.sectionWrapper(component).props.style[0].marginTop).toEqual(
      0,
    );
    expect(
      elements.sectionWrapper(component).props.style[0].marginBottom,
    ).toEqual(metrics.extraLargeSize);
  });

  it('shoud set "padding-horizontal" with "CONSTANTS.VALUES.DEFAULT_SPACING" and "margin-bottom" as "0" when both "withHorizontalPadding" and "noMarginBottom" are "true"', () => {
    const component = render(
      renderSection({withHorizontalPadding: true, noMarginBottom: true}),
    );
    expect(elements.sectionWrapper(component)).not.toBeNull();
    expect(elements.sectionTitle(component)).not.toBeNull();
    expect(elements.sectionTitle(component).children[0]).toEqual(TITLE);
    expect(elements.children(component)).not.toBeNull();
    expect(
      elements.sectionWrapper(component).props.style[0].paddingHorizontal,
    ).toEqual(CONSTANTS.VALUES.DEFAULT_SPACING);
    expect(elements.sectionWrapper(component).props.style[0].marginTop).toEqual(
      metrics.extraLargeSize,
    );
    expect(
      elements.sectionWrapper(component).props.style[0].marginBottom,
    ).toEqual(0);
  });

  it('shoud set "padding-horizontal" with "CONSTANTS.VALUES.DEFAULT_SPACING" and "margin-top" as "0" when both "withHorizontalPadding" and "noMarginBottom" are "true"', () => {
    const component = render(
      renderSection({withHorizontalPadding: true, noMarginTop: true}),
    );
    expect(elements.sectionWrapper(component)).not.toBeNull();
    expect(elements.sectionTitle(component)).not.toBeNull();
    expect(elements.sectionTitle(component).children[0]).toEqual(TITLE);
    expect(elements.children(component)).not.toBeNull();
    expect(
      elements.sectionWrapper(component).props.style[0].paddingHorizontal,
    ).toEqual(CONSTANTS.VALUES.DEFAULT_SPACING);
    expect(elements.sectionWrapper(component).props.style[0].marginTop).toEqual(
      0,
    );
    expect(
      elements.sectionWrapper(component).props.style[0].marginBottom,
    ).toEqual(metrics.extraLargeSize);
  });

  it('shoud set "margin-bottom" and "margin-top" as "0" when both "noMarginTop" and "noMarginBottom" are "true"', () => {
    const component = render(
      renderSection({noMarginBottom: true, noMarginTop: true}),
    );
    expect(elements.sectionWrapper(component)).not.toBeNull();
    expect(elements.sectionTitle(component)).not.toBeNull();
    expect(elements.sectionTitle(component).children[0]).toEqual(TITLE);
    expect(elements.children(component)).not.toBeNull();
    expect(
      elements.sectionWrapper(component).props.style[0].paddingHorizontal,
    ).toEqual(0);
    expect(elements.sectionWrapper(component).props.style[0].marginTop).toEqual(
      0,
    );
    expect(
      elements.sectionWrapper(component).props.style[0].marginBottom,
    ).toEqual(0);
  });

  it('shoud set "margin-bottom" and "margin-top" as "0" and "padding-horizontal" with "CONSTANTS.VALUES.DEFAULT_SPACING" when "withHorizontalPadding", "noMarginTop" and "noMarginBottom" are "true"', () => {
    const component = render(
      renderSection({
        withHorizontalPadding: true,
        noMarginBottom: true,
        noMarginTop: true,
      }),
    );
    expect(elements.sectionWrapper(component)).not.toBeNull();
    expect(elements.sectionTitle(component)).not.toBeNull();
    expect(elements.sectionTitle(component).children[0]).toEqual(TITLE);
    expect(elements.children(component)).not.toBeNull();
    expect(
      elements.sectionWrapper(component).props.style[0].paddingHorizontal,
    ).toEqual(CONSTANTS.VALUES.DEFAULT_SPACING);
    expect(elements.sectionWrapper(component).props.style[0].marginTop).toEqual(
      0,
    );
    expect(
      elements.sectionWrapper(component).props.style[0].marginBottom,
    ).toEqual(0);
  });
});
