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
    console.log(query,data);
    cache.current[query] = data;
    // console.log("캐쉬 현황 : " ,cache.current);
    
  }
  return {saveInCache,returnCache}
}
