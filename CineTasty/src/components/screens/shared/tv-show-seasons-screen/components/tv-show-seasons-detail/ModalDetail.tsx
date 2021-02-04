import React from 'react';
import { TouchableOpacity, Modal, View } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseButtonWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('13%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('13%')}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('6.5%')}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const CloseIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('8%'),
  color: theme.colors.buttonText,
  name: 'close',
}))``;

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
          <CloseIcon />
        </CloseButtonWrapper>
      </View>
    </Wrapper>
  </Modal>
);

export default ModalDetail;
