import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook } from '@testing-library/react-native';

import { useStorage, APP_STORAGE_KEY } from './use-storage';

const STORAGE_KEY = 'SOME_STORAGE_KEY';
const VALUE = { key: 'value' };

describe('Hooks/use-storage', () => {
  describe('get', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call "AsyncStorage.getItem" correctly', async () => {
      const { result } = renderHook(() => useStorage());
      await result.current.get(STORAGE_KEY);
      expect(AsyncStorage.getItem).toBeCalledTimes(1);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(
        `${APP_STORAGE_KEY}:${STORAGE_KEY}`,
      );
    });

    it('should return the "stored-value" when it exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(VALUE),
      );
      const { result } = renderHook(() => useStorage());
      const value = await result.current.get(STORAGE_KEY);
      expect(value).toEqual(VALUE);
    });

    it('should return "undefined" if the value does not exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useStorage());
      const value = await result.current.get(STORAGE_KEY);
      expect(value).toEqual(undefined);
    });

    it('should return "undefined" when some excpetion is thrown', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(undefined);
      const { result } = renderHook(() => useStorage());
      const value = await result.current.get(STORAGE_KEY);
      expect(value).toEqual(undefined);
    });
  });

  describe('set', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call "AsyncStorage.set" correctly', async () => {
      const { result } = renderHook(() => useStorage());
      await result.current.set(STORAGE_KEY, VALUE);
      expect(AsyncStorage.setItem).toBeCalledTimes(1);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        `${APP_STORAGE_KEY}:${STORAGE_KEY}`,
        JSON.stringify(VALUE),
      );
    });

    it('should return "true" when "save" the item successfuly', async () => {
      const { result } = renderHook(() => useStorage());
      const value = await result.current.set(STORAGE_KEY, VALUE);
      expect(value).toEqual(value);
    });

    it('should return "false" when some exception is thrown', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(undefined);
      const { result } = renderHook(() => useStorage());
      const value = await result.current.set(STORAGE_KEY, VALUE);
      expect(value).toEqual(false);
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call "AsyncStorage.delete" correctly', async () => {
      const { result } = renderHook(() => useStorage());
      await result.current.delete(STORAGE_KEY);
      expect(AsyncStorage.removeItem).toBeCalledTimes(1);
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
        `${APP_STORAGE_KEY}:${STORAGE_KEY}`,
      );
    });

    it('should return "true" when "save" the item successfuly', async () => {
      const { result } = renderHook(() => useStorage());
      const value = await result.current.delete(STORAGE_KEY);
      expect(value).toEqual(value);
    });

    it('should return "false" when some exception is thrown', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValueOnce(undefined);
      const { result } = renderHook(() => useStorage());
      const value = await result.current.delete(STORAGE_KEY);
      expect(value).toEqual(false);
    });
  });
});
