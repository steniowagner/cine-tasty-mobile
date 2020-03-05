import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Text = styled.Text`
  font-size: 16px;
  color: #000;
  font-family: CircularStd-Black;
`;

const Home = (props: any) => {
  console.log(props);
  return (
    <Wrapper>
      <Text>Home</Text>
    </Wrapper>
  );
};

export default Home;
