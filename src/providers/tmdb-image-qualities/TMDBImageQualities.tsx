import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import * as Types from '@local-types';
import {CONSTANTS, storage} from '@utils';

import {classifyDeviceScreenSize} from './classifyDeviceScreenSize';
import xsmall from './qualities/xsmall';
import small from './qualities/small';
import medium from './qualities/medium';
import large from './qualities/large';
import xlarge from './qualities/xlarge';

const TMDBImageQualitiesContext = createContext<
  Types.ImageQuailties | undefined
>(undefined);

type TMDBImageQualitiesProviderProps = {
  children: React.ReactNode;
};

export const TMDBImageQualitiesProvider = (
  props: TMDBImageQualitiesProviderProps,
) => {
  const [imagesQualities, setImagesQualities] = useState<
    Types.ImageQuailties | undefined
  >();

  const classifyScreenSize = () => {
    const screenClassification = classifyDeviceScreenSize();
    const classifications = {
      xsmall,
      small,
      medium,
      large,
      xlarge,
    };
    return classifications[screenClassification];
  };

  const getImageQualitySelected = async (): Promise<Types.ImageQualities> =>
    storage.get<Types.ImageQualities, Types.ImageQualities>(
      CONSTANTS.KEYS.IMAGES_QUALITY,
      'medium',
    );

  const handleSetImagesQualities = useCallback(async () => {
    const screenSize = classifyScreenSize();
    const imageQualitySelected = await getImageQualitySelected();
    setImagesQualities(screenSize[imageQualitySelected]);
  }, []);

  useEffect(() => {
    handleSetImagesQualities();
  }, []);

  return (
    <TMDBImageQualitiesContext.Provider value={{...imagesQualities}}>
      {props.children}
    </TMDBImageQualitiesContext.Provider>
  );
};

export const useTMDBImageQualities = () =>
  useContext(TMDBImageQualitiesContext);
