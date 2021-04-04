import { memo } from 'react';

import ImagesGalleryListItemComponent from './ImagesGalleryListItemComponent';

export default memo(ImagesGalleryListItemComponent, (): boolean => true);
