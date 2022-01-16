import AsyncStorage from '@react-native-async-storage/async-storage';

import CONSTANTS from '../constants';

export const get = async <T, D>(
  key: string,
  defaultValue: D,
): Promise<T | D> => {
  const valueFromStorage = await AsyncStorage.getItem(
    `${CONSTANTS.KEYS.APP_STORAGE_KEY}:${key}`,
  );

  if (valueFromStorage) {
    return JSON.parse(valueFromStorage) as T;
  }

  return defaultValue;
};

export const set = async (key: string, value: any): Promise<void> =>
  AsyncStorage.setItem(
    `${CONSTANTS.KEYS.APP_STORAGE_KEY}:${key}`,
    JSON.stringify(value),
  );

export const remove = async (key: string): Promise<void> =>
  AsyncStorage.removeItem(`${CONSTANTS.KEYS.APP_STORAGE_KEY}:${key}`);
