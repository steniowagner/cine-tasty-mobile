import screenClassification from '@/providers/tmdb-image-qualities/qualities/xlarge/medium';
import { ImageType } from '@/providers/tmdb-image-qualities/types';

import { getImageURI, BASE_URL, THUMBNAIL_URL } from './get-image-uri';

const IMAGE_TYPES: ImageType[] = ['backdrop', 'poster', 'still', 'profile'];
const image = '/IMAGE.jpg';

describe('Components/Common/get-image-uri', () => {
  test.each(IMAGE_TYPES)(
    'should return "undefined" when "mappingImageTypeToImageSize" and "isThumbnail" are "undefined" and "imageType" is %p',
    imageType => {
      const uri = getImageURI({ image, imageType });
      expect(uri).toBeUndefined();
    },
  );

  describe('When "isThumbnail" is "true"', () => {
    it('should return the correct URI', () => {
      const uri = getImageURI({ isThumbnail: true, image });
      expect(uri).toEqual(`${THUMBNAIL_URL}${image}`);
    });
  });

  describe('When "isThumbnail" is "false"', () => {
    test.each(IMAGE_TYPES)(
      'should return the correct URI when the "image-quality" selected is %p',
      imageType => {
        const uri = getImageURI({
          image,
          imageType,
          mappingImageTypeToImageSize: screenClassification,
        });
        expect(uri).toEqual(
          `${BASE_URL}/${screenClassification[imageType]}${image}`,
        );
      },
    );
  });
});
