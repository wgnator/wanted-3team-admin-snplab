import { useRef } from 'react';


export function useCache<T>() {
  type CacheType = {
    [key: string]: T;
  };
  type QueryType = "address" | "register"
  const cache = useRef({} as CacheType);

  const returnCache = (query:QueryType) => {
    return cache.current[query];
  }
  const saveInCache = (query:QueryType,data: T) => {
    cache.current[query] = data;
  }
  return {saveInCache,returnCache}
}
