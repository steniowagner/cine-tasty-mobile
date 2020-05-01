import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, withTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import RouteSuspenseWrapper from 'components/common/RouteSuspenseWrapper';
import { getDefaultHeaderOptions } from 'routes/constants';

import LOCAL_ROUTES from './route-names';
import News from '../components/News';

const Stack = createStackNavigator();

type Props = { theme: DefaultTheme };

const NewsStack = ({ theme }: Props) => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(theme),
          headerTitle: t('translations:tabs:news'),
        }}
        name={LOCAL_ROUTES.NEWS.id}
        component={News}
      />
    </Stack.Navigator>
  );
};

const Wrapper = (props: any) => (
  <RouteSuspenseWrapper>
    <NewsStack
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </RouteSuspenseWrapper>
);

export const TabID = LOCAL_ROUTES.NEWS.id;

export default withTheme(Wrapper);
