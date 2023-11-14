import { renderHook } from '@testing-library/react-native';

import { ImageType } from '@/providers/tmdb-image-qualities/types';

import { randomPositiveNumber } from '../../../__mocks__/utils';
import { BASE_URL, THUMBNAIL_URL, useTMDBImageURI } from './use-tmdb-image-uri';

const imageTypes: ImageType[] = ['backdrop', 'poster', 'still', 'profile'];
const image = 'IMAGE';
const mockUseTMDBImageQualities = jest.fn();

jest.mock('@providers', () => {
  const actualProvidersModule = jest.requireActual('@providers');
  return {
    ...actualProvidersModule,
    useTMDBImageQualities: () => mockUseTMDBImageQualities(),
  };
});

describe('Hooks/use-tmdb-image-uri', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return "undefined" when "isThumbnail" is "false" and "mappingImageTypeToImageSize" is "undefined"', () => {
    mockUseTMDBImageQualities.mockReturnValueOnce({
      mappingImageTypeToImageSize: undefined,
    });
    const { result } = renderHook(() => useTMDBImageURI());
    const imageType = imageTypes[randomPositiveNumber(imageTypes.length - 1)];
    const uri = result.current.uri({ imageType, image });
    expect(uri).toBeUndefined();
  });

  it('should return the "uri" correctly when "isThumbnail" is "true"', () => {
    mockUseTMDBImageQualities.mockReturnValueOnce({
      mappingImageTypeToImageSize: undefined,
    });
    const { result } = renderHook(() => useTMDBImageURI());
    const imageType = imageTypes[randomPositiveNumber(imageTypes.length - 1)];
    const uri = result.current.uri({ imageType, isThumbnail: true, image });
    expect(uri).toEqual(`${THUMBNAIL_URL}${image}`);
  });

  test.each(imageTypes)(
    'should return the "uri" correctly for the "image-type" %p',
    async imageType => {
      const mappingImageTypeToImageSize = {
        poster: 'w92',
        backdrop: 'w300',
        still: 'w92',
        profile: 'w92',
      };
      mockUseTMDBImageQualities.mockReturnValueOnce({
        mappingImageTypeToImageSize,
      });
      const { result } = renderHook(() => useTMDBImageURI());
      const uri = result.current.uri({ imageType, image });
      expect(uri).toEqual(
        `${BASE_URL}/${mappingImageTypeToImageSize[imageType]}${image}`,
      );
    },
  );
});
