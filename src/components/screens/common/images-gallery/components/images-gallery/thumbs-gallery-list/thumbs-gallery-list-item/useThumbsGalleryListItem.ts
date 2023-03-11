import {useState} from 'react';

type ImageStatus = 'LOADING' | 'ERROR' | 'LOADED';

export const useThumbsGalleryListItem = () => {
  const [imageStatus, setImageStatus] = useState<ImageStatus>('LOADING');

  return {
    onError: () => setImageStatus('ERROR'),
    onLoad: () => setImageStatus('LOADED'),
    imageStatus,
  };
};
