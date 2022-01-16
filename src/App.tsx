import React from 'react';
import {View, Text} from 'react-native';
import {ApolloProvider} from '@apollo/client';
import styled, {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider, ThemeContextProvider} from '@providers';
import {dark, light} from '@styles/themes';

import makeGraphQLClient from './graphql/client';

const client = makeGraphQLClient();

const App = () => (
  <ThemeProvider theme={light}>
    <Wrapper>
      <VotesText>123</VotesText>
    </Wrapper>
  </ThemeProvider>
);

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: #0f0;
  justify-content: center;
  align-items: center;
`;

const VotesText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.extraLargeSize * 10}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Black;
`;

export default App;

/* import { TMDBImageQualityProvider, ThemeContextProvider } from '@providers';

import RouteSuspenseWrapper from './components/common/route-suspense-wrapper/RouteSuspenseWrapper';
import Navigation from './routes/Navigation';
import makeClient from './graphql/client';

const client = makeClient();

const App = () => (
    <TMDBImageQualityProvider>
      <>
        <ApolloProvider
          client={client}
        >
          <RouteSuspenseWrapper>
            <Navigation />
          </RouteSuspenseWrapper>
        </ApolloProvider>
      </>
    </TMDBImageQualityProvider>
);

export default App;
*/
