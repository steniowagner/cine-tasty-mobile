import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, withTheme } from 'styled-components';

import MediaDetailScreen from 'components/screens/shared/media-detail-screen/components/MediaDetailScreen';
import FamousDetail from 'components/screens/shared/famous-detail/components/FamousDetail';
import { getTransparentHeaderOptions, getDefaultHeaderOptions } from 'routes/constants';
import RouteSuspenseWrapper from 'components/common/RouteSuspenseWrapper';

import MediaSectionViewAll, {
  Props as MediaSectionViewAllScreenProps,
} from '../components/media-section-view-all/MediaSectionViewAll';
import LOCAL_ROUTES from './route-names';
import Home from '../components/Home';

const Stack = createStackNavigator();

type Props = {
  theme: DefaultTheme;
};

const HomeStack = ({ theme }: Props) => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        ...getTransparentHeaderOptions(theme),
      }}
      name={LOCAL_ROUTES.HOME.id}
      component={Home}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={LOCAL_ROUTES.FAMOUS_DETAIL.id}
      component={FamousDetail}
    />
    <Stack.Screen
      name={LOCAL_ROUTES.MEDIA_DETAILS_VIEW_ALL.id}
      options={({ route }: MediaSectionViewAllScreenProps) => ({
        ...getDefaultHeaderOptions(),
        headerTitle: route.params.headerTitle,
      })}
      component={MediaSectionViewAll}
    />
    <Stack.Screen
      name={LOCAL_ROUTES.MEDIA_DETAIL.id}
      options={() => ({
        ...getTransparentHeaderOptions(theme),
      })}
      component={MediaDetailScreen}
    />
  </Stack.Navigator>
);

const Wrapper = (props: any) => (
  <RouteSuspenseWrapper>
    <HomeStack
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </RouteSuspenseWrapper>
);

export const TabID = LOCAL_ROUTES.HOME.id;

export default withTheme(Wrapper);
