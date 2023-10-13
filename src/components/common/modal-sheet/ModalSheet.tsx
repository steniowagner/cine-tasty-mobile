import React from 'react';
import { Modal } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { ModalSelectButton } from '../modal-select-button/ModalSelectButton';
import { useModalSheet } from './use-modal-sheet';
import * as Styles from './ModalSheet.styles';

type ModalSheetProps = {
  children: React.ReactNode;
  ctaButtonTitle?: string;
  forceClose?: boolean;
  onCloseForcibly?: () => void;
  onPressCTAButton?: () => unknown;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  height?: number;
};

export const ModalSheet = (props: ModalSheetProps) => {
  const modalSheet = useModalSheet({
    onPressCTAButton: props.onPressCTAButton,
    forceClose: props.forceClose,
    onCloseForcibly: props.onCloseForcibly,
    height: props.height,
    onClose: props.onClose,
    isOpen: props.isOpen,
  });

  return (
    <Modal
      testID="modal-sheet"
      visible={modalSheet.internalIsOpen}
      transparent
      animationType="none">
      <Animated.View
        style={[
          Styles.sheet.backgroundDarkLayer,
          modalSheet.darkLayerAnimatedStyle,
        ]}
      />
      <Styles.BottomGapSection
        height={modalSheet.bottomGapSectionHeight}
        hasCtaButton={!!props.ctaButtonTitle}
      />
      <GestureHandlerRootView style={Styles.sheet.gestureHandlerRootView}>
        <PanGestureHandler onGestureEvent={modalSheet.handleGestureEvent}>
          <Animated.View
            style={[
              {
                height: modalSheet.cardHeight,
                ...Styles.sheet.card,
              },
              modalSheet.cardAnimatedStyle,
            ]}>
            <Styles.GripWrapper>
              <Styles.Grip />
            </Styles.GripWrapper>
            {props.title && (
              <Styles.ListHeaderWrapper>
                <Styles.Title testID="modal-sheet-title">
                  {props.title}
                </Styles.Title>
                <Styles.LineDivider />
              </Styles.ListHeaderWrapper>
            )}
            <>
              {props.children}
              {props.ctaButtonTitle && (
                <ModalSelectButton
                  title={props.ctaButtonTitle}
                  onPress={modalSheet.onPressCTAButton}
                />
              )}
            </>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
};
