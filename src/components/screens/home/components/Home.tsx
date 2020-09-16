import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import MediaSwitcher from './media-switcher/MediaSwitcher';
import Header from './header/Header';

const Wrapper = styled(View)`
  flex: 1;
`;

const Home = () => (
  <Wrapper>
    <Header />
    <MediaSwitcher />
  </Wrapper>
);

export default Home;
