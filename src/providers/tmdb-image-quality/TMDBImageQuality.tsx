import React, { useContext, createContext } from 'react';

import useClassifyScreenHeight from './useClassifyDeviceScreen';

const TMDBImageQualityContext = createContext({});

type Props = {
  children: JSX.Element;
};

export const TMDBImageQualityProvider = ({ children }: Props) => {
  const { screenClassification } = useClassifyScreenHeight();
  console.log('screenClassification: ', screenClassification);
  const user = {
    name: 'stenio',
  };

  return (
    <TMDBImageQualityContext.Provider
      value={{ user }}
    >
      {children}
    </TMDBImageQualityContext.Provider>
  );
};

export const useTMDBImageQuality = () => useContext(TMDBImageQualityContext);
