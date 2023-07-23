import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import {CONSTANTS, storage} from '@utils';
import * as Types from '@local-types';

import {classifyScreenSize} from './classifyScreenSize';

type TMDBImageQualitiesContextState = {
  mappingImageTypeToImageSize?: Types.MappingImageTypeToImageSize;
  imageQualitySelected: Types.ImageQualities;
};

const TMDB_IMAGE_QUALITIES_CONTEXT = {
  imageQualitySelected: 'medium',
  mappingImageTypeToImageSize: {
    poster: 'w154',
    backdrop: 'w300',
    still: 'w92',
    profile: 'w92',
  },
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

  useEffect(() => {
    handleSetImagesQualities();
  }, []);

  return (
    <TMDBImageQualitiesContext.Provider
      value={{mappingImageTypeToImageSize, imageQualitySelected}}>
      {props.children}
    </TMDBImageQualitiesContext.Provider>
  );
};

export const useTMDBImageQualities = () =>
  useContext(TMDBImageQualitiesContext);
