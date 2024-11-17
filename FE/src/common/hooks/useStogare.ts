/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState, useEffect } from "react";

export function useLocalStorage(key: any, defaultValue: any) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key: any, defaultValue: any) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key: any, defaultValue: () => any, storageObject: any) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue !== null && jsonValue !== undefined) {
      try {
        return JSON.parse(jsonValue);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        return defaultValue instanceof Function ? defaultValue() : defaultValue;
      }
    }

    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  useEffect(() => {
    if (value === undefined) {
      storageObject.removeItem(key);
    } else {
      storageObject.setItem(key, JSON.stringify(value));
    }
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}
