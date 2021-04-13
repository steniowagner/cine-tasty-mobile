import React from 'react';
import { TouchableOpacity, Modal, View } from 'react-native';
import styled from 'styled-components';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseButtonWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

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
    <Wrapper
      testID="modal-wrapper"
    >
      <View>
        {children}
        <CloseButtonWrapper
          testID="close-modal-button"
          onPress={onCloseModal}
        >
          <SVGIcon
            size={metrics.getWidthFromDP('9%')}
            colorThemeRef="buttonText"
            id="close"
          />
        </CloseButtonWrapper>
      </View>
    </Wrapper>
  </Modal>
);

export default ModalDetail;
