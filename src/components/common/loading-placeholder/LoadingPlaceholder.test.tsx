import React from 'react';
import { RenderAPI, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@/styles/themes';

import { ANIMATION_DURATION } from './use-loading-placeholder';
import {
  LoadingPlaceholder,
  LoadingPlaceholderProps,
} from './LoadingPlaceholder';

const customTestId = 'custom-test-id';

const renderLoadingPlaceholder = (props: LoadingPlaceholderProps) => (
  <ThemeProvider theme={theme}>
    <LoadingPlaceholder {...props} />
  </ThemeProvider>
);

describe('Components/Common/LoadingPlaceholder', () => {
  const elements = {
    wrapper: (component: RenderAPI) =>
      component.queryByTestId('loading-placeholder'),
    wrapperCustomTestId: (component: RenderAPI) =>
      component.queryByTestId(customTestId),
  };

  describe('Test-id', () => {
    it('should render with the test-id = "loading-placeholder" when no custom test-id is provided', () => {
      const component = render(renderLoadingPlaceholder({}));
      expect(elements.wrapper(component)).not.toBeNull();
      expect(elements.wrapperCustomTestId(component)).toBeNull();
    });

    it('should render with the "custom-test-id" when a custom test-id is provided', () => {
      const component = render(
        renderLoadingPlaceholder({ testID: customTestId }),
      );
      expect(elements.wrapper(component)).toBeNull();
      expect(elements.wrapperCustomTestId(component)).not.toBeNull();
    });
  });

  describe('Animating', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should "start" with the "correct animated-style"', () => {
      const component = render(renderLoadingPlaceholder({}));
      expect(elements.wrapper(component)).toHaveAnimatedStyle({ opacity: 1 });
    });

    it('should have the "correcet animated-style" in the "middle" of the "animation"', () => {
      const component = render(renderLoadingPlaceholder({}));
      expect(elements.wrapper(component)).toHaveAnimatedStyle({ opacity: 1 });
      jest.advanceTimersByTime(ANIMATION_DURATION / 2);
      expect(
        elements.wrapper(component)?.props.animatedStyle.value.opacity,
      ).toBeLessThan(1);
      expect(
        elements.wrapper(component)?.props.animatedStyle.value.opacity,
      ).toBeGreaterThan(0);
    });

    it('should have the "correcet animated-style" in the "end" of the "animation"', async () => {
      const component = render(renderLoadingPlaceholder({}));
      await waitFor(() => {
        expect(elements.wrapper(component)).toHaveAnimatedStyle({
          opacity: 0.1,
        });
      });
    });
  });

  describe('Style', () => {
    it('should render correctly when "custom-styles" is not provided', () => {
      const component = render(renderLoadingPlaceholder({}));
      expect(elements.wrapper(component)?.props.style).toEqual({
        backgroundColor: theme.colors.loadingColor,
        opacity: 1,
      });
    });

    it('should render correctly with "custom-styles"', () => {
      const style = {
        width: 10,
        height: 20,
      };
      const component = render(renderLoadingPlaceholder({ style }));
      expect(elements.wrapper(component)?.props.style).toEqual({
        ...style,
        backgroundColor: theme.colors.loadingColor,
        opacity: 1,
      });
    });
  });
});
