import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RouteSuspenseWrapper from 'components/common/RouteSuspenseWrapper';

import LOCAL_ROUTES from './route-names';
import Quiz from '../components/Quiz';

const Stack = createStackNavigator();

const NewsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={LOCAL_ROUTES.QUIZ.id}
      component={Quiz}
    />
  </Stack.Navigator>
);

const Wrapper = (props: any) => (
  <RouteSuspenseWrapper>
    <NewsStack
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </RouteSuspenseWrapper>
);

export const TabID = LOCAL_ROUTES.QUIZ.id;

export default Wrapper;
