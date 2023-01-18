import React from 'react';
import {Modal} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import {ModalSelectButton} from '@components';

import * as Styles from './ModalSheet.styles';
import {useModalSheet} from './useModalSheet';

type ModalSheetProps = {
  children: React.ReactNode;
  ctaButtonTitle?: string;
  ctaButtonCallback?: () => unknown;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  height?: number;
};

export const ModalSheet = (props: ModalSheetProps) => {
  const modalSheet = useModalSheet({
    ctaButtonCallback: props.ctaButtonCallback,
    height: props.height,
    onClose: props.onClose,
    isOpen: props.isOpen,
  });

  return (
    <Modal
      testID="modal-sheet"
      visible={props.isOpen}
      transparent
      animationType="none">
      <Animated.View
        style={[
          Styles.AnimatedStyles.backgroundDarkLayer,
          modalSheet.darkLayerAnimatedStyle,
        ]}
      />
      <Styles.BottomGapSection
        height={modalSheet.bottomGapSectionHeight}
        hasCtaButton={!!props.ctaButtonTitle}
      />
      <PanGestureHandler onGestureEvent={modalSheet.handleGestureEvent}>
        <Animated.View
          style={[
            {
              height: modalSheet.cardHeight,
              ...Styles.AnimatedStyles.card,
            },
            modalSheet.cardAnimatedStyle,
          ]}>
          <Styles.GripWrapper>
            <Styles.Grip />
          </Styles.GripWrapper>
          {props.title && (
            <Styles.ListHeaderWrapper>
              <Styles.Title>{props.title}</Styles.Title>
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
    </Modal>
  );
};
