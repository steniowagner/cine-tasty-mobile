import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  defaultHeaderStyle,
  Routes,
  HeaderTitle as CustomHeaderTitle,
} from '@navigation';
import { Translations } from '@i18n/tags';

import { Container } from '../screens/news/News.styles';
import { News } from '../screens/news/News';
import { NewsStackProps } from './route-params-types';

const Stack = createStackNavigator();

const NewsComponent = (props: NewsStackProps) => (
  <Container>
    <News {...props} />
  </Container>
);

export const NewsStack = () => {
  const HeaderTitle = useCallback(
    () => <CustomHeaderTitle translationTag={Translations.Tabs.TABS_NEWS} />,
    [],
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...defaultHeaderStyle,
          headerTitle: HeaderTitle,
          headerTitleAlign: 'center',
        }}
        name={Routes.News.NEWS}
        component={NewsComponent}
      />
    </Stack.Navigator>
  );
};
