import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultHeaderStyle, Routes } from '@navigation';
import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';
import { Typography } from '@common-components';

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
  const translation = useTranslation();

  const HeaderTitle = useCallback(
    () => (
      <Typography.SmallText alignment="center">
        {translation.translate(Translations.Tabs.TABS_NEWS)}
      </Typography.SmallText>
    ),
    [translation.translate],
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
