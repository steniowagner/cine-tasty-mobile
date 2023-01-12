import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Animated from 'react-native-reanimated';

import * as Styles from './ModalSheet.styles';
import {useModalSheet} from './useModalSheet';

type ModalSheetProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  height?: number;
};

export const ModalSheet = (props: ModalSheetProps) => {
  const modalSheet = useModalSheet({
    height: props.height,
    onClose: props.onClose,
    isOpen: props.isOpen,
  });

  return (
    <Styles.Wrapper testID="modal-sheet">
      <TouchableWithoutFeedback
        onPress={modalSheet.onPressBackgroundLayer}
        testID="closeable-area">
        <Animated.View
          style={[
            Styles.AnimatedStyles.backgroundDarkLayer,
            modalSheet.darkLayerAnimatedStyle,
          ]}
        />
      </TouchableWithoutFeedback>
    </Styles.Wrapper>
  );
};
