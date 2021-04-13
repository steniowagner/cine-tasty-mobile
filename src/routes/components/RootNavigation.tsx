import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SearchStack, {
  StackID as SearchStackID,
} from '@components/screens/shared/search/routes/stack-routes';

import ImagesGalleryModal, {
  MODAL_ID as IMAGES_GALLERY_MODAL_ID,
} from '@components/screens/shared/images-gallery/routes/stack-routes';

import CustomModal, {
  MODAL_ID as CUSTOM_MODAL_ID,
} from '@components/screens/shared/customized-modal/routes/stack-routes';

import Tabs from './Tabs';

const RootStack = createStackNavigator();

const RouteNavigation = () => (
  <RootStack.Navigator
    screenOptions={{
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
            extrapolate: 'clamp',
          }),
        },
      }),
      cardStyle: { backgroundColor: 'transparent' },
      cardOverlayEnabled: true,
      animationEnabled: false,
      headerShown: false,
    }}
    mode="modal"
  >
    <RootStack.Screen
      options={{ headerShown: false }}
      component={Tabs}
      name="Tabs"
    />
    <RootStack.Screen
      options={{ headerShown: false, animationEnabled: true }}
      component={SearchStack}
      name={SearchStackID}
    />
    <RootStack.Screen
      options={{ headerShown: false, animationEnabled: true }}
      component={ImagesGalleryModal}
      name={IMAGES_GALLERY_MODAL_ID}
    />
    <RootStack.Screen
      options={{ headerShown: false, animationEnabled: true }}
      component={CustomModal}
      name={CUSTOM_MODAL_ID}
    />
  </RootStack.Navigator>
);

export default RouteNavigation;
