import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { ImagesTypes } from 'types';

import getQualitiesBasedScreenClassification from './qualities/getQualities';
import useClassifyDeviceScreen from './useClassifyDeviceScreen';

const TMDBImageQualityContext = createContext<Record<ImagesTypes, string> | undefined>(
  undefined,
);

type Props = {
  children: JSX.Element;
};

export const TMDBImageQualityProvider = ({ children }: Props) => {
  const [imagesQualities, setImagesQualities] = useState<
    Record<ImagesTypes, string> | undefined
  >(undefined);

  const { screenClassification } = useClassifyDeviceScreen();

  const handleSetImagesQualities = useCallback(async () => {
    const qualities = await getQualitiesBasedScreenClassification(screenClassification);

    setImagesQualities(qualities);
  }, [screenClassification]);

  useEffect(() => {
    handleSetImagesQualities();
  }, []);

  return (
    <TMDBImageQualityContext.Provider
      value={{ ...imagesQualities }}
    >
      {children}
    </TMDBImageQualityContext.Provider>
  );
};

export const useTMDBImageQuality = () => useContext(TMDBImageQualityContext);
