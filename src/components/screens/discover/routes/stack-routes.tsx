import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import RouteSuspenseWrapper from 'components/common/RouteSuspenseWrapper';
import { getDefaultHeaderOptions } from 'routes/constants';

import FamousDetail, {
  SCREEN_ID as FAMOUS_DETAIL_ID,
} from '../../shared/famous-detail/FamousDetail';
import Discover from '../components/Discover';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

const DiscoverStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={FAMOUS_DETAIL_ID}
        component={FamousDetail}
      />
      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(),
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

export default withTheme(Wrapper);
