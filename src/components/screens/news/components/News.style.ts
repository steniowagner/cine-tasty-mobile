import metrics from '@styles/metrics';

import {imageWrapper} from './list-item/NewsListItem.styles';

export const LIST_ITEM_HEIGHT = imageWrapper.height + 2 * metrics.mediumSize;

export const INITIAL_ITEMS_TO_RENDER =
  Math.floor(metrics.height / LIST_ITEM_HEIGHT) - 1;
