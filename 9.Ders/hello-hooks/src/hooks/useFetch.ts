import { useEffect, useState } from 'react';

// 1. Return type oluştur
type UseFetchReturn<T> = {
  data: T | null;
};

// 2. Options type oluştur
type UseFetchOptions = {
  url: string;
};

export const useFetch = <T>({ url }: UseFetchOptions): UseFetchReturn<T> => {
  // usss
  const [data, setData] = useState<T | null>(null);

  // uffs
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, []);

  return { data };
};
