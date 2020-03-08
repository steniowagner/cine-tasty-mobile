import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import RouteSuspenseWrapper from '../../../common/RouteSuspenseWrapper';
import { DEFAULT_HEADER_OPTIONS } from '../../../../routes/constants';
import LOCAL_ROUTES from './route-names';
import Quiz from '../components/Quiz';

const Stack = createStackNavigator();

const NewsStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t('translations:tabs:quiz'),
        }}
        name={LOCAL_ROUTES.QUIZ.id}
        component={Quiz}
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

export const TabID = LOCAL_ROUTES.QUIZ.id;

export default Wrapper;
