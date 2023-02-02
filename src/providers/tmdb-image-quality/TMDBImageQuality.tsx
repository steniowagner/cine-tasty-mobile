import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import * as Types from '@local-types';

import getQualitiesBasedScreenClassification from './qualities/getQualities';
import {classifyDeviceScreen} from './classifyDeviceScreen';

const TMDBImageQualityContext = createContext<Types.ImageQuailties | {}>({});

type TMDBImageQualityProviderProps = {
  children: JSX.Element;
};

export const TMDBImageQualityProvider = ({
  children,
}: TMDBImageQualityProviderProps) => {
  const [imagesQualities, setImagesQualities] = useState<
    Types.ImageQuailties | {}
  >({});

  const screenClassification = classifyDeviceScreen();

  const handleSetImagesQualities = useCallback(async () => {
    const qualities = await getQualitiesBasedScreenClassification(
      screenClassification,
    );
    setImagesQualities(qualities);
  }, [screenClassification]);

  useEffect(() => {
    handleSetImagesQualities();
  }, []);

  return (
    <TMDBImageQualityContext.Provider value={{...imagesQualities}}>
      {children}
    </TMDBImageQualityContext.Provider>
  );
};

export const useTMDBImageQuality = () => useContext(TMDBImageQualityContext);
