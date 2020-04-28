import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import useSetupQuestions from './useSetupQuestions';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SetupQuestions = () => {
  useSetupQuestions();

  return <Wrapper />;
};

export default SetupQuestions;
