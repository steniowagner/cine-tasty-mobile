import AsyncStorage from '@react-native-async-storage/async-storage';

import CONSTANTS from '../constants';

export const getItemFromStorage = async <T, D>(
  key: string,
  defaultValue: D,
): Promise<T | D> => {
  const valueFromStorage = await AsyncStorage.getItem(
    `${CONSTANTS.KEYS.APP_STORAGE_KEY}:${key}`,
  );

  if (valueFromStorage) {
    return JSON.parse(valueFromStorage);
  }

  return defaultValue;
};

export const persistItemInStorage = async (
  key: string,
  value: any,
): Promise<void> =>
  AsyncStorage.setItem(
    `${CONSTANTS.KEYS.APP_STORAGE_KEY}:${key}`,
    JSON.stringify(value),
  );

export const removeItemFromStorage = async (key: string): Promise<void> =>
  AsyncStorage.removeItem(`${CONSTANTS.KEYS.APP_STORAGE_KEY}:${key}`);
