import AsyncStorage from '@react-native-async-storage/async-storage';

export const APP_STORAGE_KEY = '@CINE_TASTY';

export const useStorage = () => {
  const get = async <T>(key: string) => {
    try {
      const valueFromStorage = await AsyncStorage.getItem(
        `${APP_STORAGE_KEY}:${key}`,
      );
      if (!valueFromStorage) {
        return;
      }
      return JSON.parse(valueFromStorage) as T;
    } catch (err) {
      return undefined;
    }
  };

  const set = async (key: string, value: unknown) => {
    try {
      await AsyncStorage.setItem(
        `${APP_STORAGE_KEY}:${key}`,
        JSON.stringify(value),
      );
      return true;
    } catch (err) {
      return false;
    }
  };

  const del = async (key: string) => {
    try {
      await AsyncStorage.removeItem(`${APP_STORAGE_KEY}:${key}`);
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    delete: del,
    set,
    get,
  };
};
