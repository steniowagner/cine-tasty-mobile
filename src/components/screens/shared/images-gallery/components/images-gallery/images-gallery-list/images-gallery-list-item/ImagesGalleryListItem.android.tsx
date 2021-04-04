import { memo } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import ImagesGalleryListItemComponent from './ImagesGalleryListItemComponent';

const ImagesGalleryListItem = gestureHandlerRootHOC(ImagesGalleryListItemComponent);

export default memo(ImagesGalleryListItem, (): boolean => true);
