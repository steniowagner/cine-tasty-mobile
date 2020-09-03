import { useState } from 'react';

type State = {
  indexSelectedImage: number;
};

const useImageGallery = (firstItemSelected: number): State => {
  const [indexSelectedImage] = useState<number>(firstItemSelected);

  return {
    indexSelectedImage,
  };
};

export default useImageGallery;
