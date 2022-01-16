import React from 'react';
import {View, Text} from 'react-native';
import {ApolloProvider} from '@apollo/client';
import styled from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import * as TRANSLATIONS from '@i18n/tags';
import {ThemeProvider} from 'styled-components/native';
import {light} from '@styles/themes';
import RouteSuspenseWrapper from './components/common/route-suspense-wrapper/RouteSuspenseWrapper';
import {TMDBImageQualityProvider, ThemeContextProvider} from '@providers';

import makeGraphQLClient from './graphql/client';

const client = makeGraphQLClient();

const Comp = () => {
  const {t} = useTranslation();
  return (
    <Wrapper>
      <VotesText>{t(TRANSLATIONS.FAMOUS_DETAIL_READ_MORE)}</VotesText>
    </Wrapper>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={light}>
      <ApolloProvider client={client}>
        <RouteSuspenseWrapper>
          <Comp />
        </RouteSuspenseWrapper>
      </ApolloProvider>
    </ThemeProvider>
  );
};

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: #0f0;
  justify-content: center;
  align-items: center;
`;

const VotesText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
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
