import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { ImagesGalleryParams } from '@components/screens/shared/images-gallery/routes/route-params-types';
import { getDefaultHeaderOptions } from '@routes/constants';

import ImagesGallery from '../components/images-gallery/ImagesGallery';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

type ImageGalleryRouteProp = RouteProp<ImagesGalleryParams, 'IMAGES_GALLERY'>;

type Props = {
  route: ImageGalleryRouteProp;
};

const ImagesGalleryStack = ({ route }: Props) => (
  <Stack.Navigator>
    <Stack.Screen
      name={LOCAL_ROUTES.IMAGES_GALLERY.id}
      component={ImagesGallery}
      options={{
        ...getDefaultHeaderOptions(),
        headerTitleAlign: 'center',
      }}
      initialParams={{
        ...route.params,
      }}
    />
  </Stack.Navigator>
);

export const MODAL_ID = LOCAL_ROUTES.IMAGES_GALLERY.id;

export default ImagesGalleryStack;
