import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import RouteSuspenseWrapper from '../../../common/RouteSuspenseWrapper';
import { DEFAULT_HEADER_OPTIONS } from '../../../../routes/constants';
import Discover from '../components/Home';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

const DiscoverStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t('translations:tabs:discover'),
        }}
        name={LOCAL_ROUTES.DISCOVER.id}
        component={Discover}
      />
    </Stack.Navigator>
  );
};

const Wrapper = (props: any) => (
  <RouteSuspenseWrapper>
    <DiscoverStack
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </RouteSuspenseWrapper>
);

export const TabID = LOCAL_ROUTES.DISCOVER.id;

export default Wrapper;
