import React from 'react';
import { Modal, View } from 'react-native';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './ModalDetail.styles';

type ModalDetailProps = {
  onCloseModal: () => void;
  children: JSX.Element;
};

const ModalDetail = (props: ModalDetailProps) => (
  <Modal
    onRequestClose={props.onCloseModal}
    animationType="fade"
    hardwareAccelerated
    transparent
  >
    <Styles.Wrapper
      testID="modal-wrapper"
    >
      <View>
        {props.children}
        <Styles.CloseButtonWrapper
          testID="close-modal-button"
          onPress={props.onCloseModal}
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
