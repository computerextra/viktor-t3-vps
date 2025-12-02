"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string,
  initalValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? (JSON.parse(storedValue) as T) : initalValue;
    setValue(initial);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
