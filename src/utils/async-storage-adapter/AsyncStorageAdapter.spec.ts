import AsyncStorage from '@react-native-community/async-storage';

import CONSTANTS from '../constants';
import {
  removeItemFromStorage,
  persistItemInStorage,
  getItemFromStorage,
} from './AsyncStorageAdapter';

const KEY = 'MY_KEY';
const STORAGE_KEY = `${CONSTANTS.KEYS.APP_STORAGE_KEY}:${KEY}`;

type Data = {
  name: string;
  age: number;
};

const data: Data = { name: 'stenio', age: 25 };

describe('Testing the Async-Storage Adapater', () => {
  beforeEach(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    jest.clearAllMocks();
  });

  describe('getItemFromStorage()', () => {
    it('should get an item from the storage using the received key', async () => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      const itemFromStorage = await getItemFromStorage<Data, null>(KEY, null);

      expect(AsyncStorage.getItem).toBeCalledWith(STORAGE_KEY);

      expect(itemFromStorage).toEqual(data);
    });

    it("should return the default value when the item doesn't exists on the storage", async () => {
      const itemFromStorage = await getItemFromStorage<Data, string>(
        KEY,
        'default value',
      );

      expect(AsyncStorage.getItem).toBeCalledWith(STORAGE_KEY);

      expect(itemFromStorage).toEqual('default value');
    });
  });

  describe('persistItemInStorage()', () => {
    it('should persist an item correctly on the storage', async () => {
      await persistItemInStorage(KEY, data);

      expect(AsyncStorage.setItem).toBeCalledWith(STORAGE_KEY, JSON.stringify(data));

      const itemFromStorage = await AsyncStorage.getItem(STORAGE_KEY, null);

      expect(JSON.parse(itemFromStorage)).toEqual(data);
    });
  });

  describe('removeItemFromStorage()', () => {
    it('should remove an item from the storage using the received key', async () => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      await removeItemFromStorage(KEY);

      const itemFromStorage = await AsyncStorage.getItem(STORAGE_KEY, null);

      expect(JSON.parse(itemFromStorage)).toEqual(null);
    });

    it("should return null when the item doesn't exists on the storage", async () => {
      await removeItemFromStorage(KEY);

      const itemFromStorage = await AsyncStorage.getItem(STORAGE_KEY, null);

      expect(JSON.parse(itemFromStorage)).toEqual(null);
    });
  });
});
