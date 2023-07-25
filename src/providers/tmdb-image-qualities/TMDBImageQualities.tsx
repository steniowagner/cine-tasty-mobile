import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import RNRestart from 'react-native-restart';

import {CONSTANTS, storage} from '@utils';
import * as Types from '@local-types';

import {classifyScreenSize} from './classifyScreenSize';
import mediumSizes from './qualities/medium/medium';

type TMDBImageQualitiesContextState = {
  mappingImageTypeToImageSize?: Types.MappingImageTypeToImageSize;
  changeQuality: (quality: Types.ImageQualities) => void;
  imageQualitySelected: Types.ImageQualities;
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
    useState<Types.MappingImageTypeToImageSize | undefined>();
  const [imageQualitySelected, setImageQualitySelected] =
    useState<Types.ImageQualities>(
      TMDB_IMAGE_QUALITIES_CONTEXT.imageQualitySelected,
    );

  const handleSetImagesQualities = useCallback(async () => {
    const screenSize = classifyScreenSize();
    const qualitySelected = await storage.get<
      Types.ImageQualities,
      Types.ImageQualities
    >(
      CONSTANTS.KEYS.IMAGES_QUALITY,
      TMDB_IMAGE_QUALITIES_CONTEXT.imageQualitySelected,
    );
    setImageQualitySelected(qualitySelected);
    setMappingImageTypeToImageSize(screenSize[qualitySelected]);
  }, []);

  const handleChangeImagesQuality = useCallback(
    async (quality: Types.ImageQualities) => {
      await storage.set(CONSTANTS.KEYS.IMAGES_QUALITY, quality);
      RNRestart.Restart();
    },
    [],
  );

  useEffect(() => {
    handleSetImagesQualities();
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
