import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import * as Types from '@local-types';

import getQualitiesBasedScreenClassification from './qualities/getQualities';
import useClassifyDeviceScreen from './useClassifyDeviceScreen';

const TMDBImageQualityContext = createContext<Types.ImageQuailties | undefined>(
  undefined,
);

type TMDBImageQualityProviderProps = {
  children: JSX.Element;
};

export const TMDBImageQualityProvider = ({
  children,
}: TMDBImageQualityProviderProps) => {
  const [imagesQualities, setImagesQualities] = useState<
    Types.ImageQuailties | {}
  >({});

  const {screenClassification} = useClassifyDeviceScreen();

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
    <TMDBImageQualityContext.Provider
      // @ts-ignore
      value={{...imagesQualities}}>
      {children}
    </TMDBImageQualityContext.Provider>
  );
};

export const useTMDBImageQuality = () => useContext(TMDBImageQualityContext);
