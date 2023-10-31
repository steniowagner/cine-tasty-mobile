import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { State } from 'react-native-gesture-handler';

import { dark as theme } from '@styles/themes';
import metrics from '@/styles/metrics';

import { fireGestureHandler } from '../../../../node_modules/react-native-gesture-handler/src/jestUtils';
import { ModalSheet, ModalSheetProps } from './ModalSheet';

type RenderModalSheetParams = Omit<ModalSheetProps, 'children'>;

jest.mock('@utils', () => ({
  isEqualsOrLargerThanIphoneX: jest.fn(),
}));

const renderModalSheet = (params: RenderModalSheetParams) => {
  const ChildrenComponent = () => <View testID="children" />;

  return (
    <ThemeProvider theme={theme}>
      <ModalSheet {...params}>
        <ChildrenComponent />
      </ModalSheet>
    </ThemeProvider>
  );
};

describe('Components/Common/ModalSheet', () => {
  const elements = {
    modal: (component: RenderAPI) => component.queryByTestId('modal-sheet'),
    darkLayer: (component: RenderAPI) => component.queryByTestId('dark-layer'),
    modalCard: (component: RenderAPI) => component.queryByTestId('modal-card'),
    cta: (component: RenderAPI) => component.queryByTestId('select-button'),
    ctaTitle: (component: RenderAPI) =>
      component.queryByTestId('select-button-text'),
    title: (component: RenderAPI) =>
      component.queryByTestId('modal-sheet-title'),
    children: (component: RenderAPI) => component.queryByTestId('children'),
  };

  describe('Rendering', () => {
    it('should render correctly when "isOpen" is "true"', () => {
      const component = render(
        renderModalSheet({ isOpen: true, onClose: jest.fn() }),
      );
      expect(elements.modal(component)).not.toBeNull();
      expect(elements.modal(component)!.props.visible).toEqual(true);
      expect(elements.modalCard(component)).not.toBeNull();
      expect(elements.children(component)).not.toBeNull();
    });

    it('should render correctly when "isOpen" is "false"', () => {
      const component = render(
        renderModalSheet({ isOpen: false, onClose: jest.fn() }),
      );
      expect(elements.modal(component)).not.toBeNull();
      expect(elements.modal(component)!.props.visible).toEqual(false);
      expect(elements.modalCard(component)).toBeNull();
      expect(elements.children(component)).toBeNull();
    });

    describe('Title', () => {
      it('should render the "Title" correctly when it is defined', () => {
        const title = 'title';
        const component = render(
          renderModalSheet({ isOpen: true, onClose: jest.fn(), title }),
        );
        expect(elements.title(component)).not.toBeNull();
        expect(elements.title(component)?.children[0]).toEqual(title);
      });

      it('should not render the "Title" correctly when it is undefined', () => {
        const component = render(
          renderModalSheet({ isOpen: true, onClose: jest.fn() }),
        );
        expect(elements.title(component)).toBeNull();
      });
    });

    describe('CTA', () => {
      it('should render the CTA correctly when the "title" is defined', () => {
        const ctaButtonTitle = 'CTA';
        const component = render(
          renderModalSheet({
            isOpen: true,
            onClose: jest.fn(),
            ctaButtonTitle,
          }),
        );
        expect(elements.cta(component)).not.toBeNull();
        expect(elements.ctaTitle(component)).not.toBeNull();
        expect(elements.ctaTitle(component)?.children[0]).toEqual(
          ctaButtonTitle,
        );
      });

      it('should not render the CTA when the "title" is not defined', () => {
        const component = render(
          renderModalSheet({ isOpen: true, onClose: jest.fn() }),
        );
        expect(elements.cta(component)).toBeNull();
        expect(elements.ctaTitle(component)).toBeNull();
      });

      it('should call "onPressCTAButton" when presses the "cta"', async () => {
        const onPressCTAButton = jest.fn();
        const component = render(
          renderModalSheet({
            isOpen: true,
            onClose: jest.fn(),
            ctaButtonTitle: 'CTA',
            onPressCTAButton,
          }),
        );
        expect(onPressCTAButton).toHaveBeenCalledTimes(0);
        act(() => {
          fireEvent.press(elements.cta(component)!);
        });
        await waitFor(() => {
          expect(onPressCTAButton).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('Closing the Modal', () => {
    describe('When closing through "CTA-Press"', () => {
      it('should "animate" the "modal-card" correctly', async () => {
        const component = render(
          renderModalSheet({
            isOpen: true,
            onClose: jest.fn(),
            ctaButtonTitle: 'CTA',
          }),
        );
        // wait for the modal to be open
        await waitFor(() => {
          expect(
            typeof elements.modalCard(component)!.props.animatedStyle.value.top,
          ).toEqual('number');
          expect(
            elements.modalCard(component)!.props.animatedStyle.value.top,
          ).toBeLessThan(metrics.height);
        });
        // modal is open
        await waitFor(() => {
          const cardDistanceFromTopWhenModalOpen =
            metrics.height - elements.modalCard(component)!.props.style.height;
          expect(elements.modalCard(component)).toHaveAnimatedStyle({
            top: cardDistanceFromTopWhenModalOpen,
          });
        });
        act(() => {
          fireEvent.press(elements.cta(component)!);
        });
        // modal is closed
        await waitFor(() => {
          expect(elements.modalCard(component)).toHaveAnimatedStyle({
            top: metrics.height,
          });
        });
      });

      it('should "animate" the "dark-layer" correctly', async () => {
        const component = render(
          renderModalSheet({
            isOpen: true,
            onClose: jest.fn(),
            ctaButtonTitle: 'CTA',
          }),
        );
        // wait for the modal to be open
        await waitFor(() => {
          expect(
            typeof elements.modalCard(component)!.props.animatedStyle.value.top,
          ).toEqual('number');
          expect(
            elements.modalCard(component)!.props.animatedStyle.value.top,
          ).toBeLessThan(metrics.height);
        });
        // modal is open
        await waitFor(() => {
          const cardDistanceFromTopWhenModalOpen =
            metrics.height - elements.modalCard(component)!.props.style.height;
          expect(elements.modalCard(component)).toHaveAnimatedStyle({
            top: cardDistanceFromTopWhenModalOpen,
          });
        });
        expect(elements.darkLayer(component)).toHaveAnimatedStyle({
          opacity: 1,
        });
        act(() => {
          fireEvent.press(elements.cta(component)!);
        });
        // modal is closed
        await waitFor(() => {
          expect(elements.darkLayer(component)).toHaveAnimatedStyle({
            opacity: 0,
          });
        });
      });
    });

    describe('Dark-layer', () => {
      it('should "animate" the "dark-layer" while is "opening" the "modal-card"', async () => {
        const component = render(
          renderModalSheet({
            isOpen: true,
            onClose: jest.fn(),
          }),
        );
        expect(elements.darkLayer(component)).toHaveAnimatedStyle({
          opacity: 0,
        });
        // dark-layer start to appear
        await waitFor(() => {
          expect(
            typeof elements.darkLayer(component)!.props.animatedStyle.value
              .opacity,
          ).toEqual('number');
          expect(
            elements.darkLayer(component)!.props.animatedStyle.value.opacity,
          ).toBeGreaterThan(0);
        });
        // dark-layer appear
        await waitFor(() => {
          expect(
            typeof elements.darkLayer(component)!.props.animatedStyle.value
              .opacity,
          ).toEqual('number');
          expect(elements.darkLayer(component)).toHaveAnimatedStyle({
            opacity: 1,
          });
        });
      });

      it('should "animate" the "dark-layer" while is "closing" the "modal-card"', async () => {
        const component = render(
          renderModalSheet({
            isOpen: true,
            onClose: jest.fn(),
          }),
        );
        // dark-layer appears
        await waitFor(() => {
          expect(
            typeof elements.darkLayer(component)!.props.animatedStyle.value
              .opacity,
          ).toEqual('number');
          expect(elements.darkLayer(component)).toHaveAnimatedStyle({
            opacity: 1,
          });
        });
        // triggering translateY event
        fireGestureHandler(elements.modalCard(component)!, [
          { state: State.BEGAN },
          { state: State.ACTIVE },
          { translationY: metrics.height },
          { state: State.END },
        ]);
        // dark-layer start to fade
        await waitFor(() => {
          expect(
            typeof elements.darkLayer(component)!.props.animatedStyle.value
              .opacity,
          ).toEqual('number');
          expect(
            elements.darkLayer(component)!.props.animatedStyle.value.opacity,
          ).toBeLessThan(1);
        });
        // dark-layer disappear
        await waitFor(() => {
          expect(
            typeof elements.darkLayer(component)!.props.animatedStyle.value
              .opacity,
          ).toEqual('number');
          expect(elements.darkLayer(component)).toHaveAnimatedStyle({
            opacity: 0,
          });
        });
      });
    });
  });

  describe('Animating', () => {
    describe('When opening the Modal', () => {
      it('should "animate" the "modal-card" correctly', async () => {
        const component = render(
          renderModalSheet({
            isOpen: true,
            onClose: jest.fn(),
          }),
        );
        // wait for the modal to be open
        await waitFor(() => {
          expect(
            typeof elements.modalCard(component)!.props.animatedStyle.value.top,
          ).toEqual('number');
          expect(
            elements.modalCard(component)!.props.animatedStyle.value.top,
          ).toBeLessThan(metrics.height);
        });
        // modal is open
        await waitFor(() => {
          const cardDistanceFromTopWhenModalOpen =
            metrics.height - elements.modalCard(component)!.props.style.height;
          expect(elements.modalCard(component)).toHaveAnimatedStyle({
            top: cardDistanceFromTopWhenModalOpen,
          });
        });
      });

      it('should "animate" the "dark-layer" correctly', async () => {
        const component = render(
          renderModalSheet({
            isOpen: true,
            onClose: jest.fn(),
          }),
        );
        expect(elements.darkLayer(component)).toHaveAnimatedStyle({
          opacity: 0,
        });
        await waitFor(() => {
          expect(elements.darkLayer(component)).toHaveAnimatedStyle({
            opacity: 1,
          });
        });
      });
    });
  });
});
