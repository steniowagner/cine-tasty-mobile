import React from 'react';
import { Modal, View } from 'react-native';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './ModalDetail.styles';

type Props = {
  onCloseModal: () => void;
  children: JSX.Element;
};

const ModalDetail = ({ onCloseModal, children }: Props) => (
  <Modal
    onRequestClose={onCloseModal}
    animationType="fade"
    hardwareAccelerated
    transparent
  >
    <Styles.Wrapper
      testID="modal-wrapper"
    >
      <View>
        {children}
        <Styles.CloseButtonWrapper
          testID="close-modal-button"
          onPress={onCloseModal}
        >
          <SVGIcon
            size={metrics.getWidthFromDP('9%')}
            colorThemeRef="buttonText"
            id="close"
          />
        </Styles.CloseButtonWrapper>
      </View>
    </Styles.Wrapper>
  </Modal>
);

export default ModalDetail;
