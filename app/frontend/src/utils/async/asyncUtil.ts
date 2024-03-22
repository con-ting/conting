import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setAsync<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`${key} 세팅 실패`, e);
  }
}

export async function getAsync<T>(key: string): Promise<T | null> {
  try {
    const storedValue = await AsyncStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (e) {
    console.error(`${key} 가져오기 실패`, e);
    return null;
  }
}

export async function removeAsync(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`${key} 삭제 실패`, e);
  }
}
