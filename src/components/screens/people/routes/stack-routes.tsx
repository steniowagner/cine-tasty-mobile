import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import RouteSuspenseWrapper from 'components/common/RouteSuspenseWrapper';
import { DEFAULT_HEADER_OPTIONS } from 'routes/constants';

import People from '../components/People';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

const PeopleStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t('translations:tabs:people'),
        }}
        name={LOCAL_ROUTES.PEOPLE.id}
        component={People}
      />
    </Stack.Navigator>
  );
};

const Wrapper = (props: any) => (
  <RouteSuspenseWrapper>
    <PeopleStack
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </RouteSuspenseWrapper>
);

export const TabID = LOCAL_ROUTES.PEOPLE.id;

export default Wrapper;
