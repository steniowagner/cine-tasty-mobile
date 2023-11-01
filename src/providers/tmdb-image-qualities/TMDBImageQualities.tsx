import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import RNRestart from 'react-native-restart';

import {
  MappingImageTypeToImageSize,
  ImageQualities,
} from '@/providers/tmdb-image-qualities/types';
import { storage } from '@/utils';

import { classifyScreenSize } from './classify-screen-size';
import mediumSizes from './qualities/medium/medium';

export const IMAGES_QUALITY_STORAGE_KEY = '@CINE_TASTY_IMAGES_QUALITY';

type TMDBImageQualitiesContextState = {
  mappingImageTypeToImageSize?: MappingImageTypeToImageSize;
  changeQuality: (quality: ImageQualities) => void;
  imageQualitySelected: ImageQualities;
};

const TMDB_IMAGE_QUALITIES_CONTEXT = {
  imageQualitySelected: 'medium',
  mappingImageTypeToImageSize: mediumSizes,
} as TMDBImageQualitiesContextState;

const TMDBImageQualitiesContext = createContext<TMDBImageQualitiesContextState>(
  TMDB_IMAGE_QUALITIES_CONTEXT,
);

type TMDBImageQualitiesProviderProps = {
  children: React.ReactNode;
};

export const TMDBImageQualitiesProvider = (
  props: TMDBImageQualitiesProviderProps,
) => {
  const [mappingImageTypeToImageSize, setMappingImageTypeToImageSize] =
    useState<MappingImageTypeToImageSize | undefined>();
  const [imageQualitySelected, setImageQualitySelected] =
    useState<ImageQualities>(TMDB_IMAGE_QUALITIES_CONTEXT.imageQualitySelected);

  const setImagesQualities = useCallback(async () => {
    const screenSize = classifyScreenSize();
    const qualitySelected = await storage.get<ImageQualities>(
      IMAGES_QUALITY_STORAGE_KEY,
    );
    const quality =
      qualitySelected ?? TMDB_IMAGE_QUALITIES_CONTEXT.imageQualitySelected;
    setImageQualitySelected(quality);
    setMappingImageTypeToImageSize(screenSize[quality]);
  }, []);

  const handleChangeImagesQuality = useCallback(
    async (quality: ImageQualities) => {
      await storage.set(IMAGES_QUALITY_STORAGE_KEY, quality);
      RNRestart.restart();
    },
    [],
  );

  useEffect(() => {
    setImagesQualities();
  }, []);

  return (
    <TMDBImageQualitiesContext.Provider
      value={{
        mappingImageTypeToImageSize,
        changeQuality: handleChangeImagesQuality,
        imageQualitySelected,
      }}>
      {props.children}
    </TMDBImageQualitiesContext.Provider>
  );
};

export const useTMDBImageQualities = () =>
  useContext(TMDBImageQualitiesContext);
